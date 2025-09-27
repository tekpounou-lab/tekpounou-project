// src/components/layout/navbar/NavbarMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  BriefcaseIcon,
  ChartBarIcon,
  FolderOpenIcon,
  NewspaperIcon,
  UsersIcon,
  CalendarDaysIcon,
  UserPlusIcon,
  UserGroupIcon,
  ChevronDownIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

// -----------------------------
// Types for navigation
// -----------------------------
export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface NavGroup {
  id: string;
  labelKey: string; // i18n translation key
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  items: NavItem[];
}

// -----------------------------
// Exported navigationGroups for mobile use
// -----------------------------
export const navigationGroups: NavGroup[] = [
  {
    id: 'learning',
    labelKey: 'nav.learning',
    icon: BookOpenIcon,
    items: [
      { name: 'nav.courses', href: '/courses', icon: BookOpenIcon },
      { name: 'nav.resources', href: '/resources', icon: FolderOpenIcon },
      { name: 'nav.news', href: '/news', icon: NewspaperIcon },
      { name: 'nav.blog', href: '/blog', icon: ChatBubbleLeftRightIcon },
    ],
  },
  {
    id: 'community',
    labelKey: 'nav.community',
    icon: UsersIcon,
    items: [
      { name: 'nav.groups', href: '/groups', icon: UsersIcon },
      { name: 'nav.events', href: '/events', icon: CalendarDaysIcon },
      { name: 'nav.networking', href: '/networking', icon: UserPlusIcon },
      { name: 'nav.partners', href: '/partners', icon: UserGroupIcon },
    ],
  },
  {
    id: 'business',
    labelKey: 'nav.business',
    icon: BriefcaseIcon,
    items: [
      { name: 'nav.services', href: '/services', icon: BriefcaseIcon },
      { name: 'nav.pricing', href: '/pricing', icon: ChevronDownIcon },
    ],
  },
  {
    id: 'analytics',
    labelKey: 'nav.analytics',
    icon: ChartBarIcon,
    items: [
      { name: 'nav.analytics', href: '/analytics', icon: ChartBarIcon },
    ],
  },
];

// -----------------------------
// NavbarMenu component (desktop dropdown)
// -----------------------------
interface NavbarMenuProps {
  location: any;
  openDropdown: string | null;
  setOpenDropdown: (id: string | null) => void;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({ location, openDropdown, setOpenDropdown }) => {
  const { t } = useTranslation();

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div className="flex justify-center space-x-6">
      {/* Home Link */}
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

      {/* Navigation Groups */}
      {navigationGroups.map((group: NavGroup) => {
        const isActive = group.items.some(item => location.pathname.startsWith(item.href));
        const Icon = group.icon;

        return (
          <div
            key={group.id}
            className="relative"
            onMouseEnter={() => toggleDropdown(group.id)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              onClick={() => toggleDropdown(group.id)}
              className={`
                flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                ${isActive
                  ? 'text-primary-foreground tpn-gradient'
                  : 'text-foreground hover:text-accent hover:bg-muted/30'
                }
              `}
              aria-expanded={openDropdown === group.id}
              aria-haspopup="true"
              role="menuitem"
            >
              <Icon className="w-4 h-4 mr-2" aria-hidden="true" />
              {t(group.labelKey)}
              <ChevronDownIcon className="w-4 h-4 ml-2" aria-hidden="true" />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {openDropdown === group.id && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg py-2 z-50"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {group.items.map((item: NavItem) => {
                    const ItemIcon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`
                          flex items-center px-4 py-3 text-sm text-foreground
                          hover:bg-muted/50 hover:text-accent
                          transition-colors duration-150
                        `}
                        onClick={() => setOpenDropdown(null)}
                        role="menuitem"
                      >
                        <ItemIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                        {t(item.name)}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default NavbarMenu;
