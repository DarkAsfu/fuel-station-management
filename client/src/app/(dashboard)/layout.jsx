"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

// Custom mapping for route names
const routeNameMap  = {
  'dashboard': 'Dashboard',
  'sales': 'Sales',
  'pos': 'Point of Sale',
  'shifts': 'Shift Management',
  'reports': 'Reports',
  'credit': 'Credit',
  'customers': 'Customers',
  'invoices': 'Invoices',
  'dues': 'Customer Dues',
  'loans': 'Loans',
  'payable': 'Payable Loans',
  'receivable': 'Receivable Loans',
  'schedule': 'Repayment Schedule',
  'inventory': 'Inventory',
  'fuel': 'Fuel Stock',
  'expenses': 'Expenses',
  'vendors': 'Vendors',
  'accounting': 'Accounting',
  'pnl': 'Profit & Loss',
  'balance': 'Balance Sheet',
  'admin': 'Administration',
  'users': 'User Management',
  'settings': 'System Settings',
  'logs': 'Audit Logs'
};


export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  
  // Generate breadcrumbs from current path
  const breadcrumbs = () => {
    if (!pathname) return [];
    
    const paths = pathname.split('/').filter(Boolean);
    
    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      const displayName = routeNameMap[path] || 
                         path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
      
      return {
        href,
        name: displayName,
        isCurrent: index === paths.length - 1
      };
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {/* Always show Home as first breadcrumb */}
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                
                {breadcrumbs().length > 0 && (
                  <>
                    <BreadcrumbSeparator />
                    {breadcrumbs().map((crumb, index) => (
                      <React.Fragment key={index}>
                        <BreadcrumbItem>
                          {crumb.isCurrent ? (
                            <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={crumb.href}>
                              {crumb.name}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {index < breadcrumbs().length - 1 && (
                          <BreadcrumbSeparator />
                        )}
                      </React.Fragment>
                    ))}
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}