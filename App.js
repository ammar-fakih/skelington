import { useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import Main from './Components/Main';
import { AppDataContext } from './contexts';

export default function App() {
  const [darkMode, setDarkMode] = useState();
  // const scheme = useColorScheme();

  // useEffect(() => {
  //   setTheme(scheme);
  // }, []);

  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
      <ApplicationProvider
        {...eva}
        theme={darkMode ? eva.dark : eva.light}>
        <AppDataContext.Provider value={{ darkMode, setDarkMode }}>
          <Main />
        </AppDataContext.Provider>
      </ApplicationProvider>
    </NavigationContainer>
  );
}
