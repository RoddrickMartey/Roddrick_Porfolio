import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { User, KeyRound, FileEdit, PlusSquare } from "lucide-react";
import ThemeToggle from "./DarkModeButton";

function AppSidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const username = user?.username || "Admin";

  return (
    <Sidebar>
      {/* Sidebar Header */}
      <SidebarHeader className="flex flex-row items-center justify-between px-4 py-3">
        <Label className="font-bold">{username}</Label>
        <ThemeToggle />
      </SidebarHeader>

      <SidebarContent>
        {/* ✅ Group 1: User Details */}
        <SidebarGroup>
          <SidebarGroupLabel>Profile</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/details")}
                  className="gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>User Details</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ✅ Group 2: Account Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>Account Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/edit/username")}
                  className="gap-2"
                >
                  <FileEdit className="w-4 h-4" />
                  <span>Update Username</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/edit/password")}
                  className="gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Update Password</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ✅ Group 3: Project Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/projects")}
                  className="gap-2"
                >
                  <FileEdit className="w-4 h-4" />
                  <span>Manage Projects</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/admin/add-project")}
                  className="gap-2"
                >
                  <PlusSquare className="w-4 h-4" />
                  <span>Add Project</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
