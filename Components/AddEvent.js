import {
  Layout,
  Text,
  Button,
  Input,
  Datepicker,
  Select,
  IndexPath,
  SelectItem,
  CheckBox,
  useTheme,
  Spinner,
} from '@ui-kitten/components';
import {
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { useState, useContext } from 'react';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';

import { AppDataContext } from '../contexts';

const collegeOptions = [
  'Harvey Mudd',
  'Pomona',
  'Claremont McKenna',
  'Scripps',
  'Pitzer',
];

const typeOptions = ['Academic', 'Social', 'Party', 'Sports', 'Other'];

export default function AddEvent() {
  const { handlePostEvent } = useContext(AppDataContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [collegeIndex, setCollegeIndex] = useState([]);
  const [typeIndex, setTypeIndex] = useState(new IndexPath(0));
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [host, setHost] = useState('');
  const [email, setEmail] = useState('');
  const [timeToggled, setTimeToggled] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const onSubmit = async () => {
    setIsLoading(true);
    let missingFields = [];
    if (!title) {
      missingFields.push('Title');
    }
    if (!description) {
      missingFields.push('Description');
    }
    if (!collegeIndex.length) {
      missingFields.push('College');
    }
    if (!typeIndex) {
      missingFields.push('Type');
    }
    if (!location) {
      missingFields.push('Location');
    }
    if (!date) {
      missingFields.push('Date');
    }
    if (!host) {
      missingFields.push('Host');
    }
    if (!email) {
      missingFields.push('Email');
    }
    if (missingFields.length) {
      setError(`Missing fields: ${missingFields.join(', ')}`);
      setIsLoading(false);
      return;
    }

    // Check if date is valid
    if (date < new Date()) {
      setError('Date must be in the future');
      setIsLoading(false);
      return;
    }

    let toStartTime, toEndTime;
    if (timeToggled) {
      if (endTime < startTime) {
        setError('End time must be after start time');
        setIsLoading(false);
        return;
      }

      toStartTime = `${startTime.getHours()}:${startTime.getMinutes()}`;
      toEndTime = `${endTime.getHours()}:${endTime.getMinutes()}`;
    }

    const toCollege = collegeIndex.map((index) => collegeOptions[index.row]);

    const toSubmit = {
      title,
      description,
      location,
      type: typeOptions[typeIndex.row],
      date: date.toISOString().split('T')[0],
      schools: toCollege,
      start_time: toStartTime,
      end_time: toEndTime,
      host,
      email,
    };

    const res = await handlePostEvent(toSubmit);
    if (!res) {
      setError('Error submitting event');
    } else {
      setSuccessMsg('Event submitted successfully');
      setError('');
    }
    setIsLoading(false);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <Layout style={{ flex: 1 }}>
        <Layout
          style={{
            marginTop: Constants.statusBarHeight + 10,
            marginLeft: 20,
          }}>
          <Text category="h2">Submit an Event</Text>
        </Layout>
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: 'center' }}
          behavior="padding"
          enabled>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Layout style={{ padding: 30 }}>
              <Input
                label={<Text>Title</Text>}
                placeholder={'Event Title'}
                style={{ marginVertical: 10 }}
                value={title}
                onChangeText={setTitle}
              />
              <Input
                label={'Description'}
                multiline
                height={60}
                placeholder={'Describe the event...'}
                style={{ marginVertical: 10 }}
                value={description}
                onChangeText={setDescription}
              />
              <Select
                multiSelect
                label={'College'}
                onPress={() => {
                  Keyboard.dismiss();
                }}
                onSelect={(index) => setCollegeIndex(index)}
                selectedIndex={collegeIndex}
                value={collegeIndex
                  .map((index) => collegeOptions[index.row])
                  .join(', ')}
                style={{ marginVertical: 10 }}>
                {collegeOptions.map((college, i) => (
                  <SelectItem key={i} title={college} />
                ))}
              </Select>

              <Select
                label={'Type'}
                onPress={() => {
                  Keyboard.dismiss();
                }}
                placeholder={'Select Type'}
                onSelect={(typeIndex) => setTypeIndex(typeIndex)}
                selectedIndex={typeIndex}
                value={typeOptions[typeIndex.row]}
                style={{ marginVertical: 10 }}>
                {typeOptions.map((college, i) => (
                  <SelectItem key={i} title={college} />
                ))}
              </Select>
              <Input
                label={'Location'}
                placeholder={'Ex: North courtyard'}
                value={location}
                onChangeText={setLocation}
                style={{ marginVertical: 10 }}
              />
              <Datepicker
                label={'Date'}
                onSelect={(nextDate) => setDate(nextDate)}
                date={date}
                placement="top"
                style={{ marginVertical: 10 }}
              />
              {/* Time */}
              <Layout
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVertical: 10,
                  opacity: timeToggled ? 1 : 0.5,
                }}>
                <Layout style={{ alignItems: 'center' }}>
                  <Text category="label" style={{ marginBottom: 5 }}>
                    Start Time
                  </Text>
                  <DateTimePicker
                    disabled={!timeToggled}
                    mode="time"
                    onChange={(change, date) => {
                      setStartTime(date);
                    }}
                    value={startTime}
                  />
                </Layout>
                <Layout style={{ alignItems: 'center' }}>
                  <Text category="label" style={{ marginBottom: 5 }}>
                    End Time
                  </Text>
                  <DateTimePicker
                    disabled={!timeToggled}
                    mode="time"
                    onChange={(change, date) => {
                      setEndTime(date);
                    }}
                    value={endTime}
                  />
                </Layout>
              </Layout>
              <CheckBox
                style={{ alignSelf: 'flex-end', marginTop: 5 }}
                checked={timeToggled}
                onChange={setTimeToggled}>
                <Text>Toggle Time</Text>
              </CheckBox>

              <Input
                label={'Host'}
                placeholder={'Ex: John Doe'}
                style={{ marginVertical: 10 }}
                value={host}
                onChangeText={setHost}
              />

              <Input
                label={'Email'}
                placeholder={'Used for contact purposes'}
                style={{ marginVertical: 10 }}
                value={email}
                onChangeText={setEmail}
              />

              {error ? (
                <Text style={{ color: theme['color-danger-500'] }}>
                  {error}
                </Text>
              ) : null}

              {isLoading ? <Spinner size="small" status="warning" /> : null}

              <Button onPress={onSubmit} style={{ marginVertical: 30 }}>
                Submit Event
              </Button>
            </Layout>
          </ScrollView>
        </KeyboardAvoidingView>
      </Layout>
    </TouchableWithoutFeedback>
  );
}
