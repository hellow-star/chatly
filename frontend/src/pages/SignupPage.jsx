import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";
import FormField from "../components/FormField";
import Button from "../components/Button";
import Card from "../components/Card";
import { useAuthStore } from "../stores/useAuthStore";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, isSigningUp } = useAuthStore();

  const onSubmit = (data) => {
    signUp(data.fullName, data.email, data.password);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="max-w-md w-full">
        <Card>
          <motion.h2
            className="text-2xl font-bold text-center text-gray-800 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Create an Account
          </motion.h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormField
              label="Full Name"
              name="fullName"
              register={register}
              error={errors.fullName}
              placeholder="John Doe"
              aria-label="Full Name"
              aria-required="true"
              icon={<User size={20} />}
            />
            <FormField
              label="Email Address"
              type="email"
              name="email"
              register={register}
              error={errors.email}
              placeholder="you@example.com"
              aria-label="Email Address"
              aria-required="true"
              icon={<Mail size={20} />}
            />
            <FormField
              label="Password"
              type="password"
              name="password"
              register={register}
              error={errors.password}
              placeholder="••••••••"
              aria-label="Password"
              aria-required="true"
              icon={<Lock size={20} />}
            />
            <Button type="submit" className="w-full mt-4">
              Sign Up
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
