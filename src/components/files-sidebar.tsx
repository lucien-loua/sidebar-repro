"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ClockIcon,
  HeartIcon,
  FoldersIcon,
  TrashIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

const NAV_ITEMS = [
  { id: "all", icon: FoldersIcon, label: "All files" },
  { id: "recent", icon: ClockIcon, label: "Recent" },
  { id: "favorites", icon: HeartIcon, label: "Favorites" },
  { id: "shared", icon: ShareNetworkIcon, label: "Shared" },
  { id: "trash", icon: TrashIcon, label: "Trash" },
] as const;

export function FilesSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [active, setActive] = useState("all");

  return (
    <Sidebar collapsible="icon" position="sticky">
      <SidebarHeader className="border-b group-data-[collapsible=icon]:hidden">
        <SidebarInput placeholder="Search..." />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={active === item.id}
                    onClick={() => setActive(item.id)}
                    tooltip={item.label}
                  >
                    <item.icon weight="duotone" />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!isCollapsed && (
        <SidebarFooter className="p-3">
          <div className="h-2 w-full rounded-full bg-muted">
            <div className="h-full w-2/5 rounded-full bg-primary" />
          </div>
          <p className="text-xs text-muted-foreground">4.2 GB of 10 GB used</p>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
