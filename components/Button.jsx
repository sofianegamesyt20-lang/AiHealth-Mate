'use client'

import { motion } from 'framer-motion'

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button',
  disabled = false,
  className = '',
  ...props 
}) {
  const baseClasses = 'px-6 py-3 rounded-xl font-medium transition-all duration-200 focus-visible-ring disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-electric-blue text-white hover:bg-[#0899E6]',
    secondary: 'bg-graphite-gray text-white hover:bg-[#383B44]',
    outline: 'border-2 border-electric-blue text-electric-blue bg-transparent hover:bg-electric-blue hover:text-white',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

