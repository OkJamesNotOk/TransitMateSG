const WEATHER_COLORS = {
  weatherClear: '#87CEEB',
  weatherPartlyCloudy: '#A7C7E7',
  weatherCloudy: '#94A3B8',
  weatherRain: '#64748B',
  weatherThunderstorm: '#475569',
}

const THEMES = {
  dark: {
    background: '#0F172A',
    lighterbackground: '#233a6a',
    card: '#1E293B',
    cardLight: '#313c4d',
    text: '#F8FAFC',
    secondaryText: '#94A3B8',
    border: '#334155',
    accent: '#38BDF8',
    onAccent: '#0F172A',
    ...WEATHER_COLORS,
  },

  light:{
    background: '#F8FAFC',
    lighterbackground: '#E2E8F0',
    card: '#FFFFFF',
    cardLight: '#F1F5F9',
    text: '#0F172A',
    secondaryText: '#475569',
    border: '#CBD5E1',
    accent: '#0369A1',
    onAccent: '#FFFFFF',
    ...WEATHER_COLORS,
  },

  midnight: {
    background: '#09090B',
    lighterbackground: '#27272A',
    card: '#18181B',
    cardLight: '#303036',
    text: '#FAFAFA',
    secondaryText: '#A1A1AA',
    border: '#3F3F46',
    accent: '#A78BFA',
    onAccent: '#09090B',
    ...WEATHER_COLORS,
  },
}

// use dark theme default
const COLORS = THEMES.dark;

export { THEMES };

export default COLORS;