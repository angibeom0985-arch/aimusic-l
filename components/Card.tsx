import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-gradient-to-br from-slate-900 to-blue-950 border border-orange-500/20 rounded-xl shadow-xl shadow-blue-900/50 p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
};

export default Card;