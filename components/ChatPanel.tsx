
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { UI_COLORS } from '../constants';
import LoadingIcon from './LoadingIcon'; 

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  planetName: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSendMessage, isLoading, planetName }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Always scroll to bottom when messages, loading state, or planetName changes.
    // This ensures that reopening a planet view or new messages scroll into view.
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, planetName]); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[${UI_COLORS.darkBg}] rounded-lg"> {/* Ensure this takes full height from parent */}
      <div className={`p-3 border-b border-[${UI_COLORS.border}]`}>
        <h3 className={`text-xl font-semibold text-center text-[${UI_COLORS.accent}] text-shadow-cyan`}>Mission Command Terminal</h3>
        <p className={`text-xs text-center text-[${UI_COLORS.dimText}]`}>Current Focus: {planetName}</p>
      </div>

      <div ref={messagesContainerRef} className="flex-grow p-4 space-y-3 overflow-y-auto"> {/* This is the scrollable message area */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            role="logitem"
            aria-live={msg.sender === 'ai' || msg.sender === 'system' ? 'polite' : 'off'}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg shadow ${
                msg.sender === 'user'
                  ? `bg-[${UI_COLORS.accent}]/80 text-[${UI_COLORS.darkBg}] rounded-br-none`
                  : msg.sender === 'ai'
                  ? `bg-[${UI_COLORS.panelBg}] text-[${UI_COLORS.text}] border border-[${UI_COLORS.border}]/50 rounded-bl-none`
                  : `bg-red-700 text-white rounded-md border border-red-500 text-center w-full max-w-full` // System messages full width
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === 'user' ? 'text-right text-gray-700' 
                : msg.sender === 'ai' ? `text-left text-[${UI_COLORS.dimText}]/70` 
                : `text-center text-red-200`}`}>
                {msg.sender === 'ai' ? 'Mission Command' : msg.sender === 'user' ? 'Explorer' : 'System Message'} - {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start" role="status" aria-live="polite">
             <div className={`max-w-[80%] p-3 rounded-lg shadow bg-[${UI_COLORS.panelBg}] text-[${UI_COLORS.text}] border border-[${UI_COLORS.border}]/50 rounded-bl-none flex items-center space-x-2`}>
              <LoadingIcon />
              <span className="text-sm italic">Mission Command is processing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className={`p-3 border-t border-[${UI_COLORS.border}] flex items-center space-x-2 bg-[${UI_COLORS.panelBg}]`}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message to Mission Command..."
          aria-label="Message to Mission Command"
          className={`flex-grow p-2.5 bg-[${UI_COLORS.darkBg}] text-[${UI_COLORS.text}] border border-[${UI_COLORS.border}] rounded-md focus:outline-none focus:ring-2 focus:ring-[${UI_COLORS.accent}] placeholder-[${UI_COLORS.dimText}]`}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className={`px-5 py-2.5 bg-[${UI_COLORS.accent}] text-[${UI_COLORS.darkBg}] font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[${UI_COLORS.accent}] focus:ring-offset-2 focus:ring-offset-[${UI_COLORS.panelBg}]`}
          aria-label={isLoading ? "Sending message" : "Send message"}
        >
          {isLoading ? <LoadingIcon small={true}/> : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
