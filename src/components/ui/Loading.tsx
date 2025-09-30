// src/components/ui/Loading.tsx
import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
  size?: number; // spinner size in pixels
  className?: string; // optional additional styling
}

export const Loading: React.FC<LoadingProps> = ({
  message = "Loading...",
  size = 48,
  className = "",
}) => {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-background text-foreground ${className}`}
    >
      <Loader2 className="animate-spin text-accent" size={size} />
      <p className="mt-4 text-lg text-muted-foreground">{message}</p>
    </div>
  );
};
