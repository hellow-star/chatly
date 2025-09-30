import React from "react";

const BorderAnimated = ({ children, className = "", ...props }) => {
  const style = {
    "--border-angle": "0deg",
    background: `linear-gradient(45deg, #111827, #1f2937) padding-box, conic-gradient(from var(--border-angle), rgba(71, 85, 105, 0.48) 80%, #ef4444 86%, #f87171 90%, #ef4444 94%, rgba(71, 85, 105, 0.48)) border-box`,
  };

  return (
    <div
      className={`rounded-xl border border-transparent animate-border ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default BorderAnimated;
