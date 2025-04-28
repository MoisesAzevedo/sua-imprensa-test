import React from "react";
import { useNavigate } from "react-router-dom";
import { PackageCheck, LayoutDashboard, Users, Settings } from "lucide-react";

const QuickAccess: React.FC = () => {
  const navigate = useNavigate();

  const shortcuts = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />
    },
    {
      label: "Products",
      path: "/products",
      icon: <PackageCheck size={20} />
    },
    {
      label: "Users",
      path: "/users",
      icon: <Users size={20} />
    },
    {
      label: "Settings",
      path: "/settings",
      icon: <Settings size={20} />
    }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4 h-[100%]">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Quick Access</h2>
      <ul className="space-y-2">
        {shortcuts.map((shortcut) => (
          <li
            key={shortcut.path}
            onClick={() => navigate(shortcut.path)}
            className="flex items-center p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-100 text-gray-700 text-sm"
          >
            <div className="mr-3 text-indigo-600">{shortcut.icon}</div>
            <span className="font-medium">{shortcut.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickAccess;
