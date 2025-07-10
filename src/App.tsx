import React from 'react';
import { Header } from './components/Header';
import { LanguageSelector } from './components/LanguageSelector';
import { RecordButton } from './components/RecordButton';
import { TranscriptionDisplay } from './components/TranscriptionDisplay';
import { ErrorAlert } from './components/ErrorAlert';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';

function App() {
  const {
    transcript,
    interimTranscript,
    recordingState,
    error,
    selectedLanguage,
    isListening,
    startListening,
    stopListening,
    clearTranscript,
    changeLanguage
  } = useSpeechRecognition();

  const handleDismissError = () => {
    // The error will be cleared when starting a new recording
    clearTranscript();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent)] pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        {error && (
          <ErrorAlert error={error} onDismiss={handleDismissError} />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700 p-6">
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={changeLanguage}
              />
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700 p-6 flex justify-center">
              <RecordButton
                recordingState={recordingState}
                onStart={startListening}
                onStop={stopListening}
              />
            </div>
            
            {/* Status Indicator */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700 p-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  isListening ? 'bg-green-500 animate-pulse' : 
                  error ? 'bg-red-500' : 'bg-gray-500'
                }`}></div>
                <span className="text-sm text-gray-300">
                  {isListening ? 'กำลังฟัง' : 
                   error ? 'เกิดข้อผิดพลาด' : 'พร้อมใช้งาน'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Transcription */}
          <div className="lg:col-span-2">
            <TranscriptionDisplay
              transcript={transcript}
              interimTranscript={interimTranscript}
              onClear={clearTranscript}
            />
          </div>
        </div>
        
        {/* Tips */}
        <div className="mt-8 bg-gray-800/20 backdrop-blur-sm rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">💡 เคล็ดลับการใช้งาน</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• พูดชัดเจนและไม่เร็วเกินไป</li>
            <li>• ตรวจสอบให้แน่ใจว่าไมโครโฟนทำงานปกติ</li>
            <li>• เลือกภาษาให้ตรงกับที่คุณจะพูด</li>
            <li>• ข้อความสีเทาคือการแปลงแบบเรียลไทม์ ข้อความสีขาวคือผลลัพธ์สุดท้าย</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;