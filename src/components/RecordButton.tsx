import React from 'react';
import { Mic, MicOff, Square } from 'lucide-react';
import { RecordingState } from '../types/speech';

interface RecordButtonProps {
  recordingState: RecordingState;
  onStart: () => void;
  onStop: () => void;
}

export const RecordButton: React.FC<RecordButtonProps> = ({
  recordingState,
  onStart,
  onStop
}) => {
  const isRecording = recordingState === 'recording';
  const isProcessing = recordingState === 'processing';
  const isError = recordingState === 'error';

  const buttonClass = `
    relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-opacity-50
    ${isRecording 
      ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 focus:ring-red-500' 
      : isError
      ? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30 focus:ring-red-600'
      : 'bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/30 focus:ring-blue-500'
    }
  `;

  const pulseClass = isRecording ? 'animate-pulse' : '';

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={isRecording ? onStop : onStart}
        disabled={isProcessing}
        className={`${buttonClass} ${pulseClass}`}
      >
        {isRecording ? (
          <Square className="w-8 h-8 text-white" />
        ) : isError ? (
          <MicOff className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
        
        {isRecording && (
          <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping"></div>
        )}
      </button>
      
      <p className="text-sm text-gray-400 text-center">
        {isRecording ? 'กำลังฟัง...' : 
         isError ? 'เกิดข้อผิดพลาด' :
         isProcessing ? 'กำลังประมวลผล...' : 'คลิกเพื่อเริ่มพูด'}
      </p>
    </div>
  );
};