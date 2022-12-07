import { useColorScheme, Text } from 'react-native';
import { useState, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Main from './Components/Main';
import { AppDataContext } from './contexts';

export default function App() {
  const [darkMode, setDarkMode] = useState();
  const [userData, setUserData] = useState();
  const scheme = useColorScheme();

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user_data');
      setUserData(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (e) {
      console.warn('Get User Data', e);
    }
  };

  useEffect(() => {
    if (scheme === 'dark') {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }

    getUserData();
  }, []);

  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
      <ApplicationProvider {...eva} theme={darkMode ? eva.dark : eva.light}>
        <AppDataContext.Provider value={{ darkMode, setDarkMode }}>
          <Main />
        </AppDataContext.Provider>
      </ApplicationProvider>
    </NavigationContainer>
  );
}

