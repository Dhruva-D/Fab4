const User = require("../models/User");
const Artwork = require("../models/Artwork");

/**
 * Check and update badges for a specific user
 * @param {String} userId - The user ID to check badges for
 * @returns {Object} - Badge update result
 */
const checkAndUpdateBadges = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user || user.userType !== "artist") {
      return { success: false, message: "User not found or not an artist" };
    }

    // Count active artworks for this artist
    const artworkCount = await Artwork.countDocuments({
      artist: userId,
      isActive: true,
    });

    let badgeAwarded = false;
    let updatedUser = null;

    // Check if user qualifies for verified badge and doesn't already have it
    if (artworkCount >= 3 && !user.badges.verified) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            "badges.verified": true,
            "badges.awardedAt": new Date(),
          },
        },
        { new: true }
      );
      badgeAwarded = true;
    }

    return {
      success: true,
      badgeAwarded,
      artworkCount,
      user: updatedUser || user,
    };
  } catch (error) {
    console.error("Badge check error:", error);
    return {
      success: false,
      message: "Error checking badges",
      error: error.message,
    };
  }
};

/**
 * Check badges for all artists in the system
 * @returns {Object} - Batch badge update result
 */
const checkAllArtistBadges = async () => {
  try {
    const artists = await User.find({
      userType: "artist",
      isActive: true,
    });

    let updatedCount = 0;
    const results = [];

    for (const artist of artists) {
      const result = await checkAndUpdateBadges(artist._id);
      if (result.badgeAwarded) {
        updatedCount++;
      }
      results.push({
        artistId: artist._id,
        artistName: artist.profile.name,
        ...result,
      });
    }

    return {
      success: true,
      totalArtists: artists.length,
      badgesAwarded: updatedCount,
      results,
    };
  } catch (error) {
    console.error("Batch badge check error:", error);
    return {
      success: false,
      message: "Error in batch badge check",
      error: error.message,
    };
  }
};

/**
 * Get badge statistics
 * @returns {Object} - Badge statistics
 */
const getBadgeStatistics = async () => {
  try {
    const totalArtists = await User.countDocuments({
      userType: "artist",
      isActive: true,
    });

    const verifiedArtists = await User.countDocuments({
      userType: "artist",
      isActive: true,
      "badges.verified": true,
    });

    const eligibleArtists = await User.aggregate([
      { $match: { userType: "artist", isActive: true } },
      {
        $lookup: {
          from: "artworks",
          localField: "_id",
          foreignField: "artist",
          as: "artworks",
        },
      },
      {
        $addFields: {
          artworkCount: {
            $size: {
              $filter: {
                input: "$artworks",
                cond: { $eq: ["$$this.isActive", true] },
              },
            },
          },
        },
      },
      { $match: { artworkCount: { $gte: 3 } } },
      { $count: "total" },
    ]);

    return {
      success: true,
      statistics: {
        totalArtists,
        verifiedArtists,
        eligibleArtists: eligibleArtists.length > 0 ? eligibleArtists[0].total : 0,
        verificationRate: totalArtists > 0 ? (verifiedArtists / totalArtists) * 100 : 0,
      },
    };
  } catch (error) {
    console.error("Badge statistics error:", error);
    return {
      success: false,
      message: "Error getting badge statistics",
      error: error.message,
    };
  }
};

module.exports = {
  checkAndUpdateBadges,
  checkAllArtistBadges,
  getBadgeStatistics,
};
