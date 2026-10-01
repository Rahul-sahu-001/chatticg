import React, { useState, useRef, useEffect } from 'react';
import { chatService } from '../../services/chatService';
import { ChatMessage } from '../../types';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Globe,
  CornerDownLeft,
  ChevronDown
} from 'lucide-react';

export const DharoharAIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi' | 'ch'>('en');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    chatService.processQuery('hello', 'en')
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      language,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = chatService.processQuery(query, language);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  const handleLanguageChange = (newLang: 'en' | 'hi' | 'ch') => {
    setLanguage(newLang);
    const greeting = chatService.processQuery('hello', newLang);
    setMessages(prev => [...prev, greeting]);
  };

  return (
    <div className='fixed bottom-6 right-6 z-50'>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className='relative group p-4 rounded-full bg-gradient-to-r from-[#E5A93C] to-[#C2593F] text-[#07131D] shadow-2xl shadow-[#E5A93C]/40 border-2 border-white/20 hover:scale-110 transition-transform duration-300 flex items-center justify-center cursor-pointer'
          title='Ask Dharohar AI Assistant'
        >
          <Sparkles className='w-6 h-6 animate-pulse' />
          <span className='absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#07131D]' />
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div className='relative w-[360px] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl glass-panel-warm border border-[#E5A93C]/40 bg-[#07131D]/98 text-white shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300'>
          {/* Header */}
          <div className='p-4 border-b border-white/10 flex items-center justify-between bg-black/40'>
            <div className='flex items-center gap-3'>
              <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-[#E5A93C] to-[#C2593F] flex items-center justify-center text-[#07131D] shadow-md'>
                <Bot className='w-5 h-5' />
              </div>
              <div>
                <h4 className='font-serif text-base font-bold text-white flex items-center gap-1.5'>
                  <span>Dharohar AI</span>
                  <span className='w-2 h-2 rounded-full bg-emerald-400' />
                </h4>
                <span className='text-[10px] font-mono text-[#F3BA54] block leading-tight'>
                  Multilingual Smart Tourism Assistant
                </span>
              </div>
            </div>

            <div className='flex items-center gap-1'>
              {/* Language Switcher */}
              <div className='flex items-center bg-white/10 rounded-xl p-1 text-[11px] font-mono'>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-2 py-0.5 rounded-lg transition-colors ${
                    language === 'en' ? 'bg-[#E5A93C] text-[#07131D] font-bold' : 'text-gray-300'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('hi')}
                  className={`px-2 py-0.5 rounded-lg transition-colors ${
                    language === 'hi' ? 'bg-[#E5A93C] text-[#07131D] font-bold' : 'text-gray-300'
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => handleLanguageChange('ch')}
                  className={`px-2 py-0.5 rounded-lg transition-colors ${
                    language === 'ch' ? 'bg-[#E5A93C] text-[#07131D] font-bold' : 'text-gray-300'
                  }`}
                >
                  छ.ग.
                </button>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className='p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer'
              >
                <X className='w-5 h-5' />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className='flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4 text-xs leading-relaxed'>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className='w-7 h-7 rounded-lg bg-[#E5A93C]/20 border border-[#E5A93C]/40 flex items-center justify-center text-[#F3BA54] flex-shrink-0 mt-0.5'>
                    <Bot className='w-4 h-4' />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#E5A93C] to-[#C2593F] text-[#07131D] font-medium rounded-tr-none shadow-md'
                      : 'glass-panel border border-white/10 text-gray-200 rounded-tl-none space-y-2'
                  }`}
                >
                  <div className='whitespace-pre-line prose prose-invert prose-xs'>
                    {msg.text}
                  </div>
                  <span
                    className={`text-[9px] font-mono block text-right mt-1 ${
                      msg.sender === 'user' ? 'text-black/60' : 'text-gray-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className='flex items-center gap-2 text-gray-400 text-xs font-mono pl-9'>
                <span className='w-2 h-2 rounded-full bg-[#E5A93C] animate-bounce' />
                <span className='w-2 h-2 rounded-full bg-[#E5A93C] animate-bounce [animation-delay:0.2s]' />
                <span className='w-2 h-2 rounded-full bg-[#E5A93C] animate-bounce [animation-delay:0.4s]' />
                <span>Dharohar AI is curating...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className='px-3 py-2 bg-black/40 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar'>
            {[
              '3 days in Bastar under ₹8000',
              'What local food to try?',
              'Least crowded destinations',
              'What is Dharohar Pass?'
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className='px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-[11px] font-mono text-gray-300 hover:text-white whitespace-nowrap transition-colors border border-white/5 cursor-pointer'
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className='p-3 border-t border-white/10 bg-black/60 flex items-center gap-2'>
            <input
              type='text'
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder={
                language === 'hi'
                  ? 'छत्तीसगढ़ पर्यटन के बारे में कुछ भी पूछें...'
                  : language === 'ch'
                  ? 'बस्तर अउ छत्तीसगढ़ के बारे म पूछव...'
                  : 'Ask about Bastar, Chitrakote, food, stays...'
              }
              className='flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-gray-400 outline-none focus:border-[#E5A93C] transition-colors'
            />
            <button
              onClick={() => handleSend()}
              className='p-2.5 rounded-2xl bg-[#E5A93C] hover:bg-[#F3BA54] text-[#07131D] transition-transform hover:scale-105 cursor-pointer'
            >
              <Send className='w-4 h-4' />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
