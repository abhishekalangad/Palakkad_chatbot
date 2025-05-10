import { touristAttractions } from '../data/touristAttractions';
import { templeFestivals } from '../data/templeFestivals';

// Function to normalize text for comparison
const normalizeText = (text: string): string => {
  return text.toLowerCase().trim();
};

// Function to check if text contains any of the keywords
const containsKeywords = (text: string, keywords: string[]): boolean => {
  const normalizedText = normalizeText(text);
  return keywords.some(keyword => normalizedText.includes(normalizeText(keyword)));
};

// Main function to process user messages
export const processUserMessage = (message: string, language: 'en' | 'ml'): string => {
  console.log(`Processing message: ${message} (language: ${language})`);
  const normalizedMessage = normalizeText(message);
  console.log(`Normalized message: ${normalizedMessage}`);
  // Check for best time to visit query
  if (containsKeywords(normalizedMessage, ['best time', 'when to visit', 'season', 'weather', 'ഏറ്റവും നല്ല സമയം', 'എപ്പോൾ സന്ദർശിക്കണം', 'സീസൺ', 'കാലാവസ്ഥ'])) {
    console.log('Triggered best time query response');
    return handleBestTimeQuery(language);
  }

  // Check for name introductions first
  const nameResponse = handleNameIntroduction(message, language);
  if (nameResponse) {
    console.log('Triggered name response');
    return nameResponse;
  }

  // Check for greetings
  const greetingResponse = handleGreeting(message, language);
  if (greetingResponse) {
    console.log('Triggered greeting response');
    return greetingResponse;
  }
  // Check for attraction-related queries
  if (containsKeywords(normalizedMessage, ['attractions', 'place', 'visit', 'tourist', 'sight', 'ആകർഷണം', 'സ്ഥലം', 'സന്ദർശിക്കാൻ', 'ടൂറിസ്റ്റ്'])) {
    return handleAttractionQuery(normalizedMessage, language);
  }
  
  // Check for festival-related queries
  if (containsKeywords(normalizedMessage, ['festivals', 'celebration', 'vela','festival', 'ഉത്സവം', 'ആഘോഷം', 'ചടങ്ങ്'])) {
    return handleFestivalQuery(normalizedMessage, language);
  }
  
  // Check for specific location queries
  for (const attraction of touristAttractions) {
    if (
      normalizedMessage.includes(normalizeText(attraction.name.en)) || 
      normalizedMessage.includes(normalizeText(attraction.name.ml))
    ) {
      return formatAttractionResponse(attraction, language);
    }
  }
  
  // Check for specific festival queries
  for (const festival of templeFestivals) {
    if (
      normalizedMessage.includes(normalizeText(festival.name.en)) || 
      normalizedMessage.includes(normalizeText(festival.name.ml))
    ) {
      return formatFestivalResponse(festival, language);
    }
  }
  
  

  // Default responses
  if (language === 'en') {
    return `I don't have specific information about that. Would you like to know about tourist attractions, temple festivals, or the best time to visit Palakkad?`;
  } else {
    return `അതിനെക്കുറിച്ച് എനിക്ക് പ്രത്യേക വിവരങ്ങളൊന്നുമില്ല. പാലക്കാട്ടിലെ ടൂറിസ്റ്റ് ആകർഷണങ്ങൾ, ക്ഷേത്ര ഉത്സവങ്ങൾ, അല്ലെങ്കിൽ പാലക്കാട് സന്ദർശിക്കാൻ ഏറ്റവും നല്ല സമയത്തെക്കുറിച്ച് അറിയാൻ താൽപ്പര്യമുണ്ടോ?`;
  }
};
const handleBestTimeQuery = (language: 'en' | 'ml'): string => {
  if (language === 'en') {
    return `The best time to visit Palakkad is from October to March when the weather is pleasant with temperatures ranging from 25°C to 35°C. The monsoon season (June to September) brings heavy rainfall, which makes outdoor activities challenging but offers lush green landscapes. The summer months (April to June) can be quite hot with temperatures sometimes exceeding 38°C. If you're interested in temple festivals, November (for Kalpathy Ratholsavam) and April-May (for Nenmara Vallangi Vela) are ideal times to visit.`;
  } else {
    return `പാലക്കാട് സന്ദർശിക്കാൻ ഏറ്റവും നല്ല സമയം താപനില 25°C മുതൽ 35°C വരെ ആയിരിക്കുന്ന ഒക്ടോബർ മുതൽ മാർച്ച് വരെയാണ്. മൺസൂൺ കാലം (ജൂൺ മുതൽ സെപ്റ്റംബർ വരെ) കനത്ത മഴ കൊണ്ടുവരുന്നു, ഇത് ഔട്ട്ഡോർ പ്രവർത്തനങ്ങളെ വെല്ലുവിളിയാക്കുന്നുവെങ്കിലും പച്ചപ്പുള്ള പ്രകൃതി ദൃശ്യങ്ങൾ വാഗ്ദാനം ചെയ്യുന്നു. വേനൽക്കാലം (ഏപ്രിൽ മുതൽ ജൂൺ വരെ) താപനില ചിലപ്പോൾ 38°C കവിയുന്ന വളരെ ചൂടായിരിക്കും. നിങ്ങൾ �ക്ഷേത്ര ഉത്സവങ്ങളിൽ താൽപ്പര്യമുള്ളവരാണെങ്കിൽ, നവംബർ (കൽപ്പാത്തി രഥോത്സവത്തിന്) ഏപ്രിൽ-മേയ് (നെന്മാറ വല്ലങ്ങി വേലയ്ക്ക്) സന്ദർശിക്കാനുള്ള ആദർശ സമയങ്ങളാണ്.`;
  }
};
// Helper functions for specific query types
const handleAttractionQuery = (query: string, language: 'en' | 'ml'): string => {
  // Check for specific attraction types
  let filteredAttractions = touristAttractions;
  
  if (containsKeywords(query, ['fort', 'കോട്ട'])) {
    filteredAttractions = touristAttractions.filter(a => a.category === 'fort');
  } else if (containsKeywords(query, ['park', 'national park', 'valley', 'പാർക്ക്', 'നാഷണൽ പാർക്ക്', 'വാലി'])) {
    filteredAttractions = touristAttractions.filter(a => a.category === 'park');
  } else if (containsKeywords(query, ['dam', 'reservoir', 'garden', 'ഡാം', 'ജലസംഭരണി', 'ഗാർഡൻ'])) {
    filteredAttractions = touristAttractions.filter(a => a.category === 'dam');
  } else if (containsKeywords(query, ['hills', 'mountain', 'കുന്നുകൾ', 'പർവ്വതം'])) {
    filteredAttractions = touristAttractions.filter(a => a.category === 'hills');
  } else if (containsKeywords(query, ['reserve', 'tiger', 'wildlife', 'സങ്കേതം', 'കടുവ', 'വന്യജീവി'])) {
    filteredAttractions = touristAttractions.filter(a => a.category === 'reserve');
  } else if (containsKeywords(query, ['temple', 'shrine', 'ക്ഷേത്രം', 'ദേവാലയം'])) {
    filteredAttractions = touristAttractions.filter(a => a.category === 'temple');
  }
  
  // If we have a specific category match or there's a top/list query, show a list
  if (filteredAttractions.length < touristAttractions.length || 
      containsKeywords(query, ['top', 'list', 'all', 'main', 'important', 'best', 'മുഖ്യ', 'എല്ലാം', 'പ്രധാന', 'പ്രധാനപ്പെട്ട', 'മികച്ച'])) {
    
    // Return a list of attractions
    if (language === 'en') {
      const attractionsList = filteredAttractions
        .map(attr => attr.name.en)
        .join(', ');
      
      return `Here are the popular attractions in Palakkad: ${attractionsList}. Would you like detailed information about any specific place?`;
    } else {
      const attractionsList = filteredAttractions
        .map(attr => attr.name.ml)
        .join(', ');
      
      return `പാലക്കാട്ടിലെ ജനപ്രിയ ആകർഷണങ്ങൾ ഇവയാണ്: ${attractionsList}. ഏതെങ്കിലും പ്രത്യേക സ്ഥലത്തെക്കുറിച്ച് വിശദമായ വിവരങ്ങൾ അറിയാൻ താൽപ്പര്യമുണ്ടോ?`;
    }
  }
  
  // If no specific match, return a detailed card for a random attraction
  const randomAttraction = filteredAttractions[Math.floor(Math.random() * filteredAttractions.length)];
  return formatAttractionResponse(randomAttraction, language);
};

