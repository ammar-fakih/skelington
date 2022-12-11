import {
  Layout,
  Text,
  Button,
  Input,
  Datepicker,
  Select,
  IndexPath,
  SelectItem,
} from '@ui-kitten/components';
import { ScrollView } from 'react-native';
import { useState } from 'react';
import Constants from 'expo-constants';

const collegeOptions = [
  'Harvey Mudd',
  'Pomona',
  'Claremont McKenna',
  'Scripps',
  'Pitzer',
];

export default function AddEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [collegeIndex, setCollegeIndex] = useState(new IndexPath(0));

  return (
    <Layout style={{ flex: 1 }}>
      <Layout
        style={{
          marginTop: Constants.statusBarHeight + 10,
          marginBottom: 20,
          marginLeft: 20,
        }}>
        <Text category="h2">Submit an Event</Text>
      </Layout>
      <ScrollView>
        <Layout style={{ padding: 30 }}>
          <Input
            label={'Title'}
            style={{ marginVertical: 10 }}
            onChangeText={setTitle}
          />
          <Input
            multiline
            height={50}
            label={'Description'}
            style={{ marginVertical: 10 }}
          />
          <Select
            multiSelect
            label={'College'}
            onSelect={(index) => setCollegeIndex(index)}
            selectedIndex={collegeIndex}
            value={collegeOptions[collegeIndex.row]}
            style={{ marginVertical: 10 }}>
            {collegeOptions.map((college, i) => (
              <SelectItem key={i} title={college} />
            ))}
          </Select>
          <Input label={'Location'} style={{ marginVertical: 10 }} />
          <Datepicker label={'Date'} style={{ marginVertical: 10 }} />

          <Button style={{ marginVertical: 30 }}>Submit Event</Button>
        </Layout>
      </ScrollView>
    </Layout>
  );
}
