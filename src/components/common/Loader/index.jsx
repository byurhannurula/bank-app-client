import React from 'react'

export const Loader = ({ size = 50, ...props }) => (
  <div className="spinner-wrapper" {...props}>
    <svg viewBox="0 0 50 50" width={size} height={size}>
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
      />
    </svg>
  </div>
)
