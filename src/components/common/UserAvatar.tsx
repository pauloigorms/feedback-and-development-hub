
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  image?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
  status?: "online" | "away" | "busy" | "offline";
}

export const UserAvatar = ({
  name,
  image,
  className,
  size = "md",
  showStatus = false,
  status = "offline",
}: UserAvatarProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
    
  const statusColors = {
    online: "bg-emerald-500",
    away: "bg-amber-500",
    busy: "bg-rose-500",
    offline: "bg-gray-400",
  };

  return (
    <div className="relative">
      <Avatar
        className={cn(
          size === "sm" && "h-8 w-8",
          size === "md" && "h-10 w-10",
          size === "lg" && "h-12 w-12",
          className
        )}
      >
        {image && <AvatarImage src={image} alt={name} />}
        <AvatarFallback className="bg-primary/10 text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>
      
      {showStatus && (
        <span
          className={cn(
            "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};
