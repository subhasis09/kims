'use client';

import React, { useState, useEffect } from 'react';
import { Language, translations } from '@/translations';

interface Props {
  symptoms: string;
  onSymptomsChange: (symptoms: string) => void;
  language: Language;
  onNext: () => void;
}

export default function SymptomsInput({ symptoms, onSymptomsChange, language, onNext }: Props) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const t = translations[language];

  useEffect(() => {
    let recognition: any;
    
    // Check if the browser supports SpeechRecognition
    if (typeof window !== 'undefined' && 
        (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      // Set language based on selected language
      recognition.lang = language === 'english' ? 'en-US' : 
                        language === 'hindi' ? 'hi-IN' : 'or-IN';

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        
        onSymptomsChange(transcript);
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
  }, [isListening, language, onSymptomsChange, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.trim()) {
      onNext();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {t.tellUsAboutSymptoms}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
            {t.pleaseShareSymptoms}
          </label>
          <textarea
            id="symptoms"
            name="symptoms"
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={symptoms}
            onChange={(e) => onSymptomsChange(e.target.value)}
            placeholder={t.describeSymptoms}
          />
          <button
            type="button"
            onClick={() => setIsListening(!isListening)}
            className={`absolute right-2 bottom-2 p-2 rounded-full ${
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
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!symptoms.trim()}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.continue}
          </button>
        </div>
      </form>
    </div>
  );
} 