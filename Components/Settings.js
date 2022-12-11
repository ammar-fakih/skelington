import {
  Button,
  Divider,
  Input,
  Layout,
  Text,
  Toggle,
} from '@ui-kitten/components';
import { useContext, useState } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { AppDataContext } from '../contexts';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@ui-kitten/components';

export default function Settings({ navigation }) {
  const { darkMode, setDarkMode } = useContext(AppDataContext);
  const [feedback, setFeedback] = useState('');

  const theme = useTheme();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <Layout style={{ flex: 1 }}>
        <Layout style={{ flexDirection: 'row', marginTop: 60, marginLeft: 20 }}>
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons
              name="ios-arrow-back-sharp"
              size={40}
              color={theme['color-primary-400']}
            />
          </TouchableOpacity>

          <Text category="h2">Settings</Text>
        </Layout>
        <Layout style={{ flex: 1, margin: 20 }}>
          <Input
            label={'Feedback'}
            style={{ marginVertical: 20 }}
            multiline
            placeholder="We love hearing feedback..."
          />
          <Button style={{ marginBottom: 20 }}>Submit Feedback</Button>
          <Divider />
          <Layout style={{ marginTop: 20 }}>
            <Toggle checked={darkMode} onChange={setDarkMode}>
              Dark Mode
            </Toggle>
          </Layout>
        </Layout>
      </Layout>
    </TouchableWithoutFeedback>
  );
}
