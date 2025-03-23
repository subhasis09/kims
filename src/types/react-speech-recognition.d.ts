declare module 'react-speech-recognition' {
  interface SpeechRecognitionOptions {
    continuous?: boolean;
    language?: string;
  }

  interface SpeechRecognitionHook {
    transcript: string;
    listening: boolean;
    resetTranscript: () => void;
    browserSupportsSpeechRecognition: boolean;
  }

  const SpeechRecognition: {
    startListening: (options?: SpeechRecognitionOptions) => void;
    stopListening: () => void;
    abortListening: () => void;
  };

  const useSpeechRecognition: () => SpeechRecognitionHook;

  export default SpeechRecognition;
  export { useSpeechRecognition };
} 