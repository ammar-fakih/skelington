import { Layout, Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

export default function ({navigation}) {
  const theme = useTheme();

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ flexDirection: 'row', marginTop: 30, marginLeft: 20 }}>
        <TouchableOpacity
          style={{ paddingRight: 10 }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons
            name="ios-arrow-down-sharp"
            size={37}
            color={theme['color-primary-400']}
          />
        </TouchableOpacity>

        <Text category="h2">Filters</Text>
      </Layout>
    </Layout>
  );
}
