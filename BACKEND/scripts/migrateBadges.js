const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { checkAllArtistBadges } = require("./utils/badgeManager");
const connectDB = require("./config/database");

// Load environment variables
dotenv.config();

const migrateBadges = async () => {
  try {
    console.log("🚀 Starting badge migration...");
    
    // Connect to MongoDB
    await connectDB();
    console.log("✅ Connected to database");

    // Run badge check for all artists
    const result = await checkAllArtistBadges();
    
    if (result.success) {
      console.log(`\n📊 Migration Results:`);
      console.log(`   Total Artists: ${result.totalArtists}`);
      console.log(`   Badges Awarded: ${result.badgesAwarded}`);
      
      if (result.results && result.results.length > 0) {
        console.log(`\n🎉 Artists who received badges:`);
        result.results
          .filter(r => r.badgeAwarded)
          .forEach(artist => {
            console.log(`   - ${artist.artistName} (${artist.artworkCount} artworks)`);
          });
      }
      
      console.log("\n✅ Badge migration completed successfully!");
    } else {
      console.error("❌ Migration failed:", result.message);
    }
  } catch (error) {
    console.error("❌ Migration error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from database");
    process.exit(0);
  }
};

// Run the migration
migrateBadges();
