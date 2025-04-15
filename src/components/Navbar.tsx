import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Home,
  MessageSquare,
  FolderGit2,
  LogIn,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  GraduationCap,
  Youtube,
  Book,
  Github,
  FileText,
  User
} from 'lucide-react';

// Learning resources data
const learningResources = [
  {
    title: 'Video Tutorials',
    icon: <Youtube className="w-4 h-4" />,
    items: [
      {
        name: 'JavaScript Mastery',
        url: 'https://www.youtube.com/@javascriptmastery',
        description: 'Modern web development tutorials'
      },
      {
        name: 'Fireship',
        url: 'https://www.youtube.com/@Fireship',
        description: 'Quick, practical dev tutorials'
      },
      {
        name: 'Traversy Media',
        url: 'https://www.youtube.com/@TraversyMedia',
        description: 'Web development tutorials'
      }
    ]
  },
  {
    title: 'Documentation',
    icon: <Book className="w-4 h-4" />,
    items: [
      {
        name: 'MDN Web Docs',
        url: 'https://developer.mozilla.org',
        description: 'Comprehensive web documentation'
      },
      {
        name: 'React Documentation',
        url: 'https://react.dev',
        description: 'Official React documentation'
      },
      {
        name: 'TypeScript Handbook',
        url: 'https://www.typescriptlang.org/docs/',
        description: 'TypeScript language documentation'
      }
    ]
  },
  {
    title: 'Practice & Examples',
    icon: <Github className="w-4 h-4" />,
    items: [
      {
        name: 'Frontend Mentor',
        url: 'https://www.frontendmentor.io',
        description: 'Real-world frontend challenges'
      },
      {
        name: 'CodePen',
        url: 'https://codepen.io',
        description: 'Frontend code examples'
      },
      {
        name: 'GitHub Trending',
        url: 'https://github.com/trending',
        description: 'Trending open source projects'
      }
    ]
  },
  {
    title: 'Articles & Blogs',
    icon: <FileText className="w-4 h-4" />,
    items: [
      {
        name: 'Dev.to',
        url: 'https://dev.to',
        description: 'Community-driven dev articles'
      },
      {
        name: 'Medium - Programming',
        url: 'https://medium.com/topic/programming',
        description: 'Curated programming articles'
      },
      {
        name: 'CSS Tricks',
        url: 'https://css-tricks.com',
        description: 'Web development articles'
      }
    ]
  }
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  const NavLinks = () => (
    <div className="space-y-2">
      <Link
        to="/"
        className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 ${
          isActive('/') 
            ? 'bg-cyber-primary text-neon-blue shadow-neon-blue border border-neon-blue' 
            : 'text-gray-400 hover:bg-cyber-primary/50 hover:text-neon-blue'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <Home className="w-4 h-4 min-w-[16px]" />
        {isNavExpanded && <span className="ml-2 whitespace-nowrap text-sm">Home</span>}
      </Link>
      <Link
        to="/forum"
        className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 ${
          isActive('/forum')
            ? 'bg-cyber-primary text-neon-pink shadow-neon-pink border border-neon-pink'
            : 'text-gray-400 hover:bg-cyber-primary/50 hover:text-neon-pink'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <MessageSquare className="w-4 h-4 min-w-[16px]" />
        {isNavExpanded && <span className="ml-2 whitespace-nowrap text-sm">Forum</span>}
      </Link>
      <Link
        to="/projects"
        className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 ${
          isActive('/projects')
            ? 'bg-cyber-primary text-neon-purple shadow-neon-purple border border-neon-purple'
            : 'text-gray-400 hover:bg-cyber-primary/50 hover:text-neon-purple'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <FolderGit2 className="w-4 h-4 min-w-[16px]" />
        {isNavExpanded && <span className="ml-2 whitespace-nowrap text-sm">Projects</span>}
      </Link>
      <Link
        to="/resources"
        className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 ${
          isActive('/resources')
            ? 'bg-cyber-primary text-neon-yellow shadow-neon-yellow border border-neon-yellow'
            : 'text-gray-400 hover:bg-cyber-primary/50 hover:text-neon-yellow'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <GraduationCap className="w-4 h-4 min-w-[16px]" />
        {isNavExpanded && <span className="ml-2 whitespace-nowrap text-sm">Resources</span>}
      </Link>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className={`hidden md:flex bg-cyber-darker border-r border-neon-blue/20 h-screen flex-col transition-all duration-300 ${
        isNavExpanded ? 'w-48' : 'w-16'
      }`}>
        <div className="relative">
          <div className="p-4 border-b border-neon-blue/20">
            {isNavExpanded ? (
              <h1 className="cyber-heading text-lg text-center">CYBER_NET</h1>
            ) : (
              <h1 className="cyber-heading text-lg text-center">CN</h1>
            )}
          </div>
          <button
            onClick={toggleNav}
            className="absolute -right-3 top-4 cyber-button p-1 rounded-full"
          >
            {isNavExpanded ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>
        
        <div className="flex-1 py-4 px-2 overflow-y-auto">
          <NavLinks />
        </div>
        
        <div className="p-2 border-t border-neon-blue/20">
          {isAuthenticated ? (
            <div className="space-y-2">
              {isNavExpanded ? (
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-2 py-1"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full border border-neon-blue"
                  />
                  <span className="text-neon-blue text-sm">{user?.name}</span>
                </Link>
              ) : (
                <Link to="/profile" className="flex justify-center">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full border border-neon-blue"
                  />
                </Link>
              )}
              <button
                onClick={logout}
                className="cyber-button w-full justify-center text-sm py-1.5"
              >
                <LogOut className="w-4 h-4" />
                {isNavExpanded && <span className="ml-1">Logout</span>}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="cyber-button w-full justify-center inline-flex items-center text-sm py-1.5"
            >
              <LogIn className="w-4 h-4" />
              {isNavExpanded && <span className="ml-1">Login</span>}
            </Link>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="cyber-button w-full justify-center mt-2 text-sm py-1.5"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4" />
                {isNavExpanded && <span className="ml-1">Light Mode</span>}
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                {isNavExpanded && <span className="ml-1">Dark Mode</span>}
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-2 right-2 z-50 cyber-button p-1.5"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-cyber-black/95 z-40">
          <div className="flex flex-col h-full p-4">
            <div className="p-4 border-b border-neon-blue/20">
              <h1 className="cyber-heading text-xl text-center">CYBER_NET</h1>
            </div>
            
            <div className="flex-1 py-6 overflow-y-auto">
              <NavLinks />
            </div>
            
            <div className="p-4 border-t border-neon-blue/20">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full border border-neon-blue"
                    />
                    <span className="text-neon-blue text-sm">{user?.name}</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="cyber-button w-full justify-center text-sm"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="cyber-button w-full justify-center inline-flex items-center text-sm"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Login
                </Link>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="cyber-button w-full justify-center mt-2 text-sm"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 mr-1" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 mr-1" />
                    Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-cyber-darker border-t border-neon-blue/20 flex justify-around items-center py-2 px-4 z-30">
        <Link
          to="/"
          className={`flex flex-col items-center ${
            isActive('/') ? 'text-neon-blue' : 'text-gray-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs mt-0.5">Home</span>
        </Link>
        <Link
          to="/forum"
          className={`flex flex-col items-center ${
            isActive('/forum') ? 'text-neon-pink' : 'text-gray-400'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs mt-0.5">Forum</span>
        </Link>
        <Link
          to="/projects"
          className={`flex flex-col items-center ${
            isActive('/projects') ? 'text-neon-purple' : 'text-gray-400'
          }`}
        >
          <FolderGit2 className="w-5 h-5" />
          <span className="text-xs mt-0.5">Projects</span>
        </Link>
        <Link
          to="/resources"
          className={`flex flex-col items-center ${
            isActive('/resources') ? 'text-neon-yellow' : 'text-gray-400'
          }`}
        >
          <GraduationCap className="w-5 h-5" />
          <span className="text-xs mt-0.5">Learn</span>
        </Link>
        {isAuthenticated && (
          <Link
            to="/profile"
            className={`flex flex-col items-center ${
              isActive('/profile') ? 'text-neon-blue' : 'text-gray-400'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs mt-0.5">Profile</span>
          </Link>
        )}
      </nav>
    </>
  );
}