const handleFestivalQuery = (query: string, language: 'en' | 'ml'): string => {
  // Check if we should list all festivals
  if (containsKeywords(query, ['all', 'list', 'which', 'popular', 'top', 'എല്ലാം', 'പട്ടിക', 'ഏത്', 'ജനപ്രിയ', 'മുൻനിര'])) {
    if (language === 'en') {
      const festivalsList = templeFestivals
        .map(festival => festival.name.en)
        .join(', ');
      
      return `The major temple festivals in Palakkad include: ${festivalsList}. Would you like to know more about any specific festival?`;
    } else {
      const festivalsList = templeFestivals
        .map(festival => festival.name.ml)
        .join(', ');
      
      return `പാലക്കാട്ടിലെ പ്രധാന ക്ഷേത്ര ഉത്സവങ്ങളിൽ ഇവ ഉൾപ്പെടുന്നു: ${festivalsList}. ഏതെങ്കിലും പ്രത്യേക ഉത്സവത്തെക്കുറിച്ച് കൂടുതൽ അറിയാൻ താൽപ്പര്യമുണ്ടോ?`;
    }
  }
  
  // Check for specific festival mentions
  for (const festival of templeFestivals) {
    if (containsKeywords(query, [festival.name.en.toLowerCase(), festival.name.ml.toLowerCase()])) {
      return formatFestivalResponse(festival, language);
    }
  }
  
  // If no specific match, return details for a random festival
  const randomFestival = templeFestivals[Math.floor(Math.random() * templeFestivals.length)];
  return formatFestivalResponse(randomFestival, language);
};

