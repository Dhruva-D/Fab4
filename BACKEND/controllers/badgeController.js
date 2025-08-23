const {
  checkAndUpdateBadges,
  checkAllArtistBadges,
  getBadgeStatistics,
} = require("../utils/badgeManager");
const User = require("../models/User");

// Check badges for current user
const checkMyBadges = async (req, res) => {
  try {
    const userId = req.user._id;

    if (req.user.userType !== "artist") {
      return res.status(400).json({
        success: false,
        message: "Only artists can have badges",
      });
    }

    const result = await checkAndUpdateBadges(userId);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json({
      success: true,
      message: result.badgeAwarded
        ? "Congratulations! You've earned a new badge!"
        : "Badge check completed",
      data: {
        badges: result.user.badges,
        artworkCount: result.artworkCount,
        badgeAwarded: result.badgeAwarded,
      },
    });
  } catch (error) {
    console.error("Check my badges error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get badge statistics (admin or public route)
const getBadgesStats = async (req, res) => {
  try {
    const result = await getBadgeStatistics();

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json({
      success: true,
      data: result.statistics,
    });
  } catch (error) {
    console.error("Get badge statistics error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin endpoint to run badge check for all artists
const checkAllBadges = async (req, res) => {
  try {
    // This would typically require admin authentication
    const result = await checkAllArtistBadges();

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json({
      success: true,
      message: `Batch badge check completed. ${result.badgesAwarded} new badges awarded.`,
      data: {
        totalArtists: result.totalArtists,
        badgesAwarded: result.badgesAwarded,
        results: result.results,
      },
    });
  } catch (error) {
    console.error("Check all badges error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all verified artists
const getVerifiedArtists = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const verifiedArtists = await User.find({
      userType: "artist",
      isActive: true,
      "badges.verified": true,
    })
      .select("profile.name profile.artistInfo badges createdAt")
      .sort({ "badges.awardedAt": -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments({
      userType: "artist",
      isActive: true,
      "badges.verified": true,
    });

    res.json({
      success: true,
      data: {
        artists: verifiedArtists,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Get verified artists error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  checkMyBadges,
  getBadgesStats,
  checkAllBadges,
  getVerifiedArtists,
};
