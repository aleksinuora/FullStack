import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    backgroundDark: '#24292e',
    backgroundLight: '#e1e4e8',
    backgroundWhite: '#ffffff',
    backgroundBlue: '#247bd1',
    backgroundMain: '#e1e4e8',
    textLight: '#e1e4e8',
    textError: '',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
