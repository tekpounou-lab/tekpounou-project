// src/components/layout/navbar/NavbarActions.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { AccessibleTooltip } from '@/components/ui/AccessibilityComponents';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { UserIcon, ArrowRightOnRectangleIcon, CogIcon, UsersIcon } from '@heroicons/react/24/outline';
import type { UserRole } from '@/types';

interface NavbarActionsProps {
  user: any;
  profile: any;
  t: (key: string) => string;
  isProfileMenuOpen: boolean;
  setIsProfileMenuOpen: (open: boolean) => void;
  handleSignOut: () => void;
}

const NavbarActions: React.FC<NavbarActionsProps> = ({
  user,
  profile,
  t,
  isProfileMenuOpen,
  setIsProfileMenuOpen,
  handleSignOut,
}) => {

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
    <>
      {/* Language & Theme */}
      <LanguageSwitcher variant="dropdown" showFlags />
      <ThemeSwitcher variant="toggle" />

      {/* Notification Bell */}
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
                {/* Dashboard Link */}
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

                {/* Super Admin Community */}
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

                {/* Profile */}
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

                {/* Sign Out */}
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
              Konekte
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="tpn-gradient text-primary-foreground">
              Enkri
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default NavbarActions;
