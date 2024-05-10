import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorLight: {
    color: theme.colors.textLight,
  },
  colorError: {
    color: theme.colors.textError,
  },
  colorBlue: {
    color: theme.colors.backgroundBlue,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  backgroundDark: {
    backgroundColor: theme.colors.backgroundDark,
  },
  backgroundWhite: {
    backgroundColor: theme.colors.backgroundWhite,
  },
  backgroundBlue: {
    backgroundColor: theme.colors.backgroundBlue,
  },
});

const Text = ({
  color,
  fontSize,
  fontWeight,
  backgroundColor,
  style,
  ...props
}) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'light' && styles.colorLight,
    color === 'error' && styles.colorError,
    color === 'blue' && styles.colorBlue,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    backgroundColor === 'dark' && styles.backgroundDark,
    backgroundColor === 'white' && styles.backgroundWhite,
    backgroundColor === 'blue' && styles.backgroundBlue,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
