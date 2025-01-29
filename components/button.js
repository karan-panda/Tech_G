// components/button.js

import React from "react";

// Button component with variant, size, and other props
export function Button({ children, variant = "primary", size = "medium", onClick, className }) {
  // Base styles for button
  const baseStyles = "px-4 py-2 font-semibold rounded-md focus:outline-none transition duration-300";
  
  // Size styles
  const sizeStyles = {
    small: "text-sm py-1 px-3",
    medium: "text-base py-2 px-4",
    large: "text-lg py-3 px-6",
  };

  // Variant styles
  const variantStyles = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-green-100 text-green-600 hover:bg-green-300",
    outline: "border-2 border-green-600 text-green-600 hover:bg-green-100",
  };

  // Combine all classes
  const combinedClassName = `${baseStyles} ${sizeStyles[size] || sizeStyles.medium} ${variantStyles[variant]} ${className || ""}`;

  return (
    <button className={combinedClassName} onClick={onClick}>
      {children}
    </button>
  );
}