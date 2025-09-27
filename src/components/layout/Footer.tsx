// src/components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  HeartIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon
} from '@heroicons/react/24/solid';
import {
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  BriefcaseIcon,
  ChartBarIcon,
  NewspaperIcon,
  FolderOpenIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { BRAND_IDENTITY } from '../../styles/design-system';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, external = false }) => (
  <motion.div whileHover={{ x: 2 }}>
    {external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-accent transition-colors duration-200"
      >
        {children}
      </a>
    ) : (
      <Link
        to={href}
        className="text-muted-foreground hover:text-accent transition-colors duration-200"
      >
        {children}
      </Link>
    )}
  </motion.div>
);

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: t('nav.courses'), href: '/courses', icon: BookOpenIcon },
    { name: t('nav.blog'), href: '/blog', icon: ChatBubbleLeftRightIcon },
    { name: 'Resous', href: '/resources', icon: FolderOpenIcon },
    { name: 'Nouvèl', href: '/news', icon: NewspaperIcon },
    { name: 'Patnè', href: '/partners', icon: UserGroupIcon },
    { name: t('nav.services'), href: '/services', icon: BriefcaseIcon },
    { name: t('nav.analytics'), href: '/analytics', icon: ChartBarIcon }
  ];

  const legalLinks = [
    { name: t('footer.privacyPolicy'), href: '/privacy' },
    { name: t('footer.termsOfService'), href: '/terms' },
    { name: t('footer.contact'), href: '/contact' }
  ];

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com/tekpounou', icon: '📘' },
    { name: 'Twitter', href: 'https://twitter.com/tekpounou', icon: '🐦' },
    { name: 'Instagram', href: 'https://instagram.com/tekpounou', icon: '📷' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/tekpounou', icon: '💼' }
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center mb-4"
              >
                <img
                  src="/logo.png"
                  alt={BRAND_IDENTITY.name}
                  className="h-12 w-auto object-contain"
                  loading="lazy"
                />
              </motion.div>
              
              <p className="text-lg font-medium text-foreground mb-2">
                {BRAND_IDENTITY.taglines.primary}
              </p>
              <p className="text-muted-foreground mb-4">
                {BRAND_IDENTITY.taglines.mission}
              </p>
              <div className="inline-flex items-center px-4 py-2 rounded-lg text-primary-foreground font-medium text-sm shadow-md tpn-gradient">
                <HeartIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                {t('footer.madeWithLove')}
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-muted-foreground">
                <EnvelopeIcon className="w-5 h-5 mr-3 text-accent" aria-hidden="true" />
                <a href="mailto:info@tekpounou.org" className="hover:text-accent transition-colors duration-200">
                  info@tekpounou.org
                </a>
              </div>
              <div className="flex items-center text-muted-foreground">
                <PhoneIcon className="w-5 h-5 mr-3 text-accent" aria-hidden="true" />
                <span>+509 1234-5678</span>
              </div>
              <div className="flex items-start text-muted-foreground">
                <MapPinIcon className="w-5 h-5 mr-3 text-accent flex-shrink-0 mt-1" aria-hidden="true" />
                <span>
                  Port-au-Prince, Haiti<br />
                  & Global Diaspora
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold text-lg mb-4">
              Platform
            </h3>
            <nav className="space-y-3" aria-label="Footer navigation">
              {navigationLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <FooterLink key={link.name} href={link.href}>
                    <div className="flex items-center">
                      <Icon className="w-4 h-4 mr-2" aria-hidden="true" />
                      {link.name}
                    </div>
                  </FooterLink>
                );
              })}
            </nav>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-foreground font-semibold text-lg mb-4">
              {t('footer.aboutUs')}
            </h3>
            <nav className="space-y-3" aria-label="Legal navigation">
              {legalLinks.map((link) => (
                <FooterLink key={link.name} href={link.href}>
                  {link.name}
                </FooterLink>
              ))}
            </nav>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-foreground font-medium mb-2">
                {t('footer.newsletter')}
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                {t('footer.subscribeNewsletter')}
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="
                    flex-1 px-3 py-2 text-sm border border-border
                    rounded-l-md bg-background text-foreground
                    focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                  "
                  aria-label={t('footer.subscribeNewsletter')}
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-primary-foreground rounded-r-md tpn-gradient hover:shadow-lg transition-all duration-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-border/50 pt-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div>
              <h3 className="text-foreground font-semibold text-lg mb-3">
                {t('footer.followUs')}
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                      flex items-center justify-center w-10 h-10 bg-card
                      border border-border rounded-lg
                      hover:bg-accent/10 hover:border-accent
                      transition-all duration-200 shadow-sm
                    "
                    aria-label={`Follow us on ${social.name}`}
                    title={social.name}
                  >
                    <span className="text-lg" aria-hidden="true">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Haiti Flag & Pride */}
            <div className="text-center sm:text-right">
              <div className="flex items-center justify-center sm:justify-end mb-2">
                <span className="text-2xl mr-2" aria-hidden="true">🇭🇹</span>
                <span className="text-muted-foreground font-medium">
                  {t('footer.forHaiti')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Building bridges between Haiti and the world
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Tek Pou Nou. {t('footer.allRightsReserved')}.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <HeartIcon className="w-4 h-4 text-destructive animate-pulse" aria-hidden="true" />
              <span>by Tek Pou Nou</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;