const express = require("express");
const {
  checkMyBadges,
  getBadgesStats,
  checkAllBadges,
  getVerifiedArtists,
} = require("../controllers/badgeController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Get badge statistics (public route)
router.get("/stats", getBadgesStats);

// Get all verified artists (public route)
router.get("/verified-artists", getVerifiedArtists);

// Check badges for current user (protected route)
router.get("/check", authenticateToken, checkMyBadges);

// Admin route to check all artist badges (protected route)
// In production, add admin middleware here
router.post("/check-all", authenticateToken, checkAllBadges);

module.exports = router;
