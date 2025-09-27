// src/components/layout/Navbar.tsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  BriefcaseIcon,
  ChartBarIcon,
  UserIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
  CogIcon,
  NewspaperIcon,
  FolderOpenIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  UsersIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';
import { AccessibleTooltip } from '../ui/AccessibilityComponents';
import { NotificationBell } from '../notifications/NotificationBell';
import { useAuthStore } from '../../stores/authStore';
import { GRADIENTS } from '../../styles/design-system';
import { Button } from '@/components/ui/Button';
import type { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, profile, signOut } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navigation = [
    { 
      name: t('nav.courses'), 
      href: '/courses', 
      icon: BookOpenIcon,
      current: location.pathname.startsWith('/courses')
    },
    { 
      name: t('nav.blog'), 
      href: '/blog', 
      icon: ChatBubbleLeftRightIcon,
      current: location.pathname.startsWith('/blog')
    },
    { 
      name: 'Resous', 
      href: '/resources', 
      icon: FolderOpenIcon,
      current: location.pathname.startsWith('/resources')
    },
    { 
      name: 'Nouvèl', 
      href: '/news', 
      icon: NewspaperIcon,
      current: location.pathname.startsWith('/news')
    },
    { 
      name: 'Patnè', 
      href: '/partners', 
      icon: UserGroupIcon,
      current: location.pathname.startsWith('/partners')
    },
    { 
      name: 'Aktivite', 
      href: '/events', 
      icon: CalendarDaysIcon,
      current: location.pathname.startsWith('/events')
    },
    { 
      name: 'Gwoup', 
      href: '/groups', 
      icon: UsersIcon,
      current: location.pathname.startsWith('/groups')
    },
    { 
      name: 'Rezo', 
      href: '/networking', 
      icon: UserPlusIcon,
      current: location.pathname.startsWith('/networking')
    },
    { 
      name: t('nav.services'), 
      href: '/services', 
      icon: BriefcaseIcon,
      current: location.pathname.startsWith('/services')
    },
    { 
      name: 'Pricing', 
      href: '/pricing', 
      icon: CogIcon,
      current: location.pathname.startsWith('/pricing')
    },
    { 
      name: t('nav.analytics'), 
      href: '/analytics', 
      icon: ChartBarIcon,
      current: location.pathname.startsWith('/analytics')
    }
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user || !profile) return null;
    
    const hasRole = (role: UserRole) => 
      Array.isArray(profile.roles) && profile.roles.includes(role);
    
    if (hasRole('super_admin')) {
      return { href: '/admin/content', label: 'Jesyon Kontni', icon: CogIcon };
    }
    if (hasRole('admin')) {
      return { href: '/admin-panel', label: 'Admin Panel', icon: CogIcon };
    }
    if (hasRole('teacher')) {
      return { href: '/dashboard/teacher', label: t('nav.dashboard'), icon: CogIcon };
    }
    if (hasRole('sme_client')) {
      return { href: '/client', label: t('nav.dashboard'), icon: CogIcon };
    }
    
    return { href: '/dashboard/student', label: t('nav.dashboard'), icon: UserIcon };
  };

  const dashboardLink = getDashboardLink();

  return (
    <nav 
      className="bg-background/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-border"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-lg"
            aria-label={t('brand.welcome')}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="/logo.png"
                alt="Tek Pou Nou"
                className="h-8 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1" role="menubar">
            <Link 
              to="/"
              className={`
                flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                ${location.pathname === '/' 
                  ? 'text-primary-foreground tpn-gradient' 
                  : 'text-foreground hover:text-accent hover:bg-muted/30'
                }
              `}
              role="menuitem"
              aria-current={location.pathname === '/' ? 'page' : undefined}
            >
              <HomeIcon className="w-4 h-4 mr-2" aria-hidden="true" />
              {t('common.home')}
            </Link>

            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                    ${item.current 
                      ? 'text-primary-foreground tpn-gradient' 
                      : 'text-foreground hover:text-accent hover:bg-muted/30'
                    }
                  `}
                  role="menuitem"
                  aria-current={item.current ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4 mr-2" aria-hidden="true" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <LanguageSwitcher variant="dropdown" showFlags />
            <ThemeSwitcher variant="toggle" />
            {user && <NotificationBell />}
            
            {user ? (
              <div className="relative">
                <AccessibleTooltip content={profile?.display_name || user.email?.split('@')[0] || t('nav.profile')}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="
                      flex items-center space-x-2 px-3 py-2 text-sm font-medium
                      tpn-gradient text-primary-foreground rounded-lg
                      hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                      transition-all duration-200
                    "
                    aria-expanded={isProfileMenuOpen}
                    aria-haspopup="true"
                  >
                    <UserIcon className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden xl:block truncate max-w-24">
                      {profile?.display_name || user.email?.split('@')[0] || t('nav.profile')}
                    </span>
                  </motion.button>
                </AccessibleTooltip>
                
                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="
                        absolute right-0 mt-2 w-56 bg-card 
                        border border-border 
                        rounded-xl shadow-lg py-2 z-50
                      "
                      role="menu"
                      aria-orientation="vertical"
                    >
                      {dashboardLink && (
                        <Link
                          to={dashboardLink.href}
                          className="
                            flex items-center px-4 py-3 text-sm text-foreground 
                            hover:bg-muted/50 hover:text-accent
                            transition-colors duration-150
                          "
                          onClick={() => setIsProfileMenuOpen(false)}
                          role="menuitem"
                        >
                          <dashboardLink.icon className="w-4 h-4 mr-3" aria-hidden="true" />
                          {dashboardLink.label}
                        </Link>
                      )}
                      
                      {Array.isArray(profile?.roles) && profile.roles.includes('super_admin' as UserRole) && (
                        <Link
                          to="/admin/community"
                          className="
                            flex items-center px-4 py-3 text-sm text-foreground 
                            hover:bg-muted/50 hover:text-accent
                            transition-colors duration-150
                          "
                          onClick={() => setIsProfileMenuOpen(false)}
                          role="menuitem"
                        >
                          <UsersIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                          Jesyon Kominotè
                        </Link>
                      )}
                      
                      <Link
                        to="/profile"
                        className="
                          flex items-center px-4 py-3 text-sm text-foreground 
                          hover:bg-muted/50 hover:text-accent
                          transition-colors duration-150
                        "
                        onClick={() => setIsProfileMenuOpen(false)}
                        role="menuitem"
                      >
                        <UserIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                        {t('nav.profile')}
                      </Link>
                      
                      <div className="border-t border-border/50 my-2" />
                      
                      <button
                        onClick={handleSignOut}
                        className="
                          flex items-center w-full px-4 py-3 text-sm text-destructive 
                          hover:bg-destructive/10
                          transition-colors duration-150
                        "
                        role="menuitem"
                      >
                        <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                        {t('nav.logout')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-foreground hover:bg-muted/30">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="tpn-gradient text-primary-foreground">
                    {t('nav.signup')}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <LanguageSwitcher variant="buttons" showFlags={false} className="hidden sm:flex" />
            <ThemeSwitcher variant="toggle" className="hidden sm:block" />
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                p-2 text-foreground hover:text-accent
                hover:bg-muted/30 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-accent
                transition-all duration-200
              "
              aria-expanded={isMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? (
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border py-4"
              role="menu"
            >
              <div className="space-y-2">
                <Link
                  to="/"
                  className={`
                    flex items-center px-4 py-3 text-base font-medium rounded-lg mx-2 transition-all duration-200
                    ${location.pathname === '/' 
                      ? 'text-primary-foreground tpn-gradient' 
                      : 'text-foreground hover:text-accent hover:bg-muted/30'
                    }
                  `}
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                >
                  <HomeIcon className="w-5 h-5 mr-3" aria-hidden="true" />
                  {t('common.home')}
                </Link>

                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`
                        flex items-center px-4 py-3 text-base font-medium rounded-lg mx-2 transition-all duration-200
                        ${item.current 
                          ? 'text-primary-foreground tpn-gradient' 
                          : 'text-foreground hover:text-accent hover:bg-muted/30'
                        }
                      `}
                      onClick={() => setIsMenuOpen(false)}
                      role="menuitem"
                    >
                      <Icon className="w-5 h-5 mr-3" aria-hidden="true" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Controls */}
              <div className="sm:hidden border-t border-border pt-4 mt-4 px-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {t('profile.language')}
                  </span>
                  <LanguageSwitcher variant="buttons" showFlags className="scale-90" />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-medium text-foreground">
                    {t('profile.theme')}
                  </span>
                  <ThemeSwitcher variant="toggle" />
                </div>
              </div>

              {/* Mobile User Section */}
              <div className="border-t border-border pt-4 mt-4">
                {user ? (
                  <div className="space-y-2 px-2">
                    {dashboardLink && (
                      <Link
                        to={dashboardLink.href}
                        className="
                          flex items-center px-4 py-3 text-base font-medium text-foreground 
                          hover:bg-muted/30 rounded-lg
                          transition-colors duration-200
                        "
                        onClick={() => setIsMenuOpen(false)}
                        role="menuitem"
                      >
                        <dashboardLink.icon className="w-5 h-5 mr-3" aria-hidden="true" />
                        {dashboardLink.label}
                      </Link>
                    )}
                    
                    <Link
                      to="/profile"
                      className="
                        flex items-center px-4 py-3 text-base font-medium text-foreground 
                        hover:bg-muted/30 rounded-lg
                        transition-colors duration-200
                      "
                      onClick={() => setIsMenuOpen(false)}
                      role="menuitem"
                    >
                      <UserIcon className="w-5 h-5 mr-3" aria-hidden="true" />
                      {t('nav.profile')}
                    </Link>
                    
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="
                        flex items-center w-full px-4 py-3 text-base font-medium 
                        text-destructive hover:bg-destructive/10 rounded-lg
                        transition-colors duration-200
                      "
                      role="menuitem"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" aria-hidden="true" />
                      {t('nav.logout')}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 px-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full"
                    >
                      <Button variant="ghost" className="w-full justify-center">
                        {t('nav.login')}
                      </Button>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full"
                    >
                      <Button className="w-full justify-center tpn-gradient text-primary-foreground">
                        {t('nav.signup')}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;