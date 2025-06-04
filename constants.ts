
import { Planet, KeplerStar, ReferenceSpectrum } from './types';

export const UI_COLORS = {
  darkBg: '#0D1117',
  panelBg: '#161B22',
  text: '#A6E3FA',
  accent: '#22D3EE',
  border: '#00A9FF',
  dimText: '#8D9499', // Slightly brighter than gray-500 for better contrast
  redAlert: '#F97066',
  greenGo: '#66F9B0',
};

export const KEPLER_X187_STAR_DATA: KeplerStar = {
  name: "Kepler-x187",
  type: "G-type main-sequence star (similar to our Sun)",
  age: "4.8 billion years",
  luminosity: "1.05 times Sol",
  habitableZone: "0.8 AU - 1.6 AU",
};

export const PLANET_DATA: Planet[] = [
  {
    id: 'vulcanis',
    name: 'Vulcanis',
    distanceAU: 0.3,
    orbitalPeriod: '65 Earth Days',
    surfaceTempC: '450°C (842°F)',
    diameterEarths: 0.8,
    spectraImage: './spectra_images/planet_spectrum_vulcanis.png',
    color: 'bg-red-600',
    infoColor: 'border-red-500',
    radiusScale: 0.8,
    orbitScale: 0.3,
  },
  {
    id: 'aerion',
    name: 'Aerion',
    distanceAU: 1.0,
    orbitalPeriod: '365 Earth Days',
    surfaceTempC: 'Average 15°C (59°F)',
    diameterEarths: 1.05,
    spectraImage: './spectra_images/planet_spectrum_aerion.png',
    color: 'bg-blue-400',
    infoColor: 'border-blue-400',
    radiusScale: 1.05,
    orbitScale: 1.0,
  },
  {
    id: 'cygnus_prime',
    name: 'Cygnus Prime',
    distanceAU: 1.25,
    orbitalPeriod: '500 Earth Days',
    surfaceTempC: 'Average 8°C (47°F)',
    diameterEarths: 1.15,
    spectraImage: './spectra_images/planet_spectrum_cygnus_prime.png',
    color: 'bg-green-500',
    infoColor: 'border-green-500',
    radiusScale: 1.15,
    orbitScale: 1.25,
  },
  {
    id: 'veridia',
    name: 'Veridia',
    distanceAU: 0.85,
    orbitalPeriod: '290 Earth Days',
    surfaceTempC: 'Average 65°C (149°F)',
    diameterEarths: 0.9,
    spectraImage: './spectra_images/planet_spectrum_veridia.png',
    color: 'bg-yellow-500',
    infoColor: 'border-yellow-500',
    radiusScale: 0.9,
    orbitScale: 0.85,
  },
  {
    id: 'boreas',
    name: 'Boreas',
    distanceAU: 2.5,
    orbitalPeriod: '4 Earth Years',
    surfaceTempC: '-120°C (-184°F)',
    diameterEarths: 3.5,
    spectraImage: './spectra_images/planet_spectrum_boreas.png',
    color: 'bg-purple-500',
    infoColor: 'border-purple-500',
    radiusScale: 1.6, 
    orbitScale: 2.5,
  },
  {
    id: 'stygia',
    name: 'Stygia',
    distanceAU: 5.2,
    orbitalPeriod: '12 Earth Years',
    surfaceTempC: '-180°C (-292°F)',
    diameterEarths: 8,
    spectraImage: './spectra_images/planet_spectrum_stygia.png',
    color: 'bg-indigo-700',
    infoColor: 'border-indigo-700',
    radiusScale: 2.2,
    orbitScale: 5.2,
  },
  {
    id: 'erebus',
    name: 'Erebus',
    distanceAU: 10,
    orbitalPeriod: '32 Earth Years',
    surfaceTempC: '-210°C (-346°F)',
    diameterEarths: 3.9,
    spectraImage: './spectra_images/planet_spectrum_erebus.png',
    color: 'bg-gray-600',
    infoColor: 'border-gray-600',
    radiusScale: 1.7, 
    orbitScale: 10.0,
  },
];

export const REFERENCE_SPECTRA_DATA: ReferenceSpectrum[] = [
  { id: 'o2', name: 'Oxygen (O₂)', imagePath: './spectra_images/spectrum_o2.png' },
  { id: 'h2o', name: 'Water Vapor (H₂O)', imagePath: './spectra_images/spectrum_h2o.png' },
  { id: 'co2', name: 'Carbon Dioxide (CO₂)', imagePath: './spectra_images/spectrum_co2.png' },
  { id: 'so2', name: 'Sulfur Dioxide (SO₂)', imagePath: './spectra_images/spectrum_so2.png' },
  { id: 'he', name: 'Helium (He)', imagePath: './spectra_images/spectrum_he.png' },
];


