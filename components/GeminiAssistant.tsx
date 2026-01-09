
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { generateNYSCAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hello Corper! I can help you with questions about Camp, PPA, CDS, or Clearance. What do you need to know?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Lock body scroll on mobile when chat is open
      if (window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const advice = await generateNYSCAdvice(inputText);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: advice,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`fixed z-[100] transition-all duration-300 ${
      isOpen ? 'inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-96' : 'bottom-6 right-6 w-14 h-14'
    }`}>
      {/* Chat Window */}
      <div 
        className={`bg-white shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right h-full border border-gray-100 ${
          isOpen ? 'opacity-100 scale-100 rounded-none md:rounded-[2rem] md:h-[600px]' : 'opacity-0 scale-95 h-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-brand-primary px-6 py-5 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-widest leading-none mb-0.5">NYSC Helper</h3>
              <p className="text-[10px] font-bold text-green-100 uppercase tracking-widest opacity-80">Online & Ready</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gray-50 scrollbar-hide">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-[1.5rem] px-5 py-3.5 text-sm font-medium shadow-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-brand-primary text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-[1.5rem] rounded-bl-none px-6 py-4 shadow-sm">
                <Loader2 className="h-5 w-5 animate-spin text-brand-primary" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 md:p-6 bg-white border-t border-gray-100 pb-safe">
          <div className="flex items-center space-x-3 bg-gray-50 rounded-[1.5rem] px-5 py-2.5 border border-gray-100 focus-within:ring-4 focus-within:ring-green-50 focus-within:border-brand-primary transition-all">
            <textarea
              rows={1}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your question..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm font-bold text-gray-700 py-2 resize-none max-h-32"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={!inputText.trim() || isLoading}
              className={`p-3 rounded-xl transition-all ${
                inputText.trim() ? 'bg-brand-primary text-white shadow-lg' : 'bg-gray-200 text-gray-400'
              }`}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button (Hidden when chat is open on mobile to avoid overlap) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 h-16 w-16 bg-brand-primary hover:bg-green-700 text-white rounded-2xl shadow-2xl flex items-center justify-center transition-all hover:scale-105 hover:-rotate-6 active:scale-95 ${
          isOpen ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <MessageCircle className="h-8 w-8" />
      </button>
    </div>
  );
};

export default GeminiAssistant;
