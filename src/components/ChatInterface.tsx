import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowDown } from 'lucide-react';
import MessageBubble from './MessageBubble';
import QuickReplies from './QuickReplies';
import { useMessages } from '../context/MessageContext';
import { useLanguage } from '../context/LanguageContext';
import TypingIndicator from './TypingIndicator';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const { messages, addUserMessage, isTyping } = useMessages();
  const { translations } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle scroll events
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (!chatContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    };

    chatContainer.addEventListener('scroll', handleScroll);
    return () => chatContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addUserMessage(input);
      setInput('');
    }
  };

  const handleQuickReplyClick = (text: string) => {
    addUserMessage(text);
  };

  return (
    <div className="flex flex-col h-full py-4 flex-1">
      <div 
        id="chat-container"
        className="flex-1 overflow-y-auto px-2 md:px-4 py-4 mb-4 rounded-lg bg-white shadow-md"
      >
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick reply suggestions */}
      <QuickReplies onQuickReplyClick={handleQuickReplyClick} />

      {/* Input area */}
      <form onSubmit={handleSubmit} className="relative mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={translations.inputPlaceholder}
          className="w-full p-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
          disabled={input.trim() === ''}
        >
          <Send size={18} />
        </button>
      </form>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-24 right-6 bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-700 transition-colors animate-bounce"
        >
          <ArrowDown size={18} />
        </button>
      )}
    </div>
  );
};

export default ChatInterface;