// Formatter functions
const formatAttractionResponse = (attraction: typeof touristAttractions[0], language: 'en' | 'ml'): string => {
  // Create a JSON representation of the attraction with language-specific fields
  const attractionCard = {
    name: attraction.name[language],
    description: attraction.description[language],
    bestTimeToVisit: attraction.bestTimeToVisit[language],
    location: attraction.location,
    image: attraction.image
  };
  
  // Return formatted message with attraction card
  return `::ATTRACTION::${JSON.stringify(attractionCard)}`;
};

const formatFestivalResponse = (festival: typeof templeFestivals[0], language: 'en' | 'ml'): string => {
  // Create a JSON representation of the festival with language-specific fields
  const festivalCard = {
    name: festival.name[language],
    description: festival.description[language],
    timing: festival.timing[language],
    location: festival.location,
    image: festival.image
  };
  
  // Return formatted message with festival card
  return `::FESTIVAL::${JSON.stringify(festivalCard)}`;
};
const handleGreeting = (message: string, language: 'en' | 'ml'): string | null => {
  const greetings = {
    en: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening','hii','hloo','hlo'],
    ml: ['ഹായ്', 'ഹലോ', 'നമസ്കാരം', 'സുപ്രഭാതം', 'ഗുഡ് മോർണിംഗ്']
  };
  const normalizedMsg = normalizeText(message);

  // Handle English greetings
  if (language === 'en') {
    // Use exact phrase matching with word boundaries
    if (greetings.en.some(g => new RegExp(`\\b${g}\\b`, 'i').test(normalizedMsg))) {
      const responses = [
        "Hello! I'm your Palakkad guide. How can I help you today?",
        "Hi there! Ready to explore the beauty of Palakkad?",
        "Greetings! What would you like to know about Palakkad?",
        "Good morning! Are you looking for some exciting things to do in Palakkad?",
        "Good afternoon! I'm here to help you discover the best of Palakkad.",
        "Good evening! What's on your mind about Palakkad?",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    if (new RegExp(`\\bhow are you\\b`, 'i').test(normalizedMsg)) {
      return "I'm doing well, thank you for asking! How can I assist you with Palakkad today?";
    }
  }

  // Handle Malayalam greetings
  if (language === 'ml') {
    if (greetings.ml.some(g => new RegExp(`\\b${g}\\b`, 'i').test(normalizedMsg))) {
      const responses = [
        "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ പാലക്കാട് ഗൈഡ് ആണ്. എങ്ങനെ സഹായിക്കാം?",
        "ഹായ്! പാലക്കാടിന്റെ സൗന്ദര്യം കണ്ടെത്താൻ തയ്യാറാണോ?",
        "നമസ്കാരം! പാലക്കാടിനെക്കുറിച്ച് എന്താണ് അറിയാൻ ആഗ്രഹിക്കുന്നത്?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  return null;
};

// Function to handle name introductions
const handleNameIntroduction = (message: string, language: 'en' | 'ml'): string | null => {
  const namePatterns = {
    en: ['my name is', 'my name', 'i am', "i m", 'call me', 'name is',"im",'myself'],
    ml: ['എന്റെ പേര്', 'ഞാൻ', 'എന്നെ വിളിക്കൂ', 'പേര്']
  };

  const normalizedMsg = normalizeText(message);
  const originalMsg = message.trim(); // Preserve original case for name extraction

  for (const pattern of language === 'en' ? namePatterns.en : namePatterns.ml) {
    const normalizedPattern = normalizeText(pattern);
    if (normalizedMsg.includes(normalizedPattern)) {
      console.log(`Pattern matched: ${normalizedPattern}`);
      // Try regex for name extraction
      const regex = new RegExp(`${normalizedPattern}\\s+([\\p{L}\\s]+)`, 'iu');
      const match = originalMsg.match(regex);
      if (match && match[1]) {
        const name = match[1].trim().replace(/\s+/g, ' ',);
        console.log(`Extracted name (regex): ${name}`);
        if (language === 'en') {
          return `Nice to meet you, ${name}! How can I help you explore Palakkad today?`;
        } else {
          return `${name}, നിങ്ങളെ കണ്ടതിൽ സന്തോഷം! ഇന്ന് പാലക്കാട് കണ്ടെത്താൻ എങ്ങനെ സഹായിക്കാം?`;
        }
      }
      // Fallback for simple patterns like "my name is john" or "my name john"
      const fallbackName = originalMsg.split(pattern)[1]?.trim();
      if (fallbackName) {
        const cleanedName = fallbackName.replace(/\s+/g, ' ').trim();
        console.log(`Extracted name (fallback): ${cleanedName}`);
        if (cleanedName) {
          if (language === 'en') {
            return `Nice to meet you, ${cleanedName}! How can I help you explore Palakkad today?`;
          } else {
            return `${cleanedName}, നിങ്ങളെ കണ്ടതിൽ സന്തോഷം! ഇന്ന് പാലക്കാട് കണ്ടെത്താൻ എങ്ങനെ സഹായിക്കാം?`;
          }
        }
      }
    }
  }
  console.log('No name matched');
  return null;
};
