import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Users, HelpCircle, Mail, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import logoImage from "figma:asset/019f16b0ab8c3460ab3d1fa60a0b9d0f5050e640.png";

export function FTALayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const publicNavigation = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: BookOpen },
    { name: 'Meet the Team', path: '/team', icon: Users },
    { name: 'FAQ', path: '/faq', icon: HelpCircle },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white sticky top-0 z-50 shadow-lg" role="navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white">
                <img src={logoImage} alt="FTA Logo" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block">
                <div className="text-lg">Favy Tech Academy</div>
                <div className="text-xs text-white/80">Where AI Meets Learning</div>
              </div>
              <div className="sm:hidden text-base">FTA</div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {publicNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2">
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => navigate(user.role === 'admin' ? '/admin' : '/student')}
                    className="bg-orange-500 hover:bg-orange-600 text-white border-0"
                    size="sm"
                  >
                    Dashboard
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    size="sm"
                  >
                    <LogOut className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => navigate('/login')}
                  className="bg-orange-500 hover:bg-orange-600 text-white border-0"
                  size="sm"
                >
                  Login
                </Button>
              )}
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-white/10">
              {publicNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-3 rounded-md mt-2 transition-colors ${
                      isActive(item.path)
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main role="main" className="min-h-[calc(100vh-4rem-12rem)]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white">
                  <img src={logoImage} alt="FTA Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg">Favy Tech Academy</h3>
                  <p className="text-sm text-gray-400">Empowering the next generation</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Your gateway to AI and digital learning. Join thousands of students mastering technology skills.
              </p>
            </div>
            
            <div>
              <h4 className="mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/team" className="text-gray-400 hover:text-white transition-colors">Our Team</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:help.favytechacademy@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                    help.favytechacademy@gmail.com
                  </a>
                </li>
                <li>
                  <a 
                    href="https://chat.whatsapp.com/LPz6wqlgo5o8TRv6HX40nV?mode=ems_copy_t" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Join WhatsApp Community →
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>&copy; 2025 Favy Tech Academy. All rights reserved. Built with passion for education.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}