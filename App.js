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

import MuddTheme from './theme/mudd.json';
import Main from './Components/Main';
import { AppDataContext } from './contexts';
import Api from './apis';

export default function App() {
  const [darkMode, setDarkMode] = useState();
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [renderedEvents, setRenderedEvents] = useState([]);
  const [eventsError, setEventsError] = useState();
  const scheme = useColorScheme();

  const getEvents = async () => {
    setEventsLoading(true);
    const response = await Api.getEventsApi();
    if (response?.events) {
      setEvents(response.events);
      setRenderedEvents(response.events);
    } else {
      setEventsError("Couldn't get events");
    }
    setEventsLoading(false);
  };

  useEffect(() => {
    if (scheme === 'dark') {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }

    getEvents();
  }, []);

  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
      <ApplicationProvider
        {...eva}
        theme={{ ...(darkMode ? eva.dark : eva.light), ...MuddTheme }}>
        <AppDataContext.Provider
          value={{ events, getEvents, eventsLoading, darkMode, setDarkMode }}>
          <Main />
          <StatusBar style={darkMode ? 'light' : 'dark'} />
        </AppDataContext.Provider>
      </ApplicationProvider>
    </NavigationContainer>
  );
}
