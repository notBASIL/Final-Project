import React, { useState } from 'react';
import { View, Switch } from 'react-native';
import { useTheme } from 'react-native-paper';

const AppMainComponent = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { colors, dark } = useTheme();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      {/* Your app content goes here */}
      <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
    </View>
  );
};

export default AppMainComponent;