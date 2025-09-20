import React from 'react';
import { motion } from 'framer-motion';

const FormField = ({ label, type = 'text', name, register, error, icon, ...props }) => {
  return (
    <div className="mb-4 group">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <motion.div
          className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 opacity-0 blur group-focus-within:opacity-75 transition-opacity duration-300"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative flex items-center text-gray-400 focus-within:text-blue-500">
          {icon && <div className="absolute left-3 z-10">{icon}</div>}
          <motion.input
            type={type}
            id={name}
            name={name}
            className={`relative w-full py-2 border bg-white ${icon ? 'pl-10 pr-3' : 'px-3'} ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-transparent transition-colors duration-200`}
            whileFocus={{ scale: 1.02 }}
            whileHover={{ scale: 1.01 }}
            {...register(name)}
            {...props}
          />
        </div>
      </div>
      {error && (
        <motion.p
          className="mt-1 text-sm text-red-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error.message}
        </motion.p>
      )}
    </div>
  );
};

export default FormField;