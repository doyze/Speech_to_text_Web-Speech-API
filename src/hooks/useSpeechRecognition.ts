import { useState, useCallback, useRef, useEffect } from 'react';
import { SpeechRecognitionEvent, SpeechRecognitionErrorEvent, RecordingState } from '../types/speech';

export const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('th-TH');
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isListening = recordingState === 'recording';

  const initializeSpeechRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser');
      return null;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage;

    recognition.onstart = () => {
      setRecordingState('recording');
      setError(null);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;

        if (result.isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setTranscript(prev => prev + finalTranscript + ' ');
      }
      setInterimTranscript(interimTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(`Speech recognition error: ${event.error}`);
      setRecordingState('error');
    };

    recognition.onend = () => {
      setRecordingState('idle');
      setInterimTranscript('');
    };

    return recognition;
  }, [selectedLanguage]);

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = initializeSpeechRecognition();
    if (!recognition) return;

    recognitionRef.current = recognition;
    recognition.start();
  }, [initializeSpeechRecognition]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setError(null);
  }, []);

  const changeLanguage = useCallback((languageCode: string) => {
    setSelectedLanguage(languageCode);
    if (isListening) {
      stopListening();
    }
  }, [isListening, stopListening]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return {
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
  };
};