// src/components/layout/Navbar.tsx
import React, { useState, useMemo } from 'react';
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
import { BrandButton } from '../ui/BrandComponents';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';
import { AccessibleTooltip } from '../ui/AccessibilityComponents';
import { NotificationBell } from '../notifications/NotificationBell';
import { useAuthStore } from '../../stores/authStore';
import type { UserRole } from '../../types';

// Navigation config
const NAV_ITEMS = [
  { name: 'nav.courses', href: '/courses', icon: BookOpenIcon },
  { name: 'nav.blog', href: '/blog', icon: ChatBubbleLeftRightIcon },
  { name: 'Resous', href: '/resources', icon: FolderOpenIcon },
  { name: 'Nouvèl', href: '/news', icon: NewspaperIcon },
  { name: 'Patnè', href: '/partners', icon: UserGroupIcon },
  { name: 'Aktivite', href: '/events', icon: CalendarDaysIcon },
  { name: 'Gwoup', href: '/groups', icon: UsersIcon },
  { name: 'Rezo', href: '/networking', icon: UserPlusIcon },
  { name: 'nav.services', href: '/services', icon: BriefcaseIcon },
  { name: 'Pricing', href: '/pricing', icon: CogIcon },
  { name: 'nav.analytics', href: '/analytics', icon: ChartBarIcon }
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, profile, signOut } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Memoized navigation items with active state
  const navigation = useMemo(
    () =>
      NAV_ITEMS.map(item => ({
        ...item,
        name: item.name.startsWith('nav.') ? t(item.name) : item.name,
        current: location.pathname.startsWith(item.href)
      })),
    [location.pathname, t]
  );

  // Role-based dashboard link
  const dashboardLink = useMemo(() => {
    if (!user || !profile?.roles) return null;

    const hasRole = (role: UserRole) => profile.roles.includes(role);

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
  }, [user, profile, t]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  const renderNavItems = (isMobile = false) => (
    <>
      <Link
        to="/"
        className={`
          flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
          ${location.pathname === '/' 
            ? 'text-primary-foreground bg-gradient-to-r from-primary to-accent' 
            : 'text-foreground hover:text-primary hover:bg-muted/50'
          }
        `}
        onClick={() => isMobile && setIsMenuOpen(false)}
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
              ${item.current 
                ? 'text-primary-foreground bg-gradient-to-r from-primary to-accent' 
                : 'text-foreground hover:text-primary hover:bg-muted/50'
              }
            `}
            onClick={() => isMobile && setIsMenuOpen(false)}
            role="menuitem"
            aria-current={item.current ? 'page' : undefined}
          >
            <Icon className="w-4 h-4 mr-2" aria-hidden="true" />
            {item.name}
          </Link>
        );
      })}
    </>
  );

  const renderAuthButtons = () => (
    <div className="flex items-center space-x-3">
      <Link to="/login">
        <BrandButton variant="ghost" size="sm">
          {t('nav.login')}
        </BrandButton>
      </Link>
      <Link to="/register">
        <BrandButton variant="primary" size="sm">
          {t('nav.signup')}
        </BrandButton>
      </Link>
    </div>
  );

  const renderProfileMenu = () => (
    <div className="relative">
      <AccessibleTooltip content={profile?.display_name || user?.email?.split('@')[0] || t('nav.profile')}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-primary-foreground bg-gradient-to-r from-accent to-primary rounded-lg hover:shadow-lg transition-all duration-200"
          aria-expanded={isProfileMenuOpen}
          aria-haspopup="true"
        >
          <UserIcon className="w-4 h-4" aria-hidden="true" />
          <span className="hidden xl:block truncate max-w-24">
            {profile?.display_name || user?.email?.split('@')[0] || t('nav.profile')}
          </span>
        </motion.button>
      </AccessibleTooltip>

      <AnimatePresence>
        {isProfileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-xl shadow-lg py-2 z-50"
            role="menu"
          >
            {dashboardLink && (
              <Link
                to={dashboardLink.href}
                className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-muted/50 transition-colors duration-150"
                onClick={() => setIsProfileMenuOpen(false)}
                role="menuitem"
              >
                <dashboardLink.icon className="w-4 h-4 mr-3" aria-hidden="true" />
                {dashboardLink.label}
              </Link>
            )}

            {profile?.roles?.includes('super_admin' as UserRole) && (
              <Link
                to="/admin/community"
                className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-muted/50 transition-colors duration-150"
                onClick={() => setIsProfileMenuOpen(false)}
                role="menuitem"
              >
                <UsersIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                Jesyon Kominotè
              </Link>
            )}

            <Link
              to="/profile"
              className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-muted/50 transition-colors duration-150"
              onClick={() => setIsProfileMenuOpen(false)}
              role="menuitem"
            >
              <UserIcon className="w-4 h-4 mr-3" aria-hidden="true" />
              {t('nav.profile')}
            </Link>

            <div className="border-t border-border my-2" />

            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-3 text-sm text-destructive hover:bg-destructive/10 transition-colors duration-150"
              role="menuitem"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" aria-hidden="true" />
              {t('nav.logout')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

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
            <motion.img
              src="/logo.png"
              alt="Tek Pou Nou Logo"
              className="h-10 w-auto"
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              transition={{ duration: 0.4 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1" role="menubar">
            {renderNavItems()}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <LanguageSwitcher variant="dropdown" showFlags />
            <ThemeSwitcher variant="toggle" />
            {user && <NotificationBell />}
            {user ? renderProfileMenu() : renderAuthButtons()}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <LanguageSwitcher variant="buttons" showFlags={false} className="hidden sm:flex" />
            <ThemeSwitcher variant="toggle" className="hidden sm:block" />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-200"
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
              <div className="space-y-2 px-2">{renderNavItems(true)}</div>

              <div className="sm:hidden border-t border-border pt-4 mt-4 px-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{t('profile.language')}</span>
                  <LanguageSwitcher variant="buttons" showFlags className="scale-90" />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-medium text-foreground">{t('profile.theme')}</span>
                  <ThemeSwitcher variant="toggle" />
                </div>
              </div>

              <div className="border-t border-border pt-4 mt-4 px-2">
                {user ? (
                  <div className="space-y-2">
                    {dashboardLink && (
                      <Link
                        to={dashboardLink.href}
                        className="flex items-center px-4 py-3 text-base font-medium text-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                        role="menuitem"
                      >
                        <dashboardLink.icon className="w-5 h-5 mr-3" aria-hidden="true" />
                        {dashboardLink.label}
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 text-base font-medium text-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200"
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
                      className="flex items-center w-full px-4 py-3 text-base font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors duration-200"
                      role="menuitem"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" aria-hidden="true" />
                      {t('nav.logout')}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full">
                      <BrandButton variant="ghost" className="w-full justify-center">
                        {t('nav.login')}
                      </BrandButton>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block w-full">
                      <BrandButton variant="primary" className="w-full justify-center">
                        {t('nav.signup')}
                      </BrandButton>
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