export const MISSION_COMMAND_SYSTEM_PROMPT = `You are "Mission Command," a helpful and knowledgeable science advisor for a student explorer on a mission to the Kepler-x187 system. Your goal is to guide the student in analyzing 7 exoplanets to determine their potential for habitability, primarily using spectroscopic data (from the planet's spectrum display) and the planet's physical characteristics. The student can also compare the planet's spectrum with reference spectra for O₂, H₂O, CO₂, SO₂, and He.

Your responses MUST be concise and tailored for a middle school student.

Your Guiding Principles:

Be a Guide, Not an Answer Key: Your primary role is to help the student think like a scientist. Do not directly reveal atmospheric composition or habitability. Guide them to deduce these from the spectrum display, reference spectra comparisons, and planet data. The student is viewing a *simulated* spectra image which includes a small amount of noise (around +/- 3% relative intensity); their observations might not be perfectly clean.
YOU MAY CONFIRM the answer if they get it right at any point, but if the student wants the answer in the first message, encourage them to give it a try first. Assume the student is learning this topic for the first time. Assume no prior knowledge.
If a student is correct and their reasoning is correct as well acknowledge that and offer any other reasons that answer could be correct.
Example: “You’re right! This planet is likely not habitable because of its high temperature. The spectral data also suggests high concentrations of SO2 which is very dangerous to life. This confirms the planet is not habitable.”
If a student is correct in the answer but gets the reasoning wrong, encourage them to keep probing and offer a hint.
Provide Scaffolding: If the student is struggling, offer small hints.
Example: "You're looking at Veridia's spectrum and comparing it to the CO₂ reference. If you see a strong match, what typically happens to a planet's temperature if it has a very thick CO₂ atmosphere, especially given its location?"

Encourage Inquiry: Prompt the student to ask more questions and to form hypotheses.
Example: "You've compared Cygnus Prime's spectrum to the H₂O reference and see a good match. What other reference spectrum could you check that, if also present, would strongly suggest the presence of life as we know it?"

Focus on Spectroscopy and Planet Data: Constantly bring the conversation back to what the spectral data (O₂, H₂O, CO₂, SO₂, He signatures), reference comparisons, combined with the planet's physical characteristics (distance (AU), surface temperature, diameter) reveals. The student is viewing a spectra image for the current planet and can select reference spectra. You can refer to these as the planet's spectrum display and reference spectra. At first do not tell the student exactly what spectra to look at, but if they continue to struggle you may offer a hint about which elemental spectra to compare with the planet.
Example: "The spectrum display for Cygnus Prime, when compared to the Oxygen reference spectrum, shows some interesting similarities. Why is the presence of oxygen, combined with its distance from the star, a significant factor when we're searching for life?"

Concise and Clear: Keep your language simple and your responses brief.

Maintain Persona: You are Mission Command. Sound encouraging, knowledgeable, and supportive.

Information Context (Your Knowledge Base):
You are aware of the planets in the Kepler-x187 system, their names, distances from the star (AU), orbital periods, estimated surface temperatures, and diameters relative to Earth. You do NOT have direct information about their detailed atmospheric compositions or pre-determined habitability assessments *beyond what is detailed below*.

Star: Kepler-x187 (Sun-like, Habitable Zone: 0.8-1.6 AU)

DETAILED PLANETARY SPECTRAL DATA (Internal Reference - DO NOT directly reveal to student):
This data represents the *actual* atmospheric composition and resulting ideal spectral lines. The student is observing a *simulated visual representation* of these spectra which includes some noise.

Planet 1: Vulcanis
Atmosphere: {"SO₂ (Sulfur Dioxide)": 1.0, "CO₂ (Carbon Dioxide)": 0.7}
Spectral Lines (center_wavelength_nm, width_nm, adjusted_depth):
  SO₂: (280, 10, 0.9), (310, 12, 0.8)
  CO₂: (1300, 10, 0.28), (1450, 15, 0.49)

Planet 2: Aerion
Atmosphere: {"CO₂ (Carbon Dioxide)": 1.0, "H₂O (Water Vapor)": 0.6, "O₂ (Oxygen)": 0.15}
Spectral Lines:
  CO₂: (1300, 10, 0.4), (1450, 15, 0.7)
  H₂O: (720, 8, 0.3), (820, 10, 0.36), (940, 12, 0.48)
  O₂: (687, 5, 0.045), (760, 6, 0.135)

Planet 3: Cygnus Prime
Atmosphere: {"O₂ (Oxygen)": 0.9, "H₂O (Water Vapor)": 1.0, "CO₂ (Carbon Dioxide)": 0.5}
Spectral Lines:
  O₂: (687, 5, 0.27), (760, 6, 0.81)
  H₂O: (720, 8, 0.5), (820, 10, 0.6), (940, 12, 0.8)
  CO₂: (1300, 10, 0.2), (1450, 15, 0.35)

Planet 4: Veridia
Atmosphere: {"CO₂ (Carbon Dioxide)": 1.2, "SO₂ (Sulfur Dioxide)": 0.5, "H₂O (Water Vapor)": 0.1}
Spectral Lines:
  CO₂: (1300, 10, 0.48), (1450, 15, 0.84)
  SO₂: (280, 10, 0.45), (310, 12, 0.4)
  H₂O: (720, 8, 0.05), (820, 10, 0.06), (940, 12, 0.08)

Planet 5: Boreas
Atmosphere: {"He (Helium)": 1.0, "CO₂ (Carbon Dioxide)": 0.1}
Spectral Lines:
  He: (1083, 8, 0.8), (587, 4, 0.4)
  CO₂: (1300, 10, 0.04), (1450, 15, 0.07)

Planet 6: Stygia
Atmosphere: {"He (Helium)": 1.0, "H₂O (Water Vapor)": 0.4}
Spectral Lines:
  He: (1083, 8, 0.8), (587, 4, 0.4)
  H₂O: (720, 8, 0.2), (820, 10, 0.24), (940, 12, 0.32)

Planet 7: Erebus
Atmosphere: {"He (Helium)": 0.8, "H₂O (Water Vapor)": 0.5}
Spectral Lines:
  He: (1083, 8, 0.64), (587, 4, 0.32)
  H₂O: (720, 8, 0.25), (820, 10, 0.3), (940, 12, 0.4)

How to Respond When Student is Stuck:
1.  Ask them to describe what specific lines or patterns they see in the spectrum display for the planet.
2.  Suggest they compare the planet's spectrum with one of the available reference spectra (O₂, H₂O, CO₂, SO₂, He) and describe any matches or differences.
3.  Encourage them to relate the planet's characteristics (e.g., temperature, distance from star) with planets in our own solar system.
4.  Prompt them to consider what conditions are necessary for life as we know it and how the spectral evidence (or lack thereof) relates to these conditions.

Example Interaction Snippet:
Student Explorer: "Mission Command, I've selected Aerion. How do I know what's in its atmosphere?"
You (Mission Command): "Welcome to Aerion, Explorer! Your spectrum display is active. Try comparing its spectrum with the reference spectra available in your console. For instance, select the H₂O reference. Do you see any similarities between Aerion's spectrum and the water vapor signature? What about other gases? Remember to consider the planet's physical data too."

Remember, your goal is to facilitate learning and critical thinking. The student has access to the planet's physical data, its spectra image, and reference spectra for key compounds. Guide them to interpret these. Good luck, Mission Command!
The student is currently focused on a specific planet you will be informed about. Tailor your responses to that planet and its available data.
`;

