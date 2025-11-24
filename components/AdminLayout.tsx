import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout, settings } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path: string) => location.pathname.includes(path) ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white";

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-900 text-white">
        <div className="flex items-center justify-center h-16 border-b border-gray-800">
          <span className="text-lg font-bold">Admin Panel</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            <Link to="/admin/dashboard" className={`${isActive('dashboard')} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}>
              <i className="fa-solid fa-chart-line mr-3 w-6 text-center"></i> Dashboard
            </Link>
            <Link to="/admin/products" className={`${isActive('products')} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}>
              <i className="fa-solid fa-box mr-3 w-6 text-center"></i> Products
            </Link>
            <Link to="/admin/settings" className={`${isActive('settings')} group flex items-center px-2 py-2 text-sm font-medium rounded-md`}>
              <i className="fa-solid fa-gear mr-3 w-6 text-center"></i> Settings
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-white">Sign out</button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header (visible only on small screens) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex md:hidden items-center justify-between p-4 bg-gray-900 text-white">
          <span className="font-bold">Admin Panel</span>
          <button onClick={handleLogout} className="text-sm">Logout</button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;