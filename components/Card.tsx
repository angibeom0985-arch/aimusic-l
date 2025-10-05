import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
};

export default Card;