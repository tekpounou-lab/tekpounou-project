// src/components/layout/navbar/NavbarBrand.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const NavbarBrand: React.FC = () => {
  const { t } = useTranslation();

  return (
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
  );
};

export default NavbarBrand;
