import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ml';

interface Translations {
  welcomeMessage: string;
  inputPlaceholder: string;
  sendButton: string;
  suggestedQuestions: string;
  about: string;
  attractions: string;
  festivals: string;
  bestTimeToVisit: string;
  loading: string;
}

const translations: Record<Language, Translations> = {
  en: {
    welcomeMessage: "Hello! I'm your Palakkad Tourism Guide. How can I help you explore the cultural heritage and natural beauty of Palakkad?",
    inputPlaceholder: "Ask about attractions, festivals, or culture...",
    sendButton: "Send",
    suggestedQuestions: "Suggested Questions",
    about: "About",
    attractions: "Tourist Attractions",
    festivals: "Temple Festivals",
    bestTimeToVisit: "Best Time to Visit",
    loading: "Thinking..."
  },
  ml: {
    welcomeMessage: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ പാലക്കാട് ടൂറിസം ഗൈഡാണ്. പാലക്കാടിന്റെ സാംസ്കാരിക പൈതൃകവും പ്രകൃതി സൗന്ദര്യവും കണ്ടെത്താൻ ഞാൻ എങ്ങനെ സഹായിക്കണം?",
    inputPlaceholder: "ആകർഷണങ്ങൾ, ഉത്സവങ്ങൾ, അല്ലെങ്കിൽ സംസ്കാരത്തെക്കുറിച്ച് ചോദിക്കുക...",
    sendButton: "അയയ്ക്കുക",
    suggestedQuestions: "നിർദ്ദേശിച്ച ചോദ്യങ്ങൾ",
    about: "കുറിച്ച്",
    attractions: "ടൂറിസ്റ്റ് ആകർഷണങ്ങൾ",
    festivals: "ക്ഷേത്ര ഉത്സവങ്ങൾ",
    bestTimeToVisit: "സന്ദർശിക്കാൻ ഏറ്റവും നല്ല സമയം",
    loading: "ചിന്തിക്കുന്നു..."
  }
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ml' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      toggleLanguage,
      translations: translations[language]
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};