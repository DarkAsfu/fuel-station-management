"use client";

import React from "react";
import {
  Fuel,
  CreditCard,
  Clock,
  Users,
  Settings,
  FileText,
  BarChart2,
  Calculator,
  Warehouse,
  HandCoins,
  Shield,
  Book,
  AlertCircle,
  Zap,
  Contact,
  UserPlus,
  Home
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useAuth } from "@/provider/AuthProvider";

// Sample data
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      items: [
        { title: "Home", url: "/" },
      ],
    },
    {
      title: "Customer Management",
      url: "/customers",
      icon: Contact,
      items: [
        // { title: "Add Customer", url: "/customers/add", icon: UserPlus },
        { title: "Customer List", url: "/customers/list" },
      ],
    },
    // {
    //   title: "Sales Management",
    //   url: "/sales",
    //   icon: CreditCard,
    //   items: [
    //     { title: "POS System", url: "/sales/pos" },
    //     { title: "Shift Management", url: "/sales/shifts" },
    //     { title: "Daily Reports", url: "/sales/reports" },
    //   ],
    // },
    // {
    //   title: "Credit Management",
    //   url: "/credit",
    //   icon: HandCoins,
    //   items: [
    //     { title: "Customers", url: "/credit/customers" },
    //     { title: "Invoices", url: "/credit/invoices" },
    //     { title: "Dues Tracking", url: "/credit/dues" },
    //   ],
    // },
    // {
    //   title: "Loan Management",
    //   url: "/loans",
    //   icon: Calculator,
    //   items: [
    //     { title: "Payable Loans", url: "/loans/payable" },
    //     { title: "Receivable Loans", url: "/loans/receivable" },
    //     { title: "Repayment Schedule", url: "/loans/schedule" },
    //   ],
    // },
    // {
    //   title: "Inventory",
    //   url: "/inventory",
    //   icon: Warehouse,
    //   items: [
    //     { title: "Fuel Stock", url: "/inventory/fuel" },
    //     { title: "Expenses", url: "/inventory/expenses" },
    //     { title: "Vendors", url: "/inventory/vendors" },
    //   ],
    // },
    // {
    //   title: "Accounting",
    //   url: "/accounting",
    //   icon: Book,
    //   items: [
    //     { title: "Profit & Loss", url: "/accounting/pnl" },
    //     { title: "Balance Sheet", url: "/accounting/balance" },
    //     { title: "Financial Reports", url: "/accounting/reports" },
    //   ],
    // },
    {
      title: "Shift Management",
      url: "/shift-management",
      icon: Clock,
      items: [
        { title: "Shift List", url: "/shift-management" },
      ],
    },
    {
      title: "System Configuration",
      url: "/system-config",
      icon: Shield,
      items: [
        { title: "Dispenser Configuration", url: "/system-config/dispenser-configuration" },
      ],
    },
    {
      title: "Admin",
      url: "/admin",
      icon: Settings,
      items: [
        { title: "User Management", url: "/admin/users" },
        { title: "System Settings", url: "/admin/settings" },
        { title: "Audit Logs", url: "/admin/logs" },
      ],
    },
  ],
  quickActions: [
    { name: "New Sale", url: "/sales/pos/new", icon: Zap },
    { name: "Add Customer", url: "/customers/add", icon: UserPlus },
    { name: "Alerts", url: "/alerts", icon: AlertCircle },
    { name: "Shift Clock", url: "/shift/clock", icon: Clock },
  ],
};

export function AppSidebar(props) {
  const { user } = useAuth();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 p-2">
          <Fuel className="h-6 w-6 text-primary" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.quickActions} title="Quick Actions" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}