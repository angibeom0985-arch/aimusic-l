import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-700/50 rounded-xl shadow-2xl shadow-black/50 backdrop-blur-sm p-6 md:p-8 hover:shadow-pink-500/10 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
