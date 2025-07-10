import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ErrorAlertProps {
  error: string;
  onDismiss: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onDismiss }) => {
  return (
    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-red-200 text-sm">{error}</p>
        <p className="text-red-300 text-xs mt-1">
          โปรดตรวจสอบการอนุญาตใช้ไมโครโฟนและลองใหม่อีกครั้ง
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="text-red-400 hover:text-red-300 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};