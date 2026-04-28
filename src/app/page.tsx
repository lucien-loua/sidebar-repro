"use client";

import {
  SidebarInset,
  SidebarManager,
  SidebarManagerProvider,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { FilesSidebar } from "@/components/files-sidebar";
import { HouseIcon } from "@phosphor-icons/react";

function FilesHeader() {
  return (
    <div className="flex shrink-0 items-center gap-2 border-b p-2">
      <SidebarTrigger className="shrink-0" />
      <Separator className="shrink-0" orientation="vertical" />
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <HouseIcon className="size-4" />
        <span>/</span>
        <span className="text-foreground font-medium">Documents</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <SidebarManagerProvider>
      <SidebarProvider>
        <SidebarManager name="files-secondary">
          <FilesSidebar />
        </SidebarManager>
        <SidebarInset className="overflow-hidden">
          <FilesHeader />
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-muted-foreground">
            <p className="text-sm">File content area</p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SidebarManagerProvider>
  );
}
