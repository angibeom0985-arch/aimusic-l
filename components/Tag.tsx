
import React from 'react';

interface TagProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const Tag: React.FC<TagProps> = ({ label, isSelected, onClick }) => {
  const baseClasses = "px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 shadow-md";
  const selectedClasses = "bg-gradient-to-r from-pink-500 to-orange-500 text-white";
  const unselectedClasses = "bg-zinc-800 text-zinc-200 hover:bg-zinc-700";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
    >
      {label}
    </button>
  );
};
