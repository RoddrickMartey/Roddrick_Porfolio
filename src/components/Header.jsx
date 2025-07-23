import { Home, FolderOpen, User, Mail } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import ThemeToggle from "./DarkModeButton";
import { Button } from "./ui/button";

function Header() {
  const navigate = useNavigate();
  const nav = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },

    { name: "About", path: "/about", icon: <User className="w-4 h-4" /> },
    {
      name: "Projects",
      path: "/projects",
      icon: <FolderOpen className="w-4 h-4" />,
    },
    { name: "Contact", path: "/contact", icon: <Mail className="w-4 h-4" /> },
  ];

  const location = useLocation();

  return (
    <header className="fixed top-0 z-30 flex flex-wrap items-center justify-between w-full max-w-4xl p-4 transform -translate-x-1/2 bg-transparent left-1/2">
      {/* Nav Buttons */}
      <div className="flex flex-wrap justify-center w-full gap-2 sm:w-auto">
        {nav.map((item, index) => (
          <Button
            key={index}
            onClick={() => navigate(item.path)}
            variant={location.pathname === item.path ? "default" : "outline"}
            className="flex items-center gap-1"
          >
            {item.icon}
            <span className="text-sm sm:text-base">{item.name}</span>
          </Button>
        ))}
      </div>

      {/* Theme Toggle */}
      <div className="flex justify-center w-full mt-2 sm:mt-0 sm:w-auto sm:justify-end">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
