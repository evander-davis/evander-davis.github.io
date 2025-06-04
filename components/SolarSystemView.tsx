
import React from 'react';
import { Planet } from '../types';
import { UI_COLORS, KEPLER_X187_STAR_DATA } from '../constants';

interface SolarSystemViewProps {
  planets: Planet[];
  onSelectPlanet: (planet: Planet) => void;
}

// Hardcoded angles for each planet in degrees, corresponding to PLANET_DATA order
const PLANET_FIXED_ANGLES: number[] = [
  10,  // Vulcanis
  60,  // Aerion
  110, // Cygnus Prime
  170, // Veridia
  230, // Boreas
  290, // Stygia
  340  // Erebus
];

const SolarSystemView: React.FC<SolarSystemViewProps> = ({ planets, onSelectPlanet }) => {
  // Function to get adjusted visual orbit scale for better spacing of inner planets
  const getVisualOrbitScale = (planet: Planet): number => {
    switch (planet.id) {
      case 'vulcanis': return 0.5; 
      case 'veridia': return 0.8;  
      case 'aerion': return 1.05;   
      case 'cygnus_prime': return 1.3; 
      default: return planet.orbitScale;
    }
  };

  const visualOrbitScales = planets.map(getVisualOrbitScale);
  const maxVisualOrbitScale = Math.max(...visualOrbitScales, 1) * 1.1; // Add some padding

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 bg-[${UI_COLORS.darkBg}] rounded-lg`}>
      <h2 className={`text-3xl font-bold text-[${UI_COLORS.accent}] mb-8 text-shadow-cyan`}>{KEPLER_X187_STAR_DATA.name} System Overview</h2>
      <div className="relative w-[calc(100vmin-100px)] max-w-[800px] aspect-square flex items-center justify-center">
        {/* Star */}
        <div
            className={`absolute w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_10px_2px_rgba(250,204,21,0.7)] flex items-center justify-center`}
            title={KEPLER_X187_STAR_DATA.name}
        >
          <span className="sr-only">{KEPLER_X187_STAR_DATA.name}</span>
        </div>

        {/* Orbits and Planets */}
        {planets.map((planet, index) => {
          const visualOrbit = getVisualOrbitScale(planet);
          const orbitSizePercentage = (visualOrbit / maxVisualOrbitScale) * 100;
          const planetSize = planet.radiusScale * 10 + 6;

          // Use the hardcoded angle from PLANET_FIXED_ANGLES array
          const angle = PLANET_FIXED_ANGLES[index];

          const x = Math.cos(angle * Math.PI / 180) * (orbitSizePercentage / 2);
          const y = Math.sin(angle * Math.PI / 180) * (orbitSizePercentage / 2);

          return (
            <React.Fragment key={planet.id}>
              {/* Orbit Path (visual only) */}
              <div
                className="absolute border border-dashed border-white/40 rounded-full pointer-events-none"
                style={{
                  width: `${orbitSizePercentage}%`,
                  height: `${orbitSizePercentage}%`,
                  left: `${50 - orbitSizePercentage / 2}%`,
                  top: `${50 - orbitSizePercentage / 2}%`,
                }}
              ></div>
              {/* Planet */}
              <button
                onClick={() => onSelectPlanet(planet)}
                title={`Select ${planet.name}`}
                aria-label={`Explore planet ${planet.name}`}
                className={`absolute ${planet.color} rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-offset-[${UI_COLORS.darkBg}] hover:ring-[${UI_COLORS.accent}] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[${UI_COLORS.darkBg}] focus:ring-[${UI_COLORS.accent}]`}
                style={{
                  width: `${planetSize}px`,
                  height: `${planetSize}px`,
                  left: `calc(50% + ${x}%)`,
                  top: `calc(50% + ${y}%)`,
                  boxShadow: `0 0 8px ${planet.color.replace('bg-','').split('-')[0]}-500`
                }}
              >
                <span className="text-xs text-white font-medium sr-only">{planet.name.substring(0,1)}</span>
              </button>
            </React.Fragment>
          );
        })}
      </div>
      <p className={`mt-8 text-sm text-[${UI_COLORS.dimText}]`}>Click on a planet orb or its name below to begin analysis.</p>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {planets.map(p => {
            const textColorClass = p.color.replace('bg-', 'text-'); 
            const borderColorClass = p.color.replace('bg-', 'border-') + '-500'; 
            const hoverBgClass = p.color.replace('bg-', 'hover:bg-') + '-700'; 

            return (
                <button
                    key={`label-${p.id}`}
                    onClick={() => onSelectPlanet(p)}
                    className={`p-1.5 text-xs font-medium ${textColorClass} ${borderColorClass} border rounded ${hoverBgClass} hover:bg-opacity-40 hover:text-white transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-[${UI_COLORS.accent}]`}
                >
                    {p.name}
                </button>
            );
        })}
      </div>
    </div>
  );
};

export default SolarSystemView;