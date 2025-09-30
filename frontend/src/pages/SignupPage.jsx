import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { User, Mail, Lock, LoaderCircle, Eye, EyeOff } from "lucide-react";
import FormField from "../components/FormField";
import Button from "../components/Button";
import Card from "../components/Card";
import { useAuthStore } from "../stores/useAuthStore";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    document.title = "Chatly - Sign Up";
    return () => {
      document.title = "Vite + React"; // Reset to default on unmount
    };
  }, []);

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };

    let score = 0;
    let feedback = [];

    // Length check
    if (password.length >= 8) score += 1;
    else feedback.push('At least 8 characters');

    // Lowercase check
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Lowercase letter');

    // Uppercase check
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Uppercase letter');

    // Number check
    if (/\d/.test(password)) score += 1;
    else feedback.push('Number');

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push('Special character');

    let label = '';
    let color = '';

    if (score === 0) {
      label = '';
      color = '';
    } else if (score <= 2) {
      label = 'Weak';
      color = 'text-red-400';
    } else if (score <= 3) {
      label = 'Fair';
      color = 'text-yellow-400';
    } else if (score <= 4) {
      label = 'Good';
      color = 'text-green-400';
    } else {
      label = 'Strong';
      color = 'text-green-500';
    }

    return { score, label, color, feedback };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  // Watch password field for real-time updates
  const watchedPassword = watch('password');

  // Update local password state when form password changes
  React.useEffect(() => {
    setPassword(watchedPassword || '');
  }, [watchedPassword]);

  const { signUp, isSigningUp } = useAuthStore();

  const onSubmit = (data) => {
    if (!termsAccepted) {
      // This shouldn't happen due to button being disabled, but just in case
      return;
    }
    signUp(data.fullName, data.email, data.password);
  };

  const formVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-600 bg-gradient-to-r flex flex-col items-center justify-center p-5">
      <div className="max-w-md w-full">
        <Card>
          <motion.h2
            className="text-3xl font-bold text-center text-white mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to Chatly
          </motion.h2>
          <p className="text-center text-gray-300 mb-8">
            Create your account to start chatting
          </p>
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            variants={formVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fieldVariants}>
              <FormField
                label="Full Name"
                name="fullName"
                register={register}
                validation={{
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Full name must be at least 2 characters'
                  },
                  maxLength: {
                    value: 50,
                    message: 'Full name must be less than 50 characters'
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: 'Full name can only contain letters and spaces'
                  }
                }}
                error={errors.fullName}
                placeholder="John Doe"
                aria-label="Full Name"
                aria-required="true"
                autoComplete="name"
                icon={<User size={20} />}
              />
            </motion.div>
            <motion.div variants={fieldVariants}>
              <FormField
                label="Email Address"
                type="email"
                name="email"
                register={register}
                validation={{
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  },
                  maxLength: {
                    value: 100,
                    message: 'Email must be less than 100 characters'
                  }
                }}
                error={errors.email}
                placeholder="you@example.com"
                aria-label="Email Address"
                aria-required="true"
                autoComplete="email"
                icon={<Mail size={20} />}
              />
            </motion.div>
            <motion.div variants={fieldVariants}>
              <FormField
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                register={register}
                validation={{
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  },
                  maxLength: {
                    value: 128,
                    message: 'Password must be less than 128 characters'
                  },
                  validate: {
                    hasLowercase: (value) => /[a-z]/.test(value) || 'Password must contain a lowercase letter',
                    hasUppercase: (value) => /[A-Z]/.test(value) || 'Password must contain an uppercase letter',
                    hasNumber: (value) => /\d/.test(value) || 'Password must contain a number',
                    hasSpecial: (value) => /[^A-Za-z0-9]/.test(value) || 'Password must contain a special character'
                  }
                }}
                error={errors.password}
                placeholder="••••••••"
                aria-label="Password"
                aria-required="true"
                autoComplete="new-password"
                icon={<Lock size={20} />}
                toggleIcon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                onToggle={() => setShowPassword(!showPassword)}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {password && (
                <motion.div
                  className="mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${getPasswordStrength(password).color}`}>
                      Password strength: {getPasswordStrength(password).label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        getPasswordStrength(password).score <= 2
                          ? 'bg-red-500'
                          : getPasswordStrength(password).score <= 3
                          ? 'bg-yellow-500'
                          : getPasswordStrength(password).score <= 4
                          ? 'bg-green-400'
                          : 'bg-green-500'
                      }`}
                      style={{
                        width: `${(getPasswordStrength(password).score / 5) * 100}%`,
                      }}
                    />
                  </div>
                  {getPasswordStrength(password).score < 5 && (
                    <div className="mt-2 text-sm text-gray-300">
                      Requirements: {getPasswordStrength(password).feedback.join(', ')}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
            <motion.div
              className="mb-4"
              variants={fieldVariants}
            >
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  aria-label="Accept terms and privacy policy"
                />
                <span className="text-sm text-gray-200">
                  I agree to the{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
              <motion.p
                className={`mt-1 text-sm text-red-400 transition-all duration-200 ${
                  termsAccepted ? 'opacity-0 invisible h-0' : 'opacity-1 visible h-auto'
                }`}
                initial={false}
                animate={{
                  opacity: termsAccepted ? 0 : 1,
                  height: termsAccepted ? 0 : 'auto',
                  visibility: termsAccepted ? 'hidden' : 'visible'
                }}
                transition={{ duration: 0.2 }}
              >
                Please accept the Terms of Service and Privacy Policy to continue
              </motion.p>
            </motion.div>
            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isSigningUp || !termsAccepted}
            >
              {isSigningUp ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </motion.form>
          <p className="text-center text-gray-300 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-300 hover:text-blue-200 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
