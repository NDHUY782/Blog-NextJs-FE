import React from "react";

interface ToastProps {
  type: "success" | "danger" | "warning";
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  const getColorClasses = () => {
    switch (type) {
      case "success":
        return "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200";
      case "danger":
        return "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200";
      case "warning":
        return "text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200";
      default:
        return "";
    }
  };

  return (
    <div
      className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${getColorClasses()}`}
      role="alert"
    >
      <div
        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${getColorClasses()}`}
      >
        {/* Replace with actual icons for success, danger, and warning */}
        <span>
          {type === "success" ? "✔️" : type === "danger" ? "❌" : "⚠️"}
        </span>
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Close"
        onClick={onClose}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
