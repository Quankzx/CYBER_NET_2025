import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FolderGit2,
  MessageSquare,
  Settings,
  BookOpen,
  MessageCircle,
  Shield,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      path: '/admin',
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: 'Dashboard',
      color: 'text-neon-blue'
    },
    {
      path: '/admin/users',
      icon: <Users className="w-5 h-5" />,
      label: 'User Management',
      color: 'text-neon-pink'
    },
    {
      path: '/admin/projects',
      icon: <FolderGit2 className="w-5 h-5" />,
      label: 'Project Management',
      color: 'text-neon-purple'
    },
    {
      path: '/admin/posts',
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'Content Moderation',
      color: 'text-neon-yellow'
    },
    {
      path: '/admin/courses',
      icon: <BookOpen className="w-5 h-5" />,
      label: 'Course Management',
      color: 'text-neon-blue'
    },
    {
      path: '/admin/messages',
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'Message Management',
      color: 'text-neon-pink'
    },
    {
      path: '/admin/roles',
      icon: <Shield className="w-5 h-5" />,
      label: 'Role Management',
      color: 'text-neon-purple'
    },
    {
      path: '/admin/settings',
      icon: <Settings className="w-5 h-5" />,
      label: 'System Settings',
      color: 'text-neon-yellow'
    }
  ];

  return (
    <div className="flex min-h-screen bg-cyber-black">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-cyber-darker border-r border-neon-blue/20 flex flex-col fixed h-screen overflow-hidden">
        <div className="p-4 border-b border-neon-blue/20">
          <h1 className="cyber-heading text-xl text-center">Admin Panel</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center gap-3 p-3 cyber-card bg-cyber-primary/30 mb-6">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-10 h-10 rounded-full border border-neon-blue"
              />
              <div>
                <div className="font-medium text-neon-blue">{user?.name}</div>
                <div className="text-xs text-gray-400">Administrator</div>
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? `bg-cyber-primary ${item.color} shadow-neon-blue border border-neon-blue/50`
                      : 'text-gray-400 hover:bg-cyber-primary/50 hover:text-gray-300'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-neon-blue/20">
          <button
            onClick={logout}
            className="cyber-button w-full justify-center py-2 text-sm"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="p-6 min-h-screen overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}