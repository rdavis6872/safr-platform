"use client"

import * as React from "react"
import { PortalSwitcher } from "@/components/portal-switcher"
import {
  Shield,
  FileText,
  LayoutDashboard,
  Users,
  Settings,
  CreditCard,
  Search,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Intelligence",
      items: [
        {
          title: "Dashboard",
          url: "#",
          icon: LayoutDashboard,
          isActive: true,
        },
        {
          title: "Reports Library",
          url: "#",
          icon: FileText,
        },
        {
          title: "Live Telemetry",
          url: "#",
          icon: Clock,
        },
      ],
    },
    {
      title: "Forensic Audit (HITL)",
      items: [
        {
          title: "Approval Queue",
          url: "#",
          icon: CheckCircle,
          badge: "4",
        },
        {
          title: "Conflict Resolution",
          url: "#",
          icon: AlertCircle,
          badge: "1",
        },
      ],
    },
    {
      title: "Business & Leads",
      items: [
        {
          title: "Subscribers",
          url: "#",
          icon: Users,
        },
        {
          title: "Stripe Billing",
          url: "#",
          icon: CreditCard,
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          title: "Settings",
          url: "#",
          icon: Settings,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <PortalSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium">
                            {item.badge}
                          </span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
