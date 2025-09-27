// src/components/layout/navbar/NavbarMobile.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  CogIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  FolderOpenIcon,
  NewspaperIcon,
  UsersIcon,
  UserPlusIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { ROUTES } from '@/routes';
import type { User, Profile, UserRole } from '@/types';
import type { TFunction } from 'i18next';

interface NavbarMobileProps {
  location: any;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  handleSignOut: () => void;
  user: User | null;
  profile: Profile | null;
  t: TFunction;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({
  location,
  isMenuOpen,
  setIsMenuOpen,
  handleSignOut,
  user,
  profile,
  t
}) => {
  // Mobile navigation items
  const navigationItems = [
    { name: t('nav.courses'), href: ROUTES.courses, icon: BookOpenIcon },
    { name: t('nav.resources'), href: ROUTES.resources, icon: FolderOpenIcon },
    { name: t('nav.news'), href: ROUTES.news, icon: NewspaperIcon },
    { name: t('nav.blog'), href: ROUTES.blog, icon: ChatBubbleLeftRightIcon },
    { name: t('nav.groups'), href: ROUTES.groups, icon: UsersIcon },
    { name: t('nav.events'), href: ROUTES.events, icon: CalendarDaysIcon },
    { name: t('nav.networking'), href: ROUTES.networking, icon: UserPlusIcon },
    { name: t('nav.partners'), href: ROUTES.partners, icon: UserGroupIcon },
    { name: t('nav.services'), href: ROUTES.services, icon: BriefcaseIcon },
    { name: t('nav.pricing'), href: ROUTES.pricing, icon: CogIcon },
    { name: t('nav.analytics'), href: ROUTES.analytics, icon: ChartBarIcon },
  ];

  // Determine dashboard link based on user role
  const getDashboardLink = (): string | null => {
    if (!user || !profile) return null;

    const hasRole = (role: UserRole) =>
      Array.isArray(profile.roles) && profile.roles.includes(role);

    if (hasRole('super_admin')) return ROUTES.admin.root;
    if (hasRole('admin')) return '/admin-panel';
    if (hasRole('teacher')) return ROUTES.dashboards.teacher;
    if (hasRole('sme_client')) return '/client';
    return ROUTES.dashboards.student;
  };

  const dashboardLink = getDashboardLink();

  return (
    <>
      {/* Mobile Menu Toggle */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 text-foreground hover:text-accent hover:bg-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
        aria-expanded={isMenuOpen}
        aria-label={t('nav.toggleMenu')}
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <div className="flex justify-end p-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full hover:bg-muted/30"
                aria-label={t('common.close')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-foreground">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            <div className="px-4 pb-20 overflow-y-auto max-h-[calc(100vh-80px)]">
              {/* Home Link */}
              <Link
                to="/"
                className={`flex items-center px-4 py-3 text-lg font-medium rounded-xl transition-all duration-200 mb-2
                  ${location.pathname === '/' ? 'text-primary-foreground tpn-gradient' : 'text-foreground hover:text-accent hover:bg-muted/30'}
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                <HomeIcon className="w-5 h-5 mr-3" />
                {t('common.home')}
              </Link>

              {/* Navigation Items */}
              <div className="space-y-2 mb-8">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-4 py-3 text-lg font-medium rounded-xl transition-all duration-200
                        ${isActive ? 'text-primary-foreground tpn-gradient' : 'text-foreground hover:text-accent hover:bg-muted/30'}
                      `}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* User Section */}
              {user ? (
                <div className="space-y-2">
                  {dashboardLink && (
                    <Link
                      to={dashboardLink}
                      className="flex items-center px-4 py-3 text-lg font-medium text-foreground hover:bg-muted/30 rounded-xl transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <CogIcon className="w-5 h-5 mr-3" />
                      {t('nav.dashboard')}
                    </Link>
                  )}
                  <Link
                    to={ROUTES.profile}
                    className="flex items-center px-4 py-3 text-lg font-medium text-foreground hover:bg-muted/30 rounded-xl transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserIcon className="w-5 h-5 mr-3" />
                    {t('nav.profile')}
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-lg font-medium text-destructive hover:bg-destructive/10 rounded-xl transition-colors duration-200"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-4">
                  <Link to={ROUTES.login} onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-center text-foreground hover:bg-muted/30">
                      {t('nav.login')}
                    </Button>
                  </Link>
                  <Link to={ROUTES.register} onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full justify-center tpn-gradient text-primary-foreground">
                      {t('nav.signup')}
                    </Button>
                  </Link>
                </div>
              )}

              {/* Language & Theme */}
              <div className="pt-8 border-t border-border/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-foreground">{t('profile.language')}</span>
                  <LanguageSwitcher variant="buttons" showFlags />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{t('profile.theme')}</span>
                  <ThemeSwitcher variant="toggle" />
                </div>
              </div>

              {/* Haiti Pride */}
              <div className="mt-6 pt-6 border-t border-border/30 text-center text-muted-foreground">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl">🇭🇹</span>
                  <span className="text-sm">{t('brand.tagline')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarMobile;
