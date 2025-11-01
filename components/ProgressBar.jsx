'use client'

import { motion } from 'framer-motion'

export default function ProgressBar({ progress, className = '', ...props }) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100)
  
  return (
    <div 
      className={`w-full h-3 bg-gray-200 rounded-full overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress: ${clampedProgress}%`}
      {...props}
    >
      <motion.div
        className="h-full bg-electric-blue rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${clampedProgress}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </div>
  )
}

