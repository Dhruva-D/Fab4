import React, { useState, useEffect } from 'react';
import BadgeDisplay from './BadgeDisplay';

interface Badge {
  verified: boolean;
  awardedAt: string | null;
}

interface BadgeInfo {
  badges: Badge;
  artworkCount: number;
  badgeAwarded?: boolean;
}

interface BadgeStats {
  totalArtists: number;
  verifiedArtists: number;
  eligibleArtists: number;
  verificationRate: number;
}

const BadgeManager: React.FC = () => {
  const [badgeInfo, setBadgeInfo] = useState<BadgeInfo | null>(null);
  const [badgeStats, setBadgeStats] = useState<BadgeStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCongratulations, setShowCongratulations] = useState(false);

  const checkBadges = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('https://uvce-backend.onrender.com/api/badges/check', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to check badges');
      }

      setBadgeInfo(data.data);
      
      if (data.data.badgeAwarded) {
        setShowCongratulations(true);
        setTimeout(() => setShowCongratulations(false), 5000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchBadgeStats = async () => {
    try {
      const response = await fetch('https://uvce-backend.onrender.com/api/badges/stats');
      const data = await response.json();
      
      if (data.success) {
        setBadgeStats(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch badge stats:', err);
    }
  };

  useEffect(() => {
    checkBadges();
    fetchBadgeStats();
  }, []);

  const getProgressPercentage = () => {
    if (!badgeInfo) return 0;
    return Math.min((badgeInfo.artworkCount / 3) * 100, 100);
  };

  const getArtworksNeeded = () => {
    if (!badgeInfo) return 3;
    return Math.max(3 - badgeInfo.artworkCount, 0);
  };

  return (
    <div className="space-y-6">
      {/* Congratulations Message */}
      {showCongratulations && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Congratulations! 🎉
              </h3>
              <p className="text-sm text-green-700 mt-1">
                You've earned the 'Verified Artist' badge for uploading 3+ artworks!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Current Badge Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Badges</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {badgeInfo && (
          <div className="space-y-4">
            {/* Badge Display */}
            <div className="flex items-center justify-between">
              <div>
                {badgeInfo.badges.verified ? (
                  <BadgeDisplay badges={badgeInfo.badges} size="large" />
                ) : (
                  <div className="text-gray-500">
                    <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center">
                      ✓
                    </div>
                    <span className="text-sm ml-2">Not yet verified</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={checkBadges}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Checking...' : 'Check Badges'}
              </button>
            </div>

            {/* Progress to Badge */}
            {!badgeInfo.badges.verified && (
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress to Verified Badge</span>
                  <span>{badgeInfo.artworkCount}/3 artworks</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {getArtworksNeeded() === 0 
                    ? "You're eligible for the verified badge! Click 'Check Badges' to claim it." 
                    : `Upload ${getArtworksNeeded()} more artwork${getArtworksNeeded() !== 1 ? 's' : ''} to earn your verified badge.`
                  }
                </p>
              </div>
            )}

            {/* Badge Information */}
            {badgeInfo.badges.verified && badgeInfo.badges.awardedAt && (
              <div className="text-sm text-gray-600">
                <p>Verified on: {new Date(badgeInfo.badges.awardedAt).toLocaleDateString()}</p>
                <p>Total artworks: {badgeInfo.artworkCount}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Badge Statistics */}
      {badgeStats && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Platform Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{badgeStats.totalArtists}</div>
              <div className="text-sm text-gray-600">Total Artists</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{badgeStats.verifiedArtists}</div>
              <div className="text-sm text-gray-600">Verified Artists</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{badgeStats.eligibleArtists}</div>
              <div className="text-sm text-gray-600">Eligible Artists</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {badgeStats.verificationRate.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Verification Rate</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeManager;
