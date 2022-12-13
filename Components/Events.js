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
import { FormatDate, FormatTimeRange } from '../globalFunctions';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@ui-kitten/components';
import Constants from 'expo-constants';

export default function Events({ navigation }) {
  const { renderedEvents, eventsLoading, initialLoad, getEvents, darkMode } =
    React.useContext(AppDataContext);
  const theme = useTheme();

  const Header = (title) => (
    <Layout style={{ padding: 15 }}>
      <Text category="h6">{title}</Text>
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
            borderRadius: 15,
            marginHorizontal: 20,
            marginBottom: 36,
          }}
          accent={({ style }) => {
            // console.log(status);
            return (
              <Layout
                style={{
                  height: 5,
                  width: '100%',
                  backgroundColor: style.backgroundColor,
                }}
              />
            );
          }}
          status="primary"
          header={() => Header(item.title)}>
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
          </Layout>
          <Layout style={{ flexDirection: 'row', width: '100%' }}>
            <Layout>
              <Text
                category="c2"
                style={{
                  fontStyle: 'italics',
                  marginBottom: 2,
                  color: !darkMode
                    ? theme['color-grey-600']
                    : theme['color-grey-100'],
                }}>
                By {item.host}
              </Text>
            </Layout>
            <Text style={{ flex: 1, textAlign: 'right' }}>
              {item.start_time
                ? FormatTimeRange(item.start_time, item.end_time)
                : null}
            </Text>
          </Layout>
          <Layout
            style={{
              flex: 1,
              marginTop: 4,
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
          paddingTop: Constants.statusBarHeight + 10,
          paddingBottom: 10,
          paddingHorizontal: 20,
        }}>
        <Text category="h2">Athena Board</Text>
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
      <TouchableOpacity
        style={{
          width: 90,
          position: 'absolute',
          top: Constants.statusBarHeight + 58,
          zIndex: 1,
        }}
        onPress={() => {
          navigation.navigate('FilterEvents');
        }}>
        <Layout
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomRightRadius: 10,
            shadowColor: 'black',
            shadowOpacity: 0.05,
            shadowRadius: 5,
            shadowOffset: {
              height: 10,
              width: 0,
            },
          }}>
          <Ionicons
            name="filter"
            size={30}
            color={theme['color-primary-500']}
          />
          <Text category="label" style={{ marginLeft: 3 }}>
            Filter
          </Text>
        </Layout>
      </TouchableOpacity>
      <Layout style={{ flex: 1 }}>
        {initialLoad ? (
          <Layout
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner size="medium" />
          </Layout>
        ) : renderedEvents.length > 0 ? (
          <List
            contentContainerStyle={{ paddingVertical: 45 }}
            refreshControl={
              <RefreshControl
                refreshing={eventsLoading}
                onRefresh={getEvents}
                title="Pull to refresh"
                tintColor={theme['color-primary-500']}
                titleColor={theme['color-primary-300']}
              />
            }
            data={renderedEvents}
            renderItem={renderedEvent}
          />
        ) : (
          <Layout
            style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
            <Text category="s1">{`No events`}</Text>
            <Button appearance="ghost" onPress={getEvents}>
              Refresh
            </Button>
          </Layout>
        )}
      </Layout>
    </Layout>
  );
}
