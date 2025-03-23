'use client';

import 'regenerator-runtime/runtime';
import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import type { PatientData } from '@/types/patient';
import { translations, type Translation } from '@/translations';

interface Props {
  patientData: PatientData;
  onDataUpdate: (data: Partial<PatientData>) => void;
  onNext: () => void;
}

// Custom MicrophoneIcon component
function MicrophoneIcon({ isListening, t }: { isListening: boolean; t: Translation }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
      aria-label={isListening ? t.stopRecording : t.startRecording}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
      />
    </svg>
  );
}

// Common medical symptoms and conditions
const COMMON_SYMPTOMS = {
  pain: ['headache', 'stomach ache', 'back pain', 'chest pain', 'joint pain', 'throat pain'],
  respiratory: ['cough', 'breathing', 'shortness of breath', 'wheezing', 'congestion'],
  digestive: ['nausea', 'vomiting', 'diarrhea', 'constipation', 'indigestion', 'stomach pain'],
  fever: ['fever', 'high temperature', 'chills', 'sweating'],
  skin: ['rash', 'itching', 'swelling', 'redness', 'skin infection'],
  neurological: ['dizziness', 'headache', 'migraine', 'fainting', 'seizure'],
  general: ['fatigue', 'weakness', 'tiredness', 'loss of appetite', 'weight loss']
};

