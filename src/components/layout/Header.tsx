
import React from "react";
import { useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const location = useLocation();
  
  // Get title based on current route
  const getTitle = () => {
    const path = location.pathname;
    
    if (path === "/") return "Dashboard";
    if (path.includes("/feedback")) return "Feedback 1:1";
    if (path.includes("/pdi")) return "PDI";
    if (path.includes("/profile")) return "Profile";
    
    return "Dashboard";
  };

  // Mock notifications
  const notifications = [
    { id: 1, text: "Feedback session scheduled for tomorrow", isNew: true },
    { id: 2, text: "New PDI goal was approved", isNew: true },
    { id: 3, text: "Reminder: Complete your self-assessment", isNew: false },
  ];

  return (
    <header className="h-14 border-b px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-medium">{getTitle()}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.some(n => n.isNew) && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-destructive">
                  {notifications.filter(n => n.isNew).length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="cursor-pointer py-3">
                <div className="flex items-start gap-2">
                  {notification.isNew && (
                    <div className="h-2 w-2 mt-1 rounded-full bg-blue-500 flex-shrink-0" />
                  )}
                  <span>{notification.text}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
