import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/products', label: 'Products', icon: <Package size={20} /> },
    // Placeholders for future expansion
    { path: '/users', label: 'Users', icon: <Users size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-indigo-800 text-white">
      <div className="p-4 border-b border-indigo-700">
        <h1 className="text-xl font-bold">Dev Test Project</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-100 hover:bg-indigo-700'
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-indigo-700">
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 w-full text-left text-indigo-100 hover:bg-indigo-700 rounded-lg transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;