import React from 'react';
import { Mic2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
          <Mic2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Speech to Text
        </h1>
      </div>
      <p className="text-gray-400 text-lg">
        แปลงเสียงพูดเป็นข้อความด้วย AI • รองรับภาษาไทยและอังกฤษ
      </p>
    </header>
  );
};