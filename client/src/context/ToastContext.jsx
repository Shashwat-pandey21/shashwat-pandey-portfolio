import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    info: (msg, dur) => addToast(msg, 'info', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-md w-full px-4 sm:px-0 pointer-events-none">
        {toasts.map((item) => {
          let bgClass = 'bg-slate-900/95 border-slate-700 text-slate-100';
          let IconComponent = Info;
          let iconColor = 'text-blue-400';

          if (item.type === 'success') {
            bgClass = 'bg-emerald-950/90 border-emerald-700/60 text-emerald-100';
            IconComponent = CheckCircle2;
            iconColor = 'text-emerald-400';
          } else if (item.type === 'error') {
            bgClass = 'bg-rose-950/90 border-rose-700/60 text-rose-100';
            IconComponent = AlertCircle;
            iconColor = 'text-rose-400';
          } else if (item.type === 'warning') {
            bgClass = 'bg-amber-950/90 border-amber-700/60 text-amber-100';
            IconComponent = AlertTriangle;
            iconColor = 'text-amber-400';
          }

          return (
            <div
              key={item.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-2 ${bgClass}`}
            >
              <IconComponent className={`w-5 h-5 mt-0.5 shrink-0 ${iconColor}`} />
              <div className="flex-1 text-sm font-medium leading-snug break-words">
                {item.message}
              </div>
              <button
                onClick={() => removeToast(item.id)}
                className="text-slate-400 hover:text-white transition-colors p-0.5 rounded-lg shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
