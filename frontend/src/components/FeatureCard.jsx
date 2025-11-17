import React from "react";

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  bgColor,
  iconBg,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-3xl p-8 shadow-md border border-white
        animate-popup cursor-pointer hover:scale-[1.03] transition-transform
      `}
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="
          text-white w-14 h-14 flex items-center justify-center 
          rounded-2xl text-3xl shadow-lg mb-6
        "
        style={{ backgroundColor: iconBg }}
      >
        <Icon />
      </div>

      <h2 className="text-2xl font-bold mb-3" style={{ color: iconBg }}>
        {title}
      </h2>

      <p className="text-gray-700">{description}</p>
    </div>
  );
}
