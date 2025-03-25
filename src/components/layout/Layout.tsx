
import React from "react";
import { Outlet } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarNavigation } from "./SidebarNavigation";
import { SidebarProfile } from "./SidebarProfile";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="flex h-14 items-center justify-center px-4">
            <h1 className="text-xl font-semibold tracking-tight">FeedbackHub</h1>
          </SidebarHeader>
          <SidebarContent className="flex flex-col gap-6">
            <SidebarNavigation />
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <SidebarProfile />
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col">
          <Header />
          <Separator />
          <main className="flex-1 overflow-auto">
            <div className="container py-6 px-6 md:px-10 max-w-7xl animate-fade-in">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
