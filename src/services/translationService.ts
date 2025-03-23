import { Language } from '@/translations';

const GOOGLE_TRANSLATE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;

const languageCodes: Record<Language, string> = {
  english: 'en',
  hindi: 'hi',
  odia: 'or'
};

export async function translateText(text: string, targetLanguage: Language): Promise<string> {
  if (!GOOGLE_TRANSLATE_API_KEY) {
    console.error('Google Translate API key is not configured');
    return text;
  }

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: languageCodes[targetLanguage],
          source: 'en', // Assuming source is always English
        }),
      }
    );

    const data = await response.json();
    
    if (data.error) {
      console.error('Translation API error:', data.error);
      return text;
    }

    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

export async function translateObject<T extends Record<string, string>>(
  obj: T,
  targetLanguage: Language
): Promise<T> {
  const translatedObj = { ...obj } as T;
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      translatedObj[key as keyof T] = await translateText(value, targetLanguage) as T[keyof T];
    }
  }

  return translatedObj;
} 