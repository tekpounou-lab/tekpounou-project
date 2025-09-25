// src/components/profile/BadgeList.tsx

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Award } from "lucide-react";

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  icon?: string; // optional icon URL
  earned_at: string;
}

interface BadgeListProps {
  badges: BadgeItem[];
}

const BadgeList: React.FC<BadgeListProps> = ({ badges }) => {
  if (!badges || badges.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
          <Award className="w-6 h-6 mr-2" />
          <span>No badges earned yet</span>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="p-4 flex items-start space-x-4 hover:shadow-md transition-shadow">
            {/* Badge Icon */}
            <div className="flex-shrink-0">
              {badge.icon ? (
                <img
                  src={badge.icon}
                  alt={badge.title}
                  className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/20">
                  <Award className="w-6 h-6 text-pink-600" />
                </div>
              )}
            </div>

            {/* Badge Info */}
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {badge.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {badge.description}
              </p>
              <Badge variant="secondary" className="text-xs">
                Earned {new Date(badge.earned_at).toLocaleDateString()}
              </Badge>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default BadgeList;
