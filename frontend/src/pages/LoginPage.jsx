import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Lock, LoaderCircle, Eye, EyeOff } from "lucide-react";
import FormField from "../components/FormField";
import Button from "../components/Button";
import Card from "../components/Card";
import { useAuthStore } from "../stores/useAuthStore";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Chatly - Log In";
    return () => {
      document.title = "Vite + React"; // Reset to default on unmount
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Watch password field for real-time updates
  const watchedPassword = watch("password");

  // Update local password state when form password changes
  React.useEffect(() => {
    setPassword(watchedPassword || "");
  }, [watchedPassword]);

  const { login, isLoggingIn } = useAuthStore(); // Using same loading state name for consistency
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const success = await login(data);
    if (success) {
      navigate("/");
    }
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
    <div>
      <div className="max-w-md w-full">
        <Card>
          <motion.h2
            className="text-3xl font-bold text-center text-white mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome Back to Chatly
          </motion.h2>
          <p className="text-center text-gray-300 mb-8">
            Sign in to your account to continue
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
                label="Email Address"
                type="email"
                name="email"
                register={register}
                validation={{
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                  maxLength: {
                    value: 100,
                    message: "Email must be less than 100 characters",
                  },
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
                  required: "Password is required",
                }}
                error={errors.password}
                placeholder="••••••••"
                aria-label="Password"
                aria-required="true"
                autoComplete="current-password"
                icon={<Lock size={20} />}
                toggleIcon={
                  showPassword ? <EyeOff size={20} /> : <Eye size={20} />
                }
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
                ></motion.div>
              )}
            </motion.div>
            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Log In"
              )}
            </Button>
          </motion.form>
          <p className="text-center text-gray-300 mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-300 hover:text-blue-200 transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
