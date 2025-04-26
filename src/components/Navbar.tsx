import React, { useState } from 'react';
import { Menu, X, Bell, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/products', label: 'Products' },
    { path: '/users', label: 'Users' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:block md:ml-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome{user?.name ? `, ${user.name}` : ''}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
            <Bell size={20} />
          </button>
          <div className="relative">
            <button className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <User size={16} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="py-3 px-4 bg-indigo-800 text-white md:hidden">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg ${
                    isActive
                      ? 'bg-indigo-700 text-white'
                      : 'text-indigo-100 hover:bg-indigo-700'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-indigo-100 hover:bg-indigo-700 rounded-lg"
            >
              Logout
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;