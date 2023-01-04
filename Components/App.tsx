import { useColorScheme, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MuddTheme from '../theme/mudd.json';
import Main from './Main';
import { AppDataContext } from '../contexts';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>();
  const [useUserTheme, setUseUserTheme] = useState(false);
  const scheme = useColorScheme();

  useEffect(() => {
    setTheme();
  }, []);

  const setTheme = async () => {
    const userThemeSetting = await AsyncStorage.getItem('userTheme');
    if (userThemeSetting) {
      if (userThemeSetting === 'false') {
        // Don't use user theme
        setUseUserTheme(false);
        setDarkMode(scheme === 'dark');
      } else {
        // Use user theme
        setUseUserTheme(true);
        setDarkMode(userThemeSetting === 'dark');
      }
    } else {
      // If no system theme setting, use the system theme
      setUseUserTheme(false);
      setDarkMode(scheme === 'dark');
      AsyncStorage.setItem('userTheme', 'false');
    }
  };

  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
      <ApplicationProvider
        {...eva}
        theme={{ ...(darkMode ? eva.dark : eva.light), ...MuddTheme }}>
        <AppDataContext.Provider
          value={{
            darkMode,
            setDarkMode,
            useUserTheme,
            setUseUserTheme,
          }}>
          <Main />
          <StatusBar style={darkMode ? 'light' : 'dark'} />
        </AppDataContext.Provider>
      </ApplicationProvider>
    </NavigationContainer>
  );
}
