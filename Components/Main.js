import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme as useNavTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Text, useTheme } from '@ui-kitten/components';
import { Platform } from 'react-native';

import Events from './Events';
import Settings from './Settings';
import AddEvent from './AddEvent';
import FilterEvents from './FilterEvents';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Main() {
  const theme = useTheme();
  const navTheme = useNavTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Events') {
            iconName = focused ? 'flash-sharp' : 'flash-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          } else if (route.name === 'Add Event') {
            iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
          }
          return <Ionicons name={iconName} size={size * 1.2} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 15,
        },
        tabBarActiveTintColor: navTheme.dark
          ? theme['color-primary-400']
          : theme['color-primary-500'],
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 100 : 80,
          ...(Platform.OS === 'ios' ? {} : { paddingBottom: 10 }),
        },
      })}>
      <Tab.Screen name="Events" component={EventsHandler} />
      <Tab.Screen name="Add Event" component={AddEvent} />
    </Tab.Navigator>
  );
}

const EventsHandler = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventsPage" component={Events} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="FilterEvents" component={FilterEvents} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
