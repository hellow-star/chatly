import React from 'react';
import { motion } from 'framer-motion';
import BorderAnimated from './borderAnimated';

const Card = ({ children, className = '', ...props }) => {
  return (
    <BorderAnimated className={className} {...props}>
      <motion.div
        className="w-full max-w-md md:max-w-xl bg-transparent p-6 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </BorderAnimated>
  );
};

export default Card;