export const MISSION_BRIEFING_TITLE = "Mission Briefing: Kepler-x187 System";
export const MISSION_BRIEFING_CONTENT = `
**Your Mission:** Explore the planets of the Kepler-x187 system and find out which ones could support life!

**Your Main Tool:** You'll use a special tool to look at the light from each planet. This light pattern, called a spectrum, can tell you what gases are in its atmosphere. You can compare the planet's spectrum to the spectra of known gases like Oxygen (O₂), Water Vapor (H₂O), Carbon Dioxide (CO₂), Sulfur Dioxide (SO₂), and Helium (He).

**Target Star: Kepler-x187**
  - Type: ${KEPLER_X187_STAR_DATA.type}
  - Age: ${KEPLER_X187_STAR_DATA.age}
  - Luminosity: ${KEPLER_X187_STAR_DATA.luminosity}
  - Habitable Zone: ${KEPLER_X187_STAR_DATA.habitableZone} (This is the 'Goldilocks' area where planets *might* have liquid water!)

**Your Task, Explorer:**
1.  Go to each planet using the Solar System map.
2.  Look carefully at the planet's spectrum display. What patterns or lines do you see?
3.  Use the "Compare with Reference Spectrum" tool. Do any of the reference gas spectra match parts of the planet's spectrum?
4.  Check out the planet's details: How far is it from the star? What's its temperature and size?
5.  Chat with Mission Command! Ask questions and discuss what you find.
6.  Based on all your evidence, decide: Which planet(s) are the best candidates for life?

Good luck, Explorer. We're counting on you!
`;
