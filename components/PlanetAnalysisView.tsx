
import React from 'react';
import { Planet, ChatMessage } from '../types';
import { UI_COLORS } from '../constants';
import ChatPanel from './ChatPanel';
import PlanetDetailsPanel from './PlanetDetailsPanel';

interface PlanetAnalysisViewProps {
  planet: Planet;
  onBack: () => void;
  chatMessages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isAiTyping: boolean;
}

const PlanetAnalysisView: React.FC<PlanetAnalysisViewProps> = ({
  planet,
  onBack,
  chatMessages,
  onSendMessage,
  isAiTyping,
}) => {
  return (
    <div className={`w-full h-full flex flex-col lg:flex-row gap-1 md:gap-2 p-1 md:p-2 bg-[${UI_COLORS.panelBg}] border-x-0 sm:border-x border-y sm:border-y-0 border-[${UI_COLORS.border}] sm:rounded-lg shadow-xl`}>
      {/* Left Panel: Planet Details & Spectra */}
      {/* flex-1 allows it to take remaining space on lg, min-w-0 prevents it from pushing other content */}
      <div className="flex-1 lg:w-2/5 flex flex-col space-y-2 p-1 md:p-2 rounded-lg bg-[${UI_COLORS.darkBg}] border border-[${UI_COLORS.border}]/50 overflow-y-auto min-w-0">
        <button
            onClick={onBack}
            className={`self-start mb-1 px-3 py-1.5 bg-[${UI_COLORS.accent}] text-[${UI_COLORS.darkBg}] font-semibold rounded hover:opacity-80 transition-opacity text-xs sm:text-sm sticky top-0 z-10 bg-opacity-90 backdrop-blur-sm`}
          >
            &lt; Back to Solar System
        </button>
        <PlanetDetailsPanel planet={planet} />
      </div>

      {/* Right Panel: Chat with Mission Command */}
      {/* On large screens, takes 3/5ths of width. On smaller, it will stack and take full width. */}
      <div className="lg:w-3/5 flex flex-col p-1 rounded-lg bg-[${UI_COLORS.darkBg}] border border-[${UI_COLORS.border}]/50 overflow-hidden">
        <ChatPanel
          messages={chatMessages}
          onSendMessage={onSendMessage}
          isLoading={isAiTyping}
          planetName={planet.name}
        />
      </div>
    </div>
  );
};

export default PlanetAnalysisView;
