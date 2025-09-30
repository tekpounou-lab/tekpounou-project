// src/pages/auth/LoginPage.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Eye, EyeOff, LogIn, Sparkles, Github, Google } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useAuthStore } from "@/stores/authStore";
import { LoginForm } from "@/types";
import { isValidEmail } from "@/utils";
import { ROUTES } from "@/routes";
import { motion } from "framer-motion";

export interface LoginPageProps {
  onSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { signIn, signInWithProvider, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setError("");
    const result = await signIn(data.email, data.password);

    if (result.error) {
      setError(result.error);
    } else {
      onSuccess?.();
      navigate(ROUTES.dashboard);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    try {
      await signInWithProvider(provider);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "OAuth login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
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
        {/* Branding */}
        <div className="text-center mb-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary mb-4 shadow-lg">
            <img src="/logo.png" alt="Tek Pou Nou" className="h-10 w-10 object-contain" />
          </motion.div>
          <h1 className="text-3xl font-bold text-primary mb-2">Tek Pou Nou</h1>
          <p className="text-muted-foreground">Technology for Us / Teknoloji pou Nou</p>
        </div>

        <Card className="tpn-card p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent mb-3">
              <LogIn className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Konekte nan kont ou an</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
          </div>

          {/* Error */}
          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-5 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive-foreground">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email", {
                required: "Email address is required",
                validate: (value) => isValidEmail(value) || "Please enter a valid email address",
              })}
              className="bg-background border-border"
            />

            <div className="relative">
              <Input
                label="Password / Mo de pase"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                error={errors.password?.message}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
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

            <Button type="submit" className="w-full tpn-gradient text-primary-foreground hover:shadow-lg" isLoading={isLoading} disabled={isLoading}>
              <Sparkles className="w-4 h-4 mr-2" /> Konekte / Sign In
            </Button>
          </form>

          {/* OAuth Login */}
          <div className="mt-4 space-y-2">
            <Button type="button" onClick={() => handleOAuthLogin("google")} className="w-full flex items-center justify-center space-x-2 border border-border bg-white hover:bg-gray-50">
              <Google className="w-4 h-4" />
              <span>Sign in with Google</span>
            </Button>
            <Button type="button" onClick={() => handleOAuthLogin("github")} className="w-full flex items-center justify-center space-x-2 border border-border bg-white hover:bg-gray-50">
              <Github className="w-4 h-4" />
              <span>Sign in with GitHub</span>
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-border/30 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Pa gen kont? /{" "}
              <Link to={ROUTES.register} className="font-medium text-accent hover:text-accent/80 transition-colors">
                Kreye yon kont / Create account
              </Link>
            </p>
            <Link to={ROUTES.home} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Retounen ak paj dakèy
            </Link>
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

export default LoginPage;
