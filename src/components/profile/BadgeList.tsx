// src/components/profile/BadgeList.tsx

import React from "react";
import { Badge } from "../ui/Badge";

type BadgeItem = {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
  earnedAt?: string; // ISO date string
};

interface BadgeListProps {
  badges: BadgeItem[];
  showDescriptions?: boolean;
  onClickBadge?: (badge: BadgeItem) => void;
}

const BadgeList: React.FC<BadgeListProps> = ({
  badges,
  showDescriptions = false,
  onClickBadge,
}) => {
  if (badges.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No badges earned yet. Keep going! 🚀
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="flex flex-col items-center p-3 rounded-2xl shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition cursor-pointer"
          onClick={() => onClickBadge?.(badge)}
        >
          {/* Badge Icon */}
          <div className="mb-2 text-4xl">{badge.icon ?? "🏅"}</div>

          {/* Badge Component */}
          <Badge>{badge.name}</Badge>

          {/* Optional description */}
          {showDescriptions && badge.description && (
            <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-1">
              {badge.description}
            </p>
          )}

          {/* Optional earned date */}
          {badge.earnedAt && (
            <p className="text-[10px] text-gray-400 mt-1">
              Earned {new Date(badge.earnedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default BadgeList;
