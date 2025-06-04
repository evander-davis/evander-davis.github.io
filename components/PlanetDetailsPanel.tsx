
import React, { useState } from 'react';
import { Planet, ReferenceSpectrum } from '../types';
import { UI_COLORS, REFERENCE_SPECTRA_DATA } from '../constants';

interface PlanetDetailsPanelProps {
  planet: Planet;
}

const DetailItem: React.FC<{ label: string; value: string | string[] | number }> = ({ label, value }) => (
  <div className="py-1">
    <span className={`font-semibold text-[${UI_COLORS.accent}]`}>{label}: </span>
    <span className={`text-[${UI_COLORS.text}] text-xs sm:text-sm`}>{String(value)}</span>
  </div>
);

const PlanetDetailsPanel: React.FC<PlanetDetailsPanelProps> = ({ planet }) => {
  const [selectedReferenceId, setSelectedReferenceId] = useState<string | null>(null);

  const handleReferenceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedReferenceId(event.target.value === "" ? null : event.target.value);
  };

  const currentReferenceSpectrum = REFERENCE_SPECTRA_DATA.find(spec => spec.id === selectedReferenceId);

  // Construct the correct text color class, e.g., "text-red-500" from "border-red-500"
  const planetTextColorClass = planet.infoColor.replace('border-', 'text-');

  return (
    <div className={`p-2 sm:p-3 rounded-lg border-2 ${planet.infoColor} bg-[${UI_COLORS.panelBg}]/50 shadow-md h-full flex flex-col`}>
      <h2 className={`text-xl sm:text-2xl font-bold ${planetTextColorClass} mb-2 text-shadow-cyan`}>{planet.name} - Physical Data</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-0.5 text-sm mb-2">
        <DetailItem label="Distance" value={`${planet.distanceAU} AU`} />
        <DetailItem label="Orbital Period" value={planet.orbitalPeriod} />
        <DetailItem label="Surface Temp" value={planet.surfaceTempC} />
        <DetailItem label="Diameter" value={`${planet.diameterEarths} (Earth=1)`} />
      </div>

      {/* Planet's Spectrum Display */}
      <div className="mt-1 pt-2 border-t border-[${UI_COLORS.border}]/50">
        <h3 className={`text-md sm:text-lg font-semibold text-[${UI_COLORS.accent}] mb-1.5`}>Planetary Spectrum Display</h3>
        <div className="aspect-[16/9] bg-black rounded overflow-hidden border border-[${UI_COLORS.border}]/30 mb-1">
          {planet.spectraImage ? (
            <img 
              src={planet.spectraImage} 
              alt={`Spectra for ${planet.name}`} 
              className="w-full h-full object-contain" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">Planet spectra data not available.</div>
          )}
        </div>
        <p className={`text-xs text-center text-[${UI_COLORS.dimText}]`}>Simulated spectroscopic signature for {planet.name}.</p>
      </div>

      {/* Reference Spectrum Comparison Section */}
      <div className="mt-3 pt-2 border-t border-[${UI_COLORS.border}]/50 flex-grow flex flex-col">
        <h3 className={`text-md sm:text-lg font-semibold text-[${UI_COLORS.accent}] mb-1.5`}>Compare with Reference</h3>
        <div className="mb-2">
          <label htmlFor="reference-select" className={`block text-xs sm:text-sm font-medium text-[${UI_COLORS.dimText}] mb-1`}>Select reference gas:</label>
          <select
            id="reference-select"
            value={selectedReferenceId || ""}
            onChange={handleReferenceChange}
            className={`w-full p-1.5 sm:p-2 bg-[${UI_COLORS.darkBg}] text-[${UI_COLORS.text}] border border-[${UI_COLORS.border}] rounded-md focus:outline-none focus:ring-2 focus:ring-[${UI_COLORS.accent}] placeholder-[${UI_COLORS.dimText}] text-xs sm:text-sm`}
          >
            <option value="">-- Select Reference --</option>
            {REFERENCE_SPECTRA_DATA.map(spec => (
              <option key={spec.id} value={spec.id}>{spec.name}</option>
            ))}
          </select>
        </div>

        {currentReferenceSpectrum && (
          <div className="mt-1 flex-grow flex flex-col">
            <h4 className={`text-sm sm:text-md font-semibold text-[${UI_COLORS.accent}]/90 mb-1`}>Reference: {currentReferenceSpectrum.name}</h4>
            <div className="aspect-[16/9] bg-black rounded overflow-hidden border border-[${UI_COLORS.border}]/30 mb-1 flex-grow">
              <img 
                src={currentReferenceSpectrum.imagePath} 
                alt={`Reference spectra for ${currentReferenceSpectrum.name}`} 
                className="w-full h-full object-contain" 
              />
            </div>
            <p className={`text-xs text-center text-[${UI_COLORS.dimText}]`}>Reference signature for {currentReferenceSpectrum.name}.</p>
          </div>
        )}
         {!currentReferenceSpectrum && (
            <div className="w-full h-20 flex-grow flex items-center justify-center text-xs sm:text-sm text-[${UI_COLORS.dimText}] bg-[${UI_COLORS.darkBg}]/50 rounded border border-dashed border-[${UI_COLORS.border}]/30">
                Select a gas to view its reference spectrum.
            </div>
        )}
      </div>
    </div>
  );
};

export default PlanetDetailsPanel;
