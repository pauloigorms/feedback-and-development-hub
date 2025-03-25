
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarClock, FileText, Home, User } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export const SidebarNavigation = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/",
    },
    {
      title: "Feedback 1:1",
      icon: CalendarClock,
      path: "/feedback",
    },
    {
      title: "PDI",
      icon: FileText,
      path: "/pdi",
    },
    {
      title: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2",
                    location.pathname === item.path && "font-medium text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
