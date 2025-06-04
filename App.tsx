
import React, { useState, useEffect, useCallback } from 'react';
import { Planet, ViewState, ChatMessage } from './types';
import { PLANET_DATA, MISSION_BRIEFING_TITLE, MISSION_BRIEFING_CONTENT, UI_COLORS, KEPLER_X187_STAR_DATA } from './constants';
import Modal from './components/Modal';
import MissionBriefingContent from './components/MissionBriefingContent';
import SolarSystemView from './components/SolarSystemView';
import PlanetAnalysisView from './components/PlanetAnalysisView';
import {sendMessageToGemini, initChatWithSystemPrompt} from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.SolarSystem);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [showBriefing, setShowBriefing] = useState<boolean>(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);

   useEffect(() => {
    if (!process.env.API_KEY && !localStorage.getItem('gemini_api_key_dismissed')) {
      console.warn("API_KEY environment variable is not set. Gemini API calls may fail.");
    }
    if (!showBriefing) {
        initChatWithSystemPrompt().catch(error => {
            console.error("Initial chat initialization failed:", error);
        });
    }
  }, [showBriefing]);

  const handleCloseBriefing = () => {
    setShowBriefing(false);
    initChatWithSystemPrompt().catch(error => {
        console.error("Chat initialization failed after briefing:", error);
        setChatMessages(prev => [...prev, {
            id: Date.now().toString(),
            sender: 'system',
            text: `Mission Command connection issue: ${error instanceof Error ? error.message : 'Unknown error'}. Some features might be affected.`,
            timestamp: Date.now()
        }]);
    });
  };

  const handleSelectPlanet = useCallback(async (planet: Planet) => {
    setSelectedPlanet(planet);
    setCurrentView(ViewState.PlanetAnalysis);
    setIsAiTyping(true);
    try {
      await initChatWithSystemPrompt();
      const greeting = `Mission Command: Now focusing on ${planet.name}. Your spectrum display is active. What are your initial observations regarding its spectra and physical data (distance, temperature, etc.)?`;
      setChatMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        sender: 'ai',
        text: greeting, 
        timestamp: Date.now() 
      }]);
    } catch (error) {
      console.error("Error setting planet focus or initial greeting:", error);
      const errorMessageText = error instanceof Error && error.message.includes("API_KEY_MISSING")
        ? "Mission Command cannot be reached. Please ensure the API_KEY is correctly configured."
        : `Error connecting to Mission Command for ${planet.name}. Please check your connection.`;
      setChatMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        sender: 'system', 
        text: errorMessageText,
        timestamp: Date.now() 
      }]);
    } finally {
      setIsAiTyping(false);
    }
  }, []);

  const handleBackToSolarSystem = () => {
    setCurrentView(ViewState.SolarSystem);
    setChatMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'system',
        text: "Returning to Solar System Overview.",
        timestamp: Date.now()
    }]);
  };

  const handleSendMessage = async (userMessage: string) => {
    if (!selectedPlanet || isAiTyping) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userMessage,
      timestamp: Date.now(),
    };
    setChatMessages(prev => [...prev, newUserMessage]);
    setIsAiTyping(true);

    try {
      const aiResponseText = await sendMessageToGemini(userMessage, selectedPlanet);
      const newAiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: Date.now(),
      };
      setChatMessages(prev => [...prev, newAiMessage]);
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'system',
        text: `Mission Command is experiencing technical difficulties. Please try again later. (Error: ${error instanceof Error ? error.message : 'Unknown error'})`,
        timestamp: Date.now(),
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAiTyping(false);
    }
  };
  
  const mainContentClasses = currentView === ViewState.PlanetAnalysis && selectedPlanet && !showBriefing
    ? "flex-grow flex flex-col p-1 sm:p-2 overflow-hidden" // Maximize space for PlanetAnalysisView
    : "flex-grow flex flex-col items-center justify-center p-4 overflow-hidden"; // Default for SolarSystemView and briefing

  return (
    <div className={`min-h-screen flex flex-col bg-[${UI_COLORS.darkBg}] text-[${UI_COLORS.text}] font-sans selection:bg-[${UI_COLORS.accent}] selection:text-[${UI_COLORS.darkBg}]`}>
      <header className={`p-4 border-b border-[${UI_COLORS.border}] shadow-lg bg-[${UI_COLORS.panelBg}]`}>
        <h1 className="text-3xl font-bold text-center text-shadow-cyan">Kepler-x187 Exoplanet Explorer</h1>
        <p className="text-center text-sm text-[${UI_COLORS.dimText}]">Star: {KEPLER_X187_STAR_DATA.name} | Habitable Zone: {KEPLER_X187_STAR_DATA.habitableZone}</p>
      </header>

      {showBriefing && (
        <Modal title={MISSION_BRIEFING_TITLE} onClose={handleCloseBriefing}>
          <MissionBriefingContent content={MISSION_BRIEFING_CONTENT} onConfirm={handleCloseBriefing} />
        </Modal>
      )}

      <main className={mainContentClasses}>
        {currentView === ViewState.SolarSystem && !showBriefing && (
          <SolarSystemView planets={PLANET_DATA} onSelectPlanet={handleSelectPlanet} />
        )}
        {currentView === ViewState.PlanetAnalysis && selectedPlanet && !showBriefing && (
          <PlanetAnalysisView
            planet={selectedPlanet}
            onBack={handleBackToSolarSystem}
            chatMessages={chatMessages}
            onSendMessage={handleSendMessage}
            isAiTyping={isAiTyping}
          />
        )}
      </main>
      <footer className={`p-3 text-center text-xs text-[${UI_COLORS.dimText}] border-t border-[${UI_COLORS.border}] bg-[${UI_COLORS.panelBg}]`}>
        Simulated Exoplanetary Mission | Data Interpretation Exercise
      </footer>
    </div>
  );
};

export default App;