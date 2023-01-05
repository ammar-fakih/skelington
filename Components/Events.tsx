import React, { useEffect, useState } from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@ui-kitten/components';
import Constants from 'expo-constants';

enum CardState {
  Question,
  Ranking,
}

export default function Events({ navigation }) {
  const [professorImages, setProfessorImages] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [ranking, setRanking] = useState({});
  const [page, setPage] = useState(0);
  const [cardState, setCardState] = useState(CardState.Question);
  const theme = useTheme();

  const importAll = (r) => {
    const resp = r.keys().map(r);
    return resp;
  };

  useEffect(() => {
    const getImages = () => {
      const ProfImages = importAll(
        require.context('../assets/professors', false, /\.(png|jpe?g|svg)$/)
      );
      setProfessorImages(ProfImages);
    };

    const initQuestions = () => {
      // TODO: Get questions from database
      const questions = ['Who has the best hair?', 'Who is the best teacher?'];

      setQuestions(questions);
    };

    initQuestions();
    getImages();
  }, []);

  const getRandomProfessors = () => {
    // No duplicates
    const profs = [];
    while (profs.length < 4) {
      const prof =
        professorImages[Math.floor(Math.random() * professorImages.length)];
      if (!profs.includes(prof)) {
        profs.push(prof);
      }
    }
    return profs;
  };

  const getRanking = () => {
    Object.values(ranking[questions[page]]).sort((source) => {
      
    })
  }

  // { questions : {source : count, source : count}}

  const handleOnPressImage = (source) => {
    if (!ranking[questions[page]]) {
      ranking[questions[page]] = {};
    }
    if (ranking[questions[page]][source]) {
      ranking[questions[page]][source] += 1;
    } else {
      ranking[questions[page]][source] = 1;
    }

    setCardState(CardState.Ranking);
  };

  const handleOnPressNext = () => {
    setCardState(CardState.Question);
    if (page < questions.length - 1) {
      setPage(page + 1);
    } else {
      setPage(0);
    }
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
          backgroundColor: theme['color-info-900'],
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
      <Layout style={{ flex: 1 }}>
        {/* {professorImages.map((source, index) => {
          // console.log(name);
          return (
            <Image
              source={source}
              key={index}
              style={{ width: 100, height: 100 }}
            />
          );
        })} */}
        {questions.length > 0 ? (
          <Layout
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category="h4" style={{ marginTop: 20 }}>
              {questions[page]}
            </Text>
            {cardState === CardState.Question ? (
              <Layout
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                  paddingHorizontal: 20,
                  marginTop: 20,
                  flexWrap: 'wrap',
                }}>
                {getRandomProfessors().map((source, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        handleOnPressImage(source);
                      }}>
                      <Image
                        source={source}
                        style={{ width: 150, height: 150, marginTop: 20 }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </Layout>
            ) : (
              // Ranking
              <Layout style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>Leaderboard</Text>
                <ScrollView>
                  {Object.keys(ranking[questions[page]])
                    .slice(0, 4)
                    .map((source, index) => {
                      return (
                        <Layout
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'space-evenly',
                            marginTop: 20,
                          }}
                          key={index}>
                          <Text style={{ fontSize: 25 }}>
                            {ranking[questions[page]][source]}
                          </Text>
                          <Image
                            source={source}
                            style={{ width: 150, height: 150 }}
                          />
                        </Layout>
                      );
                    })}
                </ScrollView>

                <Button
                  style={{ position: 'absolute', bottom: 10 }}
                  onPress={handleOnPressNext}>
                  Next
                </Button>
              </Layout>
            )}
          </Layout>
        ) : null}
      </Layout>
    </Layout>
  );
}
