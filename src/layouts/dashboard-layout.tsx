import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router";

const DashboardLayout = () => {
  const query = useQuery({
    queryKey: ["auth/profile"],
    queryFn: async () => {
      const response = await axios.get("/auth/profile");
      return response.data;
    },
  });

  if (!query.isLoading && !query.data) {
    return <Navigate to="/auth/login" replace />;
  }

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 56)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
