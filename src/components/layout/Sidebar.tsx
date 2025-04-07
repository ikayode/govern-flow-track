
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  Home, 
  FileText, 
  Upload, 
  Clock, 
  BarChart, 
  Settings,
  Users,
  FolderOpen
} from "lucide-react";

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  
  // Define navigation items based on user role
  const navItems = [
    {
      name: "Dashboard",
      icon: <Home size={20} />,
      to: "/dashboard",
      roles: ["admin", "sender", "reviewer", "observer"]
    },
    {
      name: "My Documents",
      icon: <FileText size={20} />,
      to: "/documents",
      roles: ["admin", "sender", "reviewer", "observer"]
    },
    {
      name: "Upload Document",
      icon: <Upload size={20} />,
      to: "/upload",
      roles: ["admin", "sender"]
    },
    {
      name: "Recent Activity",
      icon: <Clock size={20} />,
      to: "/activity",
      roles: ["admin", "sender", "reviewer", "observer"]
    },
    {
      name: "Shared Documents",
      icon: <FolderOpen size={20} />,
      to: "/shared",
      roles: ["admin", "sender", "reviewer", "observer"]
    },
    {
      name: "Analytics",
      icon: <BarChart size={20} />,
      to: "/analytics",
      roles: ["admin", "observer"]
    },
    {
      name: "User Management",
      icon: <Users size={20} />,
      to: "/users",
      roles: ["admin"]
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      to: "/settings",
      roles: ["admin"]
    }
  ];
  
  // Filter items based on user role
  const filteredNavItems = navItems.filter(
    item => user && item.roles.includes(user.role)
  );

  return (
    <div className="bg-sidebar w-64 h-full py-6 flex flex-col">
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold text-sidebar-foreground">
          Document Flow
        </h2>
        <p className="text-xs text-sidebar-foreground/70">
          {user?.department} - {user?.position}
        </p>
      </div>
      
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {filteredNavItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="px-6 mt-6 pt-6 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/70">
          <p>GovFlow System</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
