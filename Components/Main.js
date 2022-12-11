import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Events from './Events';
import Settings from './Settings';
import AddEvent from './AddEvent';

const Tab = createBottomTabNavigator();

export default function Main() {
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

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="Add Event" component={AddEvent} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
