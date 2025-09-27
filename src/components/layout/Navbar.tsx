// src/components/layout/Navbar.tsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from 'react-i18next';
import NavbarBrand from '@/components/layout/navbar/NavbarBrand';
import NavbarMenu from '@/components/layout/navbar/NavbarMenu';
import NavbarActions from '@/components/layout/navbar/NavbarActions';
import NavbarMobile from '@/components/layout/navbar/NavbarMobile';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, profile, signOut } = useAuthStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsProfileMenuOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className="bg-background/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-border"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <NavbarBrand />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center items-center" role="menubar">
            <NavbarMenu
              location={location}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
          </div>

          {/* Desktop Right-side Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <NavbarActions
              user={user}
              profile={profile}
              t={t}
              isProfileMenuOpen={isProfileMenuOpen}
              setIsProfileMenuOpen={setIsProfileMenuOpen}
              handleSignOut={handleSignOut}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <NavbarMobile
              location={location}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              handleSignOut={handleSignOut}
              user={user}
              profile={profile}
              t={t}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
