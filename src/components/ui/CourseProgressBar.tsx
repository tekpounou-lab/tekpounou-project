// src/components/ui/CourseProgressBar.tsx

import React from "react";
import { Progress } from "./Progress";

interface CourseProgressBarProps {
  courseName: string;
  progress: number; // 0–100
  showLabel?: boolean;
}

const CourseProgressBar: React.FC<CourseProgressBarProps> = ({
  courseName,
  progress,
  showLabel = true,
}) => {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full">
      {/* Course name */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {courseName}
        </span>
        {showLabel && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {normalizedProgress}%
          </span>
        )}
      </div>

      {/* Progress bar */}
      <Progress value={normalizedProgress} className="h-3 rounded-full" />
    </div>
  );
};

export default CourseProgressBar;
