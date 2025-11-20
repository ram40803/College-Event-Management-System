import React, { useEffect } from "react";

const MessageBanner = ({ type = "info", message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, []);

  const styles = {
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
  };

  const icons = {
    success: "✔️",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  return (
    <div
      className={`fixed z-50 top-4 left-1/2 transform -translate-x-1/2 px-5 py-3 
      rounded-xl border shadow-md flex items-center gap-3 transition-all animate-fade-in
      ${styles[type]}`}
    >
      <span className="text-xl">{icons[type]}</span>
      <span className="font-medium">{message}</span>

      <button
        onClick={onClose}
        className="ml-4 text-lg hover:opacity-70"
      >
        ✖
      </button>
    </div>
  );
}

export default MessageBanner;
