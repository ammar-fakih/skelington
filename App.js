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
// import { PASSWORD } from '@env';

import MuddTheme from './theme/mudd.json';
import Main from './Components/Main';
import { AppDataContext } from './contexts';
import Api from './apis';
import { eventTypeOptions } from './constants';
import Constants from 'expo-constants';

export default function App() {
  const [darkMode, setDarkMode] = useState();
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [renderedEvents, setRenderedEvents] = useState([]);
  const [eventsError, setEventsError] = useState();
  const [typeCheckBoxes, setTypeCheckBoxes] = useState(eventTypeOptions);
  const [password, setPassword] = useState('');
  const scheme = useColorScheme();

  useEffect(() => {
    if (scheme === 'dark') {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }

    getEvents(true);
  }, []);

  const refineList = (options) => {
    let filteredList = events;
    if (options.type) {
      filteredList = filteredList.filter((event) =>
        options.type.includes(event.type)
      );
    }
    setRenderedEvents(filteredList);
  };

  const getEvents = async (initial) => {
    if (initial) {
      setInitialLoad(true);
    }

    setEventsLoading(true);
    const response = await Api.getEventsApi();
    if (response?.events) {
      setEvents(response.events);
      setRenderedEvents(response.events);
    } else {
      setEventsError("Couldn't get events");
    }
    setEventsLoading(false);
    setInitialLoad(false);
  };

  const handlePostEvent = async (event) => {
    const response = await Api.postEventApi(event);
    if (response?.event) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
      <ApplicationProvider
        {...eva}
        theme={{ ...(darkMode ? eva.dark : eva.light), ...MuddTheme }}>
        <AppDataContext.Provider
          value={{
            renderedEvents,
            getEvents,
            eventsLoading,
            initialLoad,
            darkMode,
            setDarkMode,
            refineList,
            typeCheckBoxes,
            setTypeCheckBoxes,
            handlePostEvent,
          }}>
          <Main />
          <StatusBar style={darkMode ? 'light' : 'dark'} />
        </AppDataContext.Provider>
      </ApplicationProvider>
    </NavigationContainer>
  );
}
