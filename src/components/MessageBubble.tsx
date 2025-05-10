import React from 'react';
import { Message } from '../types';
import { ExternalLink } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  // Replace URLs with clickable links and handle attraction cards
  const formatMessage = (text: string) => {
    // Check if this is a special attraction card format
    if (text.includes('::ATTRACTION::') || text.includes('::FESTIVAL::')) {
      return renderCard(text);
    }

    // Replace URLs with anchor tags
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={i}
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center"
          >
            {part} <ExternalLink size={14} className="ml-1" />
          </a>
        );
      }
      return part;
    });
  };

  const renderCard = (text: string) => {
    // For attraction cards
    if (text.includes('::ATTRACTION::')) {
      try {
        const [, cardData] = text.split('::ATTRACTION::');
        const attraction = JSON.parse(cardData);
        
        return (
          <div className="bg-green-50 rounded-lg p-3 border border-green-200 mt-2">
            {attraction.image && (
              <div className="w-full h-48 overflow-hidden rounded-lg mb-3">
                <img 
                  src={attraction.image} 
                  alt={attraction.name} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <h3 className="font-bold text-lg text-green-800">{attraction.name}</h3>
            <p className="text-gray-700 my-2">{attraction.description}</p>
            {attraction.bestTimeToVisit && (
              <div className="text-sm text-gray-600 mt-2">
                <span className="font-semibold">Best time to visit:</span> {attraction.bestTimeToVisit}
              </div>
            )}
            {attraction.location && (
              <div className="text-sm text-gray-600 flex items-center mt-1">
                <span className="font-semibold mr-1">Location:</span> {attraction.location}
              </div>
            )}
          </div>
        );
      } catch (e) {
        return text;
      }
    }
    
    // For festival cards
    if (text.includes('::FESTIVAL::')) {
      try {
        const [, cardData] = text.split('::FESTIVAL::');
        const festival = JSON.parse(cardData);
        
        return (
          <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200 mt-2">
            {festival.image && (
              <div className="w-full h-48 overflow-hidden rounded-lg mb-3">
                <img 
                  src={festival.image} 
                  alt={festival.name} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <h3 className="font-bold text-lg text-yellow-800">{festival.name}</h3>
            <p className="text-gray-700 my-2">{festival.description}</p>
            {festival.timing && (
              <div className="text-sm text-gray-600 mt-2">
                <span className="font-semibold">When:</span> {festival.timing}
              </div>
            )}
            {festival.location && (
              <div className="text-sm text-gray-600 flex items-center mt-1">
                <span className="font-semibold mr-1">Location:</span> {festival.location}
              </div>
            )}
          </div>
        );
      } catch (e) {
        return text;
      }
    }
    
    return text;
  };

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
      style={{animationDelay: '0.1s'}}
    >
      <div 
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-green-600 text-white rounded-tr-none' 
            : 'bg-gray-100 text-gray-800 rounded-tl-none'
        }`}
      >
        <div className="text-sm md:text-base whitespace-pre-wrap break-words">
          {formatMessage(message.text)}
        </div>
        <div 
          className={`text-xs mt-1 ${
            isUser ? 'text-green-100' : 'text-gray-500'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;