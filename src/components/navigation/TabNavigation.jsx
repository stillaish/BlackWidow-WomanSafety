import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../AppIcon";

const TabNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      id: "emergency",
      label: "Emergency",
      icon: "AlertCircle",
      path: "/emergency-dashboard",
    },
    {
      id: "network",
      label: "Safety Network",
      icon: "Users",
      path: "/trusted-contacts",
    },
    {
      id: "cyber",
      label: "Cyber Safety",
      icon: "Shield",
      path: "/cyber-harassment-guide",
    },
    {
      id: "history",
      label: "History",
      icon: "Clock",
      path: "/emergency-history",
    },
    {
      id: "location",
      label: "Location",
      icon: "MapPin",
      path: "/safety-intelligence", // or wherever your map/location page is
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-card border-b border-border">
      <div className="h-16 px-4 md:px-6 lg:px-10 flex items-center justify-between">

        {/* 🔴 LEFT — LOGO / APP NAME */}
        <div className="flex items-center gap-2">
          <Icon name="Shield" size={28} className="text-primary" />
          <span className="text-lg font-bold">Black Widow</span>
        </div>

        {/* 🧭 CENTER — NAV LINKS */}
        <nav className="hidden md:flex items-center gap-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth
                ${
                  isActive(item.path)
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* 🟢 RIGHT — SECURE + PROFILE */}
        <div className="flex items-center gap-3">

          {/* SECURE BADGE */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/20 text-success text-sm font-medium">
            <Icon name="ShieldCheck" size={16} />
            Secure
          </div>

          {/* PROFILE BUTTON */}
          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition"
            title="Profile"
          >
            <Icon name="User" size={20} />
          </button>

        </div>
      </div>
    </header>
  );
};

export default TabNavigation;
// This Is A Prototype Only Do Not Use In Production It MAy Not Work As Expected And Developed by Aish Maheshwari