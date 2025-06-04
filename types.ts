
export interface Planet {
  id: string;
  name: string;
  distanceAU: number;
  orbitalPeriod: string; // e.g., "65 Earth Days"
  surfaceTempC: string; // e.g., "450°C (842°F)" or "Average 15°C (59°F)"
  diameterEarths: number;
  spectraImage: string; // URL to the spectra image
  color: string; // For visualization in solar system view
  infoColor: string; // For planet card border/accent
  radiusScale: number; // Relative size for solar system view
  orbitScale: number; // Relative distance for solar system view
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: number;
}

export enum ViewState {
  Briefing,
  SolarSystem,
  PlanetAnalysis,
}

export interface KeplerStar {
  name: string;
  type: string;
  age: string;
  luminosity: string;
  habitableZone: string;
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web: GroundingChunkWeb;
}

export interface ReferenceSpectrum {
  id: string;
  name: string;
  imagePath: string;
}
