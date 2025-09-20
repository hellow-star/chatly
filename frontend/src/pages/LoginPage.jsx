import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import FormField from '../components/FormField';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAuthStore } from '../stores/useAuthStore';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Assuming a login function exists in useAuthStore
  // const { login, isLoggingIn } = useAuthStore();

  const onSubmit = (data) => {
    console.log('Login data:', data);
    // login(data.email, data.password);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card>
          <motion.h2
            className="text-2xl font-bold text-center text-gray-800 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Log In
          </motion.h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
              Log In
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;