export default function VoiceRegistration({ patientData, onDataUpdate, onNext }: Props) {
  const [activeField, setActiveField] = useState<keyof PatientData | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof PatientData, string>>>({});
  const [isListening, setIsListening] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const hasSpokenRef = useRef(false);

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const t = translations[patientData.language];

  useEffect(() => {
    if (!listening && transcript && activeField) {
      processVoiceInput(transcript, activeField);
    }
  }, [listening, transcript]);

  const processVoiceInput = (text: string, field: keyof PatientData) => {
    let processedValue = text.trim();

    // Field-specific processing
    switch (field) {
      case 'title':
        processedValue = processTitle(processedValue);
        break;

      case 'name':
      case 'guardianName':
      case 'referringDoctor':
        processedValue = processName(processedValue);
        break;

      case 'dateOfBirth':
        processedValue = processDate(processedValue);
        break;

      case 'age':
        processedValue = processAge(processedValue);
        break;

      case 'gender':
        processedValue = processGender(processedValue);
        break;

      case 'bloodGroup':
        processedValue = processBloodGroup(processedValue);
        break;

      case 'phone':
      case 'alternativePhone':
      case 'emergencyContact':
        processedValue = processPhone(processedValue);
        break;

      case 'pinCode':
        processedValue = processPinCode(processedValue);
        break;

      case 'email':
        processedValue = processEmail(processedValue);
        break;
    }

    const isValid = validateField(field, processedValue);

    if (!isValid && retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      if (!hasSpokenRef.current) {
        // Map PatientData fields to Translation keys
        const fieldToTranslationKey: Record<keyof PatientData, keyof Translation> = {
          title: 'title',
          name: 'fullName',
          guardianName: 'guardianName',
          dateOfBirth: 'dateOfBirth',
          age: 'age',
          gender: 'gender',
          bloodGroup: 'bloodGroup',
          address: 'address',
          district: 'district',
          state: 'state',
          pinCode: 'pinCode',
          country: 'country',
          phone: 'phone',
          alternativePhone: 'alternativePhone',
          email: 'email',
          nationality: 'nationality',
          religion: 'religion',
          emergencyContact: 'emergencyContact',
          language: 'selectLanguage',
          mrn: 'mrn',
          isExisting: 'isExisting',
          doctorToConsult: 'doctor',
          unit: 'unit',
          referringDoctor: 'referringDoctor'
        };
        speak(`${t.pleaseRepeat} ${t[fieldToTranslationKey[field]]}`);
        hasSpokenRef.current = true;
      }
      resetTranscript();
      startListening(field);
    } else {
      setRetryCount(0);
      hasSpokenRef.current = false;
      onDataUpdate({ [field]: processedValue });
      setActiveField(null);
    }
  };

  // Field processing functions
  const processTitle = (value: string): 'MR' | 'MRS' | 'MS' | 'OTHERS' => {
    const normalized = value.toUpperCase();
    if (normalized.includes('MISTER') || normalized.includes('MR')) return 'MR';
    if (normalized.includes('MISSES') || normalized.includes('MRS')) return 'MRS';
    if (normalized.includes('MISS') || normalized.includes('MS')) return 'MS';
    return 'OTHERS';
  };

  const processName = (value: string): string => {
    return value
      .replace(/^(my name is|i am|this is|name)/i, '')
      .replace(/[^a-zA-Z\s]/g, '')
      .trim();
  };

  const processDate = (value: string): string => {
    // Convert spoken date to YYYY-MM-DD format
    // This is a simple implementation - you might want to add more date formats
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
    return value;
  };

  const processAge = (value: string): string => {
    const numberWords: { [key: string]: number } = {
      'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
      'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
      'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14,
      'fifteen': 15, 'sixteen': 16, 'seventeen': 17, 'eighteen': 18,
      'nineteen': 19, 'twenty': 20
    };
    
    const ageMatch = value.match(/\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty/i);
    if (ageMatch) {
      const ageWord = ageMatch[0].toLowerCase();
      return numberWords[ageWord]?.toString() || ageMatch[0];
    }
    return '';
  };

  const processGender = (value: string): 'MALE' | 'FEMALE' | 'OTHERS' => {
    const normalized = value.toUpperCase();
    if (normalized.includes('MALE')) return 'MALE';
    if (normalized.includes('FEMALE')) return 'FEMALE';
    return 'OTHERS';
  };

  const processBloodGroup = (value: string): string => {
    return value.toUpperCase()
      .replace(/POSITIVE/g, '+')
      .replace(/NEGATIVE/g, '-')
      .replace(/\s+/g, '');
  };

  const processPhone = (value: string): string => {
    return value.replace(/[^0-9]/g, '');
  };

  const processPinCode = (value: string): string => {
    return value.replace(/[^0-9]/g, '');
  };

  const processEmail = (value: string): string => {
    return value.toLowerCase()
      .replace(/\s+at\s+/g, '@')
      .replace(/\s+dot\s+/g, '.')
      .replace(/[^a-z0-9@._-]/g, '');
  };

  const validateField = (field: keyof PatientData, value: string): boolean => {
    let isValid = true;
    const newErrors: Partial<Record<keyof PatientData, string>> = {};

    switch (field) {
      case 'name':
      case 'guardianName':
        if (value.length < 2) {
          newErrors[field] = t.required;
          isValid = false;
        }
        break;

      case 'age':
        const age = parseInt(value);
        if (isNaN(age) || age < 1 || age > 120) {
          newErrors.age = t.invalidAge;
          isValid = false;
        }
        break;

      case 'phone':
      case 'alternativePhone':
      case 'emergencyContact':
        if (!/^\d{10}$/.test(value)) {
          newErrors[field] = t.invalidPhone;
          isValid = false;
        }
        break;

      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = t.invalidEmail;
          isValid = false;
        }
        break;

      case 'pinCode':
        if (!/^\d{6}$/.test(value)) {
          newErrors.pinCode = t.invalidPinCode;
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const startListening = (field: keyof PatientData) => {
    if (!browserSupportsSpeechRecognition) {
      alert(t.browserNotSupported);
      return;
    }

    setActiveField(field);
    resetTranscript();
    hasSpokenRef.current = false;
    SpeechRecognition.startListening({
      continuous: false,
      language: patientData.language === 'hindi' ? 'hi-IN' : patientData.language === 'odia' ? 'or-IN' : 'en-IN'
    });
    setIsListening(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };

  const toggleListening = (field: keyof PatientData) => {
    if (isListening) {
      stopListening();
    } else {
      startListening(field);
    }
  };

  const resetForm = () => {
    onDataUpdate({
      name: '',
      age: '',
      phone: ''
    });
    setErrors({});
    resetTranscript();
  };

  // Text-to-speech function for feedback
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = patientData.language === 'hindi' ? 'hi-IN' : patientData.language === 'odia' ? 'or-IN' : 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  const isFormComplete = () => {
    const requiredFields: (keyof PatientData)[] = ['name', 'age', 'phone'];
    return requiredFields.every(field => {
      const value = patientData[field];
      return value && value.toString().trim().length > 0 && !errors[field];
    });
  };

  const renderField = (field: keyof PatientData, label: string, type: string = 'text', placeholder: string = '') => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex items-center space-x-2">
        <input
          type={type}
          value={patientData[field]?.toString() || ''}
          onChange={(e) => {
            onDataUpdate({ [field]: e.target.value });
            validateField(field, e.target.value);
          }}
          className={`flex-1 p-2 border rounded-md ${
            errors[field] ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={placeholder}
          aria-label={label}
        />
        <button
          onClick={() => toggleListening(field)}
          className={`p-2 rounded-full transition-colors ${
            activeField === field && isListening
              ? 'bg-red-100 text-red-500'
              : 'bg-blue-100 text-blue-500'
          }`}
          aria-label={isListening ? `${t.stopRecording} ${label}` : `${t.startRecording} ${label}`}
        >
          <MicrophoneIcon isListening={activeField === field && isListening} t={t} />
        </button>
      </div>
      {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900">{t.patientRegistration}</h2>

      <div className="space-y-6">
        {/* Title Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">{t.title}</label>
          <div className="mt-1 grid grid-cols-4 gap-2">
            {['MR', 'MRS', 'MS', 'OTHERS'].map((title) => (
              <button
                key={title}
                onClick={() => onDataUpdate({ title: title as PatientData['title'] })}
                className={`p-2 rounded-lg text-center ${
                  patientData.title === title
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-700'
                }`}
              >
                {t[title.toLowerCase() as keyof Translation] || title}
              </button>
            ))}
          </div>
        </div>

        {renderField('name', t.fullName)}
        {renderField('guardianName', t.guardianName)}
        {renderField('dateOfBirth', t.dateOfBirth, 'date')}
        {renderField('age', t.age)}

        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">{t.gender}</label>
          <div className="mt-1 grid grid-cols-3 gap-2">
            {['MALE', 'FEMALE', 'OTHERS'].map((gender) => (
              <button
                key={gender}
                onClick={() => onDataUpdate({ gender: gender as PatientData['gender'] })}
                className={`p-2 rounded-lg text-center ${
                  patientData.gender === gender
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-700'
                }`}
              >
                {t[gender.toLowerCase() as keyof Translation]}
              </button>
            ))}
          </div>
        </div>

        {renderField('bloodGroup', t.bloodGroup)}
        {renderField('district', t.district)}
        {renderField('state', t.state)}
        {renderField('pinCode', t.pinCode)}
        {renderField('country', t.country)}
        {renderField('phone', t.phone)}
        {renderField('alternativePhone', t.alternativePhone)}
        {renderField('email', t.email)}
        {renderField('nationality', t.nationality)}
        {renderField('religion', t.religion)}
        {renderField('emergencyContact', t.emergencyContact)}
      </div>

      {/* Transcript Display */}
      {transcript && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{t.recognizedSpeech}:</span> {transcript}
          </p>
        </div>
      )}

      {/* Next Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={onNext}
          disabled={!isFormComplete()}
          className={`px-6 py-2 rounded-lg transition-colors ${
            isFormComplete()
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {t.next}
        </button>
      </div>
    </div>
  );
}