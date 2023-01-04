import { Layout, Text } from '@ui-kitten/components';
import Constants from 'expo-constants';

export default function AddEvent() {
  return (
    <Layout style={{ flex: 1 }}>
      <Layout
        style={{
          marginTop: Constants.statusBarHeight + 10,
          marginLeft: 20,
        }}>
        <Text category="h2">Submit an Event</Text>
      </Layout>
    </Layout>
  );
}
