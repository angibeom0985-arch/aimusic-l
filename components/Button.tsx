import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "purple";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-6 py-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl hover:scale-105 transform";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-pink-500 via-pink-600 to-orange-400 text-white hover:from-pink-600 hover:via-pink-700 hover:to-orange-500 focus:ring-pink-500 shadow-pink-500/50 hover:shadow-pink-500/60",
    secondary:
      "bg-gradient-to-r from-zinc-800 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600 text-zinc-100 focus:ring-zinc-600 shadow-zinc-800/50",
    ghost:
      "bg-transparent hover:bg-gradient-to-r hover:from-zinc-800 hover:to-zinc-700 text-zinc-300 focus:ring-zinc-700 border border-zinc-700 shadow-zinc-900/50",
    success:
      "bg-gradient-to-r from-green-500 via-emerald-500 to-emerald-600 text-white hover:from-green-600 hover:via-emerald-600 hover:to-emerald-700 focus:ring-green-500 shadow-green-500/50 hover:shadow-green-500/60",
    info: "bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 text-white hover:from-blue-600 hover:via-blue-700 hover:to-cyan-600 focus:ring-blue-500 shadow-blue-500/50 hover:shadow-blue-500/60",
    warning:
      "bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600 text-white hover:from-yellow-600 hover:via-orange-600 hover:to-orange-700 focus:ring-yellow-500 shadow-orange-500/50 hover:shadow-orange-500/60",
    danger:
      "bg-gradient-to-r from-red-500 via-pink-500 to-pink-600 text-white hover:from-red-600 hover:via-pink-600 hover:to-pink-700 focus:ring-red-500 shadow-red-500/50 hover:shadow-red-500/60",
    purple:
      "bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-500 text-white hover:from-purple-600 hover:via-purple-700 hover:to-indigo-600 focus:ring-purple-500 shadow-purple-500/50 hover:shadow-purple-500/60",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
