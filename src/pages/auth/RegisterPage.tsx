// src/pages/auth/RegisterPage.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';
import { RegisterForm, LanguageCode } from '@/types';
import { isValidEmail, getLanguageDisplayName } from '@/utils';
import { ROUTES } from '@/routes';
import { motion } from 'framer-motion';

export interface RegisterPageProps {
  onSuccess?: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signUp, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      preferredLanguage: 'ht-HT',
    },
  });

  const password = watch('password');

  const languageOptions = [
    { value: 'ht-HT', label: getLanguageDisplayName('ht-HT') },
    { value: 'en-US', label: getLanguageDisplayName('en-US') },
    { value: 'fr-FR', label: getLanguageDisplayName('fr-FR') },
  ];

  const onSubmit = async (data: RegisterForm) => {
    setError('');
    setSuccess('');

    const result = await signUp(
      data.email,
      data.password,
      data.displayName,
      data.preferredLanguage
    );

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess('Kont ou kreye avèk siksè! Ap redireksyone w nan paj koneksyon an...');
      setTimeout(() => {
        onSuccess?.();
        navigate(ROUTES.login);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary mb-4 shadow-lg"
          >
            <img
              src="/logo.png"
              alt="Tek Pou Nou"
              className="h-10 w-10 object-contain"
            />
          </motion.div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Tek Pou Nou
          </h1>
          <p className="text-muted-foreground">
            Technology for Us / Teknoloji pou Nou
          </p>
        </div>

        {/* Register Card */}
        <Card className="tpn-card p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent mb-3">
              <UserPlus className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Kreye yon kont
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Create your account / Créer votre compte
            </p>
          </div>

          {/* Error & Success Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-5 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
            >
              <p className="text-sm text-destructive-foreground">
                {error}
              </p>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-5 p-3 rounded-lg bg-success/10 border border-success/20"
            >
              <p className="text-sm text-success-foreground">
                {success}
              </p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Non afiche / Display Name (Optional)"
              type="text"
              autoComplete="name"
              error={errors.displayName?.message}
              {...register('displayName')}
              className="bg-background border-border"
            />

            <Input
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email address is required',
                validate: (value) => isValidEmail(value) || 'Please enter a valid email address',
              })}
              className="bg-background border-border"
            />

            <Select
              label="Lang prefere / Preferred Language"
              options={languageOptions}
              error={errors.preferredLanguage?.message}
              {...register('preferredLanguage', {
                required: 'Please select a preferred language',
              })}
              className="bg-background border-border"
            />

            <div className="relative">
              <Input
                label="Mo de pase / Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
                  },
                })}
                className="bg-background border-border pr-12"
              />
              <button
                type="button"
                className="absolute right-3 top-10 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Konfime mo de pase / Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                })}
                className="bg-background border-border pr-12"
              />
              <button
                type="button"
                className="absolute right-3 top-10 text-muted-foreground hover:text-foreground"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full tpn-gradient text-primary-foreground hover:shadow-lg"
              isLoading={isLoading}
              disabled={isLoading}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Kreye kont / Create Account
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 pt-6 border-t border-border/30">
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Gen kont deja? / Already have an account?{' '}
                <Link
                  to={ROUTES.login}
                  className="font-medium text-accent hover:text-accent/80 transition-colors"
                >
                  Konekte / Sign in
                </Link>
              </p>
              <Link
                to={ROUTES.home}
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>← Retounen ak paj dakèy</span>
              </Link>
            </div>
          </div>
        </Card>

        {/* Haiti Pride */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <span className="text-xl">🇭🇹</span>
            <span className="text-sm">Teknoloji pou kominote Ayisyen an</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;