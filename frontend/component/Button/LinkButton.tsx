'use client'
import React, { ReactNode } from 'react'

const LinkButton = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className="px-4 py-2 cursor-pointer rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      {children}
    </div>
  )
}

export default LinkButton
