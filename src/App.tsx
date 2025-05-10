import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import { MessageProvider } from './context/MessageContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <MessageProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-green-100 text-gray-800">
          <Header />
          <main className="flex-1 flex flex-col w-full max-w-4xl mx-auto px-4">
            <ChatInterface />
          </main>
        </div>
      </MessageProvider>
    </LanguageProvider>
  );
}

export default App;