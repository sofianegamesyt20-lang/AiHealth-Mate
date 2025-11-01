'use client'

import { motion } from 'framer-motion'

export default function Card({ 
  children, 
  header, 
  subheader, 
  className = '',
  ...props 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={`bg-white rounded-2xl shadow-md p-8 gap-4 ${className}`}
      {...props}
    >
      {header && (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-deep-space-blue mb-2">
            {header}
          </h2>
          {subheader && (
            <p className="text-graphite-gray text-base">
              {subheader}
            </p>
          )}
        </div>
      )}
      {children}
    </motion.div>
  )
}

