import React, { useState, useEffect } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { Provider as PaperProvider, DarkTheme, DefaultTheme } from 'react-native-paper';

const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  return (
    <PaperProvider theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      {children}
    </PaperProvider>
  );
};

export default ThemeProvider;

