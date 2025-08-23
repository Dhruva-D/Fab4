import React from 'react';

interface Badge {
  verified: boolean;
  awardedAt: string | null | undefined;
}

interface BadgeDisplayProps {
  badges?: Badge;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({
  badges,
  size = 'medium',
  showLabel = true
}) => {
  if (!badges?.verified) {
    return null;
  }

  const sizeClasses = {
    small: 'w-4 h-4 text-xs',
    medium: 'w-6 h-6 text-sm',
    large: 'w-8 h-8 text-base'
  };

  const formatAwardedDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex items-center gap-2">
      <div 
        className={`${sizeClasses[size]} bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg`}
        title={`Verified Artist Badge${badges.awardedAt ? ` - Awarded on ${formatAwardedDate(badges.awardedAt)}` : ''}`}
      >
        ✓
      </div>
      {showLabel && (
        <span className="text-blue-600 font-semibold text-sm">
          Verified Artist
        </span>
      )}
    </div>
  );
};

export default BadgeDisplay;
