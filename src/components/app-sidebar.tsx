"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  CalendarIcon,
  ChatsTeardropIcon,
  EnvelopeIcon,
  FoldersIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

const NAV_ITEMS = [
  { id: "files", icon: FoldersIcon, label: "Files" },
  { id: "calendar", icon: CalendarIcon, label: "Calendar" },
  { id: "mail", icon: EnvelopeIcon, label: "Mail" },
  { id: "talks", icon: ChatsTeardropIcon, label: "Talk" },
] as const;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [active, setActive] = useState("files");

  return (
    <Sidebar collapsible="icon" position="sticky" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="justify-between"
              render={<div />}
              size="lg"
            >
              <span className="truncate font-semibold text-sm group-data-[collapsible=icon]:hidden">
                My App
              </span>
              <SidebarTrigger />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton
                    isActive={active === id}
                    onClick={() => setActive(id)}
                    tooltip={{ children: label, hidden: false }}
                  >
                    <Icon weight={active === id ? "fill" : "regular"} />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          sidebar-repro
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
