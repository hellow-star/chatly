import React from 'react';
import { motion } from 'framer-motion';

const FormField = ({ label, type = 'text', name, register, validation = {}, error, icon, toggleIcon, onToggle, ...props }) => {
  return (
    <div className="mb-4 group">
      <label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-2">
        {label}
      </label>
      <div className="relative">
                <div className="relative flex items-center text-gray-400 focus-within:text-blue-500">
          {icon && <div className="absolute left-3 z-10">{icon}</div>}
          <motion.input
            type={type}
            id={name}
            name={name}
            className={`relative w-full py-3 px-4 border bg-gray-800/50 text-gray-100 ${icon ? 'pl-10' : 'px-3'} ${toggleIcon ? 'pr-10' : 'pr-3'} ${error ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
            whileFocus={{ scale: 1.02 }}
            whileHover={{ scale: 1.01 }}
            {...register(name, validation)}
            {...props}
          />
          {toggleIcon && (
            <button
              type="button"
              onClick={onToggle}
              className="absolute right-3 z-10 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-100 transition-colors duration-200"
              aria-label={type === 'password' ? 'Show password' : 'Hide password'}
            >
              {toggleIcon}
            </button>
          )}
        </div>
      </div>
      {error && (
        <motion.p
          className="mt-1 text-sm text-red-400"
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