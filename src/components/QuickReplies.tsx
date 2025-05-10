import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface QuickRepliesProps {
  onQuickReplyClick: (text: string) => void;
}

const QuickReplies: React.FC<QuickRepliesProps> = ({ onQuickReplyClick }) => {
  const { language, translations } = useLanguage();
  
  const quickReplies = [
    {
      id: 'attractions',
      text: {
        en: 'What are the top attractions in Palakkad?',
        ml: 'പാലക്കാട്ടിലെ പ്രധാന ആകർഷണങ്ങൾ എന്തൊക്കെയാണ്?'
      }
    },
    {
      id: 'festivals',
      text: {
        en: 'Tell me about temple festivals',
        ml: 'ക്ഷേത്ര ഉത്സവങ്ങളെക്കുറിച്ച് പറയുക'
      }
    },
    {
      id: 'best-time',
      text: {
        en: 'When is the best time to visit Palakkad?',
        ml: 'പാലക്കാട് സന്ദർശിക്കാൻ ഏറ്റവും നല്ല സമയം എപ്പോഴാണ്?'
      }
    },
    {
      id: 'silent-valley',
      text: {
        en: 'Tell me about Silent Valley National Park',
        ml: 'സൈലന്റ് വാലി നാഷണൽ പാർക്കിനെക്കുറിച്ച് പറയുക'
      }
    }
  ];
  
  return (
    <div className="mb-4">
      <h3 className="text-sm text-gray-600 mb-2">
        {translations.suggestedQuestions}:
      </h3>
      <div className="flex flex-wrap gap-2">
        {quickReplies.map((reply) => (
          <button
            key={reply.id}
            onClick={() => onQuickReplyClick(reply.text[language])}
            className="text-sm bg-white border border-green-300 text-green-700 px-3 py-1.5 rounded-full hover:bg-green-50 transition-colors"
          >
            {reply.text[language]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickReplies;