
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Audio } from 'expo-av';
import React, { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { UserProvider, useUser } from './context/UserContext';
import AIAssistantScreen from './screens/AIAssistantScreen';
import AlzheimerDetectorScreen from './screens/AlzheimerDetectorScreen';
import GamesScreen from './screens/GamesScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MemorySequenceScreen from './screens/MemorySequenceScreen';
import MentalCalculationScreen from './screens/MentalCalculationScreen';
import MentalMathScreen from './screens/MentalMathScreen';
import ProblemSolvingScreen from './screens/ProblemSolvingScreen';
import ProfileScreen from './screens/ProfileScreen';
import QuizScreen from './screens/QuizScreen';
import ReactionTimeScreen from './screens/ReactionTimeScreen';
import ResourcesScreen from './screens/ResourcesScreen';
import SignUpScreen from './screens/SignUpScreen';
import SpatialSkillsScreen from './screens/SpatialSkillsScreen';
import SpeechAnalysisScreen from './screens/SpeechAnalysisScreen';
function GlobalSoundButton() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [playing, setPlaying] = useState(false);

  async function toggleSound() {
    if (playing) {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      setPlaying(false);
    } else {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('./assets/Nicu De La Cazanesti- Of Of Of Desteapta Esti (Melodie Pe Doua Voci).mp3'),
          { shouldPlay: true, isLooping: true }
        );
        soundRef.current = sound;
        setPlaying(true);
      } catch (e) {
        // handle error
      }
    }
  }

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        onPress={toggleSound}
        style={{ backgroundColor: 'yellow', borderRadius: 40, paddingVertical: 18, paddingHorizontal: 36, flexDirection: 'row', alignItems: 'center', borderWidth: 6, borderColor: 'red', elevation: 50 }}
        accessibilityLabel={playing ? 'Stop music' : 'Play music'}
      >
        <Text style={{ fontSize: 44, marginRight: 18 }}>{playing ? '🔊' : '🔈'}</Text>
        <Text style={{ color: playing ? '#388e3c' : '#2d7be5', fontWeight: 'bold', fontSize: 28 }}>{playing ? 'Stop' : 'Play'}</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 18, color: 'red', fontWeight: 'bold', marginTop: 4 }}>SOUND</Text>
    </View>
  );
}

