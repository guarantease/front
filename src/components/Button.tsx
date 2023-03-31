import React from "react";

export const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="hover:bg-primary-400 bg-primary-500 text-white rounded-lg font-bold px-3 py-2"
    >
      {children}
    </button>
  );
};

export default Button;
