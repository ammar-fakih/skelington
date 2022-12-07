import * as eva from '@eva-design/eva';
import { useColorScheme } from 'react-native';
import { ApplicationProvider } from '@ui-kitten/components';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import Main from './Components/Main';

export default function App() {
  const scheme = useColorScheme();
  console.log(scheme);

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ApplicationProvider
        {...eva}
        theme={scheme === 'dark' ? eva.dark : eva.light}>
        <Main />
      </ApplicationProvider>
    </NavigationContainer>
  );
}
