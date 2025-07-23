import { Navigate, Outlet } from "react-router";
import AppSidebar from "@/components/AppSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import NotFound from "@/pages/NotFound";

export default function ProtectedLayout() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <NotFound />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center justify-between gap-2 px-4 border-b h-14">
          <div className="flex items-center">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Admin</h1>
          </div>

          <Button onClick={logout} variant="destructive">
            <LogOut />
            <span>Logout</span>
          </Button>
        </header>
        <main className="p-4 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
