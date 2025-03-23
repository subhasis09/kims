'use client';

import React, { useState, useEffect } from 'react';
import { Language, translations } from '@/translations';

interface VoicePhoneInputProps {
  onPhoneSubmit: (phone: string) => void;
  language: Language;
}

const VoicePhoneInput: React.FC<VoicePhoneInputProps> = ({ onPhoneSubmit, language }) => {
  const [phone, setPhone] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const t = translations[language];

  useEffect(() => {
    let recognition: any;
    
    // Check if browser supports SpeechRecognition
    if (typeof window !== 'undefined' && 
        (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'english' ? 'en-US' : 
                        language === 'hindi' ? 'hi-IN' : 'or-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const numbers = transcript.replace(/[^0-9]/g, '');
        setPhone(numbers);
        setError('');
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setError(t.browserNotSupported);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      if (isListening) {
        try {
          recognition.start();
        } catch (error) {
          console.error('Recognition start error:', error);
        }
      }
    } else {
      setError(t.browserNotSupported);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening, language, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      onPhoneSubmit(phone);
    } else {
      setError(t.invalidPhone);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
          placeholder={t.enterPhoneNumber}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={10}
          aria-label={t.enterPhoneNumber}
        />
        <button
          type="button"
          onClick={() => setIsListening(!isListening)}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white hover:opacity-90`}
          aria-label={isListening ? t.stopRecording : t.startRecording}
        >
          {isListening ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        {t.continue}
      </button>
    </form>
  );
};

export default VoicePhoneInput; 