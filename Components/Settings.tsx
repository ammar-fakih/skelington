import {
  Button,
  Divider,
  Input,
  Layout,
  Text,
  Toggle,
} from '@ui-kitten/components';
import React, { useContext, useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { AppDataContext } from '../contexts';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@ui-kitten/components';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({ navigation }) {
  const { darkMode, setDarkMode, useUserTheme, setUseUserTheme } =
    useContext(AppDataContext);
  const [feedback, setFeedback] = useState('');
  const theme = useTheme();
  const scheme = useColorScheme();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <Layout style={{ flex: 1 }}>
        <Layout
          style={{
            flexDirection: 'row',
            marginTop: Constants.statusBarHeight + 10,
            marginLeft: 20,
          }}>
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons
              name="ios-arrow-back-sharp"
              size={37}
              color={theme['color-primary-400']}
            />
          </TouchableOpacity>

          <Text category="h2">Settings</Text>
        </Layout>
        <Layout style={{ flex: 1, margin: 20 }}>
          <Input
            label={'Feedback'}
            style={{ marginVertical: 20, paddingTop: 0, paddingBottom: 0 }}
            multiline
            height={100}
            placeholder="We love hearing feedback..."
            onChangeText={setFeedback}
            value={feedback}
          />
          <Button style={{ marginBottom: 20 }} disabled={!feedback}>
            Submit Feedback
          </Button>
          <Divider />
          <Text category="h6" style={{ textAlign: 'center', marginTop: 20 }}>
            Dark Mode
          </Text>
          <Layout
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>Use Device Setting</Text>
            <Toggle
              checked={!useUserTheme}
              onChange={() => {
                if (useUserTheme) {
                  AsyncStorage.setItem('userTheme', 'false');
                  setDarkMode(scheme === 'dark');
                  setUseUserTheme(false);
                } else {
                  AsyncStorage.setItem(
                    'userTheme',
                    darkMode ? 'dark' : 'light'
                  );
                  setUseUserTheme(true);
                }
              }}
            />
          </Layout>
          <Layout
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              opacity: useUserTheme ? 1 : 0.5,
            }}>
            <Text>Dark Mode</Text>
            <Toggle
              checked={darkMode}
              onChange={() => {
                AsyncStorage.setItem('userTheme', !darkMode ? 'dark' : 'light');
                setDarkMode(!darkMode);
                setUseUserTheme(true);
              }}
            />
          </Layout>
        </Layout>
      </Layout>
    </TouchableWithoutFeedback>
  );
}
