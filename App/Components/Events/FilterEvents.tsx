import { Button, CheckBox, Layout, Text } from '@ui-kitten/components';
import { TouchableOpacity, Platform } from 'react-native';
import { useContext } from 'react';
import { useTheme } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

import { AppDataContext } from '../../contexts';
import { eventTypeOptions } from '../../constants';

export default function ({ navigation }) {
  const { refineList, typeCheckBoxes, setTypeCheckBoxes } =
    useContext(AppDataContext);

  const theme = useTheme();

  const renderEventTypes = () => {
    return eventTypeOptions.map((option, i) => {
      return (
        <CheckBox
          style={{ marginVertical: 10 }}
          key={i}
          checked={typeCheckBoxes.includes(option)}
          onChange={() => {
            if (typeCheckBoxes.includes(option)) {
              setTypeCheckBoxes(
                typeCheckBoxes.filter((item) => item !== option)
              );
            } else {
              setTypeCheckBoxes([...typeCheckBoxes, option]);
            }
          }}>
          <Text>{option}</Text>
        </CheckBox>
      );
    });
  };

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ flexDirection: 'row', marginTop: 30, marginLeft: 20 }}>
        <TouchableOpacity
          style={{ paddingRight: 10 }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-arrow-down-sharp' : 'ios-close'}
            size={40}
            color={theme['color-primary-400']}
          />
        </TouchableOpacity>
        <Text category="h2">Filters</Text>
      </Layout>

      <Layout style={{ padding: 30 }}>
        <Text category="h6">Event Type</Text>
        {renderEventTypes()}
        <Button
          onPress={() => {
            refineList({ type: typeCheckBoxes });
            navigation.goBack();
          }}
          style={{ marginTop: 20 }}>
          <Text>Filter List</Text>
        </Button>
      </Layout>
    </Layout>
  );
}
