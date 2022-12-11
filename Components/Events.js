import React from 'react';
import {
  Button,
  Card,
  Layout,
  List,
  Spinner,
  Text,
} from '@ui-kitten/components';
import { AppDataContext } from '../contexts';
import { FormatDate } from '../globalFunctions';
import { TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@ui-kitten/components';

export default function Events({ navigation }) {
  const { events, eventsLoading, getEvents, darkMode } =
    React.useContext(AppDataContext);
  const theme = useTheme();

  const Header = (title) => (
    <Layout style={{ padding: 15 }}>
      <Text category="h6">{title} </Text>
    </Layout>
  );

  const renderedEvent = ({ item, key }) => {
    return (
      <Layout
        key={key}
        style={{
          shadowOffset: { height: 3 },
          shadowColor: 'black',
          shadowOpacity: darkMode ? 0.1 : 0.2,
          shadowRadius: 12,
          elevation: 3,
          backgroundColor: '#0000',
        }}>
        <Card
          disabled
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
          }}
          header={() => Header(item.title)}
          status="primary">
          <Layout
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            <Text category="s1">At {item.location}</Text>
            <Text category="s1">{FormatDate(item.date)}</Text>
          </Layout>
          <Layout
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text category="p1" style={{ flex: 2 }}>
              {item.description}
            </Text>
            <Text style={{ flex: 1, textAlign: 'right' }}>
              {item.start_times
                ? `${item.start_times.split(',').slice(0, 1)}-{item.end_time}}`
                : ''}
            </Text>
          </Layout>
          <Layout style={{ flexDirection: 'row', width: '100%' }}>
            <Layout>
              <Text
                category="c2"
                style={{ fontStyle: 'italics', marginBottom: 2 }}>
                By {item.host}
              </Text>
              <Text category="c1">{item.type}</Text>
            </Layout>
            <Layout
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
              }}>
              {item.schools.split(',').map((school, i) => (
                <Layout
                  key={i}
                  style={{
                    margin: 2,
                    borderRadius: 6,
                    backgroundColor: theme['color-primary-600'],
                    padding: 4,
                  }}>
                  <Text style={{ color: 'white' }}>{school}</Text>
                </Layout>
              ))}
            </Layout>
          </Layout>
        </Card>
      </Layout>
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 60,
          marginBottom: 20,
          marginHorizontal: 20,
        }}>
        <Text category="h2">
          Mudd Board
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Settings');
          }}>
          <Ionicons
            name="settings-outline"
            size={30}
            color={theme['color-primary-400']}
          />
        </TouchableOpacity>
      </Layout>
      <Layout style={{ flex: 1 }}>
        {eventsLoading ? (
          <Layout
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner size="medium" />
          </Layout>
        ) : events.length > 0 ? (
          <List
            contentContainerStyle={{ paddingVertical: 20 }}
            onRefresh={getEvents}
            refreshing={eventsLoading}
            data={events}
            renderItem={renderedEvent}
          />
        ) : (
          <Layout style={{ width: '100%', alignItems: 'center' }}>
            <Text>No events :(</Text>
            <Button appearance="ghost" onPress={getEvents}>
              Refresh
            </Button>
          </Layout>
        )}
      </Layout>
    </Layout>
  );
}
