import React, { useEffect, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@ui-kitten/components';
import Constants from 'expo-constants';
import { enableExpoCliLogging } from 'expo/build/logs/Logs';

export default function Events({ navigation }) {
  const [professorImages, setProfessorImages] = useState([]);
  const theme = useTheme();

  const importAll = async (r) => {
    const resp = await r.keys().map(r);
    return resp;
  };

  useEffect(() => {
    const getImages = async () => {
      const images = await importAll(
        require.context('../assets/professors', false, /\.(png|jpe?g|svg)$/)
      );
      console.log(images[0]);
      setProfessorImages(images);
    };

    getImages();
  }, []);

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
        <Text category="h2">Professor Game</Text>
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
      <Layout>
        {professorImages.map((image, index) => (
          <Image
            source={image}
            key={index}
            style={{ width: 100, height: 100 }}
          />
        ))}
      </Layout>
    </Layout>
  );
}
