import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, type = 'button', onClick, disabled = false, className = '', ...props }) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center px-6 py-2 text-center overflow-hidden font-medium text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-md shadow-lg group ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.05, boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.5)' }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      {...props}
    >
      <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-white group-hover:h-full"></span>
      <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
        <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </span>
      <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </span>
      <span className="relative w-full text-center transition-colors duration-200 ease-in-out group-hover:text-transparent">
        {children}
      </span>
    </motion.button>
  );
};

export default Button;