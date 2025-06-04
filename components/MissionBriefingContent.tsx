
import React from 'react';
import { UI_COLORS } from '../constants';

interface MissionBriefingContentProps {
  content: string;
  onConfirm: () => void;
}

const MissionBriefingContent: React.FC<MissionBriefingContentProps> = ({ content }) => {
  // Split content by newline and render paragraphs or list items
  const formattedContent = content.split('\n').map((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
      return <h3 key={index} className={`text-lg font-semibold text-[${UI_COLORS.accent}] mt-3 mb-1`}>{trimmedLine.slice(2, -2)}</h3>;
    }
    if (trimmedLine.startsWith('- ')) {
      return <li key={index} className={`ml-4 list-disc list-outside text-[${UI_COLORS.text}]`}>{trimmedLine.slice(2)}</li>;
    }
    if (trimmedLine.startsWith(String.fromCharCode(160)) || trimmedLine.length === 0) { // Non-breaking space or empty
        return <div key={index} className="h-2"></div>; // Spacer for empty lines
    }
    return <p key={index} className={`my-1 text-[${UI_COLORS.text}]`}>{trimmedLine}</p>;
  });

  return (
    <div className={`text-sm leading-relaxed text-[${UI_COLORS.dimText}] space-y-2`}>
      {formattedContent}
    </div>
  );
};

export default MissionBriefingContent;