function ProfileAvatar({ navigation }: { navigation: any }) {
  const { user } = useUser();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Profile')}
      style={{ marginRight: 16 }}
      accessibilityLabel="Profile"
    >
      {user?.photo ? (
        <Image
          source={{ uri: user.photo }}
          style={{ width: 38, height: 38, borderRadius: 19, borderWidth: 1, borderColor: '#2d7be5', backgroundColor: '#eee' }}
        />
      ) : (
        <View style={{
          width: 38,
          height: 38,
          borderRadius: 19,
          backgroundColor: '#e0e7ef',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#2d7be5',
        }}>
          <Text style={{ fontSize: 20, color: '#2d7be5', fontWeight: 'bold' }}>
            {user?.name ? user.name[0].toUpperCase() : '?'}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const Drawer = createDrawerNavigator();

function LogoHeader() {
  return (
    <View style={{ alignItems: 'center', paddingTop: 16, paddingBottom: 8, backgroundColor: '#fff' }}>
      <Image source={require('./assets/SYNAPSE.png')} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
    </View>
  );
}

// import { useState } from 'react';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Dacă folosești acest pachet, asigură-te că e instalat

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const [gamesOpen, setGamesOpen] = useState(false);
  const { navigation, state } = props;
  // List of game screens
  const gameScreens = [
    { name: 'MemorySequence', label: 'Memory Sequence' },
    { name: 'MentalMath', label: 'Mental Math' },
    { name: 'ReactionTime', label: 'Reaction Time' },
    { name: 'ProblemSolving', label: 'Problem Solving' },
    { name: 'SpatialSkills', label: 'Spatial Skills' },
    { name: 'MentalCalculation', label: 'Mental Calculation' },
  ];
  // Filter out game screens from DrawerItemList
  const filteredProps = {
    ...props,
    state: {
      ...props.state,
      routeNames: props.state.routeNames.filter(
        (name) =>
          !gameScreens.map((g) => g.name).includes(name)
      ),
      routes: props.state.routes.filter(
        (route) =>
          !gameScreens.map((g) => g.name).includes(route.name)
      ),
    },
  };
  return (
    <DrawerContentScrollView {...props}>
      <LogoHeader />
      {/* Render all except game screens */}
      <DrawerItemList {...filteredProps} />
      {/* Custom Games dropdown */}
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 16, paddingLeft: 20 }}
        onPress={() => setGamesOpen((open) => !open)}
      >
        {/* <MaterialIcons name={gamesOpen ? 'expand-less' : 'expand-more'} size={24} color="#2d7be5" /> */}
        <Text style={{ fontSize: 16, color: '#2d7be5', fontWeight: 'bold', marginLeft: 8 }}>Games</Text>
      </TouchableOpacity>
      {gamesOpen && (
        <View style={{ paddingLeft: 40 }}>
          {gameScreens.map((game) => (
            <TouchableOpacity
              key={game.name}
              style={{ paddingVertical: 10 }}
              onPress={() => navigation.navigate(game.name)}
            >
              <Text style={{ fontSize: 15, color: '#222' }}>{game.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </DrawerContentScrollView>
  );
}

function HamburgerMenu({ navigation }: { navigation: any }) {
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 16, marginRight: 8, padding: 8 }}>
      <View style={{ width: 28, height: 28, justifyContent: 'center' }}>
        <View style={{ height: 3, backgroundColor: '#2d7be5', marginBottom: 5, borderRadius: 2 }} />
        <View style={{ height: 3, backgroundColor: '#2d7be5', marginBottom: 5, borderRadius: 2 }} />
        <View style={{ height: 3, backgroundColor: '#2d7be5', borderRadius: 2 }} />
      </View>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <UserProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={({ navigation }) => ({
              headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <HamburgerMenu navigation={navigation} />
                  <Image
                    source={require('./assets/SYNAPSE.png')}
                    style={{ width: 38, height: 38, resizeMode: 'contain' }}
                  />
                </View>
              ),
              headerRight: () => (
                <ProfileAvatar navigation={navigation} />
              ),
              headerStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0 },
            })}
          >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Games" component={GamesScreen} />
            <Drawer.Screen name="MemorySequence" component={MemorySequenceScreen} options={{ title: 'Memory Sequence' }} />
            <Drawer.Screen name="MentalMath" component={MentalMathScreen} options={{ title: 'Mental Math' }} />
            <Drawer.Screen name="ReactionTime" component={ReactionTimeScreen} options={{ title: 'Reaction Time' }} />
            <Drawer.Screen name="ProblemSolving" component={ProblemSolvingScreen} options={{ title: 'Problem Solving' }} />
            <Drawer.Screen name="SpatialSkills" component={SpatialSkillsScreen} options={{ title: 'Spatial Skills' }} />
            <Drawer.Screen name="MentalCalculation" component={MentalCalculationScreen} options={{ title: 'Mental Calculation' }} />
            <Drawer.Screen name="Quiz" component={QuizScreen} />
            <Drawer.Screen name="Speech Analysis" component={SpeechAnalysisScreen} />
            <Drawer.Screen name="AI Assistant" component={AIAssistantScreen} />
            <Drawer.Screen name="Resources" component={ResourcesScreen} />
            <Drawer.Screen name="Alzheimer Detector" component={AlzheimerDetectorScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Log In" component={LoginScreen} />
            <Drawer.Screen name="Sign Up" component={SignUpScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 32,
              alignItems: 'center',
              zIndex: 99999,
              elevation: 50,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.5,
              shadowRadius: 20,
            }}
            pointerEvents="box-none"
          >
            <GlobalSoundButton />
          </View>
      </View>
    </UserProvider>
  );
}