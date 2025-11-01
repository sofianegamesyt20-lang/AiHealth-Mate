'use client'

import { motion } from 'framer-motion'

export default function YesNoToggle({ 
  value, 
  onChange, 
  question, 
  disabled = false,
  ...props 
}) {
  return (
    <div className="flex flex-col gap-3" {...props}>
      {question && (
        <p className="text-base font-medium text-deep-space-blue">
          {question}
        </p>
      )}
      <div className="flex gap-4">
        <motion.button
          type="button"
          onClick={() => !disabled && onChange(true)}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
              e.preventDefault()
              onChange(true)
            }
          }}
          disabled={disabled}
          aria-pressed={value === true}
          aria-label={`Answer "${question || 'this question'}" as Yes`}
          className={`
            flex-1 py-4 px-6 rounded-xl font-medium transition-all duration-200
            focus-visible-ring disabled:opacity-50 disabled:cursor-not-allowed
            ${value === true 
              ? 'bg-electric-blue text-white shadow-lg' 
              : 'bg-gray-100 text-graphite-gray hover:bg-gray-200'
            }
          `}
          whileHover={!disabled && value !== true ? { scale: 1.02 } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          Yes
        </motion.button>
        <motion.button
          type="button"
          onClick={() => !disabled && onChange(false)}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
              e.preventDefault()
              onChange(false)
            }
          }}
          disabled={disabled}
          aria-pressed={value === false}
          aria-label={`Answer "${question || 'this question'}" as No`}
          className={`
            flex-1 py-4 px-6 rounded-xl font-medium transition-all duration-200
            focus-visible-ring disabled:opacity-50 disabled:cursor-not-allowed
            ${value === false 
              ? 'bg-electric-blue text-white shadow-lg' 
              : 'bg-gray-100 text-graphite-gray hover:bg-gray-200'
            }
          `}
          whileHover={!disabled && value !== false ? { scale: 1.02 } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          No
        </motion.button>
      </div>
    </div>
  )
}

