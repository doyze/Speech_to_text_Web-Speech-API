import React, { useState } from 'react';
import { Copy, Trash2, Check } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface TranscriptionDisplayProps {
  transcript: string;
  interimTranscript: string;
  onClear: () => void;
}

export const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({
  transcript,
  interimTranscript,
  onClear
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = transcript + interimTranscript;
    const success = await copyToClipboard(textToCopy);
    
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const hasContent = transcript || interimTranscript;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6 min-h-[200px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">ข้อความที่แปลงแล้ว</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            disabled={!hasContent}
            className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span className="text-sm">{copied ? 'คัดลอกแล้ว' : 'คัดลอก'}</span>
          </button>
          <button
            onClick={onClear}
            disabled={!hasContent}
            className="p-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">ล้าง</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {hasContent ? (
          <div className="text-gray-200 leading-relaxed">
            <span className="text-white">{transcript}</span>
            <span className="text-gray-400 italic">{interimTranscript}</span>
            {interimTranscript && <span className="animate-pulse text-blue-400">|</span>}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p className="text-center">
              เริ่มพูดเพื่อแปลงเสียงเป็นข้อความ<br />
              <span className="text-sm">รองรับภาษาไทยและอังกฤษ</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};