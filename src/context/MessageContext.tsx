import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Message } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { processUserMessage } from '../utils/messageProcessor';
import { useLanguage } from './LanguageContext';

interface MessageContextType {
  messages: Message[];
  addUserMessage: (text: string) => void;
  isTyping: boolean;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { language, translations } = useLanguage();

  // Add welcome message on initial load
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: uuidv4(),
        text: translations.welcomeMessage,
        sender: 'bot',
        timestamp: new Date(),
        language
      };
      setMessages([welcomeMessage]);
    }
  }, [language, translations.welcomeMessage]);

  const addUserMessage = (text: string) => {
    if (!text.trim()) return;
    
    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date(),
      language
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot thinking
    setIsTyping(true);
    
    // Process the message and get a response
    setTimeout(() => {
      const botResponse = processUserMessage(text, language);
      const botMessage: Message = {
        id: uuidv4(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        language
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay to make it feel more natural
  };

  return (
    <MessageContext.Provider value={{ messages, addUserMessage, isTyping }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};