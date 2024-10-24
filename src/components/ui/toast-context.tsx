"use client"; // Thêm dòng này vào đầu file

import { createContext, useContext, useState, ReactNode } from "react";
import Toast from "./toast-tailwind";

// Tạo ToastContext để quản lý toast
interface ToastContextProps {
  showToast: (message: string, type: "success" | "danger" | "warning") => void;
}

const ToastContext = createContext<ToastContextProps | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "danger" | "warning">(
    "success"
  );

  const showToast = (
    message: string,
    type: "success" | "danger" | "warning"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastVisible && (
        <Toast
          type={toastType}
          message={toastMessage}
          onClose={() => setToastVisible(false)}
        />
      )}
    </ToastContext.Provider>
  );
};

// Hook để sử dụng ToastContext
export const useToast_Test = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
