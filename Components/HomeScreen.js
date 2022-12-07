import { Layout, Text } from '@ui-kitten/components';

export default function HomeScreen() {
  return (
    <Layout style={{ flex: 1, alignItems: 'center' }}>
      <Layout style={{ flex: 1, marginTop: 60 }}>
        <Text category="h2">Welcome to the Future</Text>
      </Layout>
    </Layout>
  );
}
