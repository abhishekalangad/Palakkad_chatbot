export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  language?: 'en' | 'ml';
}

export interface TouristAttraction {
  id: string;
  name: {
    en: string;
    ml: string;
  };
  description: {
    en: string;
    ml: string;
  };
  bestTimeToVisit: {
    en: string;
    ml: string;
  };
  location: string;
  image: string;
  category: 'fort' | 'park' | 'dam' | 'hills' | 'reserve' | 'temple';
}

export interface TempleFestival {
  id: string;
  name: {
    en: string;
    ml: string;
  };
  description: {
    en: string;
    ml: string;
  };
  timing: {
    en: string;
    ml: string;
  };
  location: string;
  image: string;
}

export interface QuickReply {
  id: string;
  text: {
    en: string;
    ml: string;
  };
}