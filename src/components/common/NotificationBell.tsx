
import React from "react";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  text: string;
  isNew: boolean;
  time?: string;
}

interface NotificationBellProps {
  notifications: Notification[];
  className?: string;
}

export const NotificationBell = ({
  notifications,
  className,
}: NotificationBellProps) => {
  const newNotifications = notifications.filter((n) => n.isNew);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("relative", className)}>
          <Bell className="h-5 w-5" />
          {newNotifications.length > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-destructive"
              aria-label={`${newNotifications.length} unread notifications`}
            >
              {newNotifications.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {newNotifications.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {newNotifications.length} new
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="py-4 px-2 text-center text-sm text-muted-foreground">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="cursor-pointer py-3">
              <div className="flex items-start gap-2">
                {notification.isNew && (
                  <div className="h-2 w-2 mt-1 rounded-full bg-blue-500 flex-shrink-0" />
                )}
                <div className="flex flex-col gap-1">
                  <span>{notification.text}</span>
                  {notification.time && (
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  )}
                </div>
              </div>
            </DropdownMenuItem>
          ))
        )}
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-center text-sm font-medium text-primary">
              View all notifications
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
