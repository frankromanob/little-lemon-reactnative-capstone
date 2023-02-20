import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './screens/Onboarding';
import MainScreen from './screens/MainScreen';
import ProfileScreen from './screens/Profile';
import SplashScreen from './screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image,TouchableHighlight,StatusBar } from 'react-native';


const Stack = createNativeStackNavigator();


export default function App() {
  const [isLoading, setisLoading] = useState(true);
  const [onboardingReady, setonboardingReady] = useState(false)

  const [profileState, setProfileState] = useState({
    pic: false,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    orderNoti: false,
    passwordNoti: false,
    offersNoti: false,
    newsNoti: false
});

  useEffect(() => {
    retrieveData()
  }, [])

  retrieveData = async () => {
    try {
      const jsonProfile = await AsyncStorage.getItem('userProfile');
      const jsonValue= JSON.parse(jsonProfile);
      if (jsonValue !== null) {
        // We have data!!
        setProfileState(jsonValue);
        setonboardingReady(true);
      }
      setTimeout(() => setisLoading(false), 2000)

    } catch (error) {
      console.log(error)
      // Error retrieving data
    }
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar/>
      <Stack.Navigator
        screenOptions={({navigation}) =>({
          headerMode: 'screen',
          headerTitleAlign: 'center',
          headerTintColor: '#495E57',
          headerStyle: { backgroundColor: '#EDEFEE' },
          headerTitle: (props) => (
              <Image
                style={{ width: 250, height: 70, alignSelf: 'center', justifyContent: 'center' }}
                source={require('./assets/Logo.png')}
                resizeMode='contain' />
          ),
          headerRight: (props) => (
              <TouchableHighlight onPress={() => {navigation.navigate('Profile')}} >
                    {profileState.pic ?
                        <Image source={{ uri: profileState.pic }} resizeMode='contain' style={{alignSelf: 'flex-start', justifyContent: 'center', width: 50, height: 50, borderRadius: 50 }} /> :
                        <Image source={require('./assets/profileicon.png')} resizeMode='contain' style={{ width: 50, height: 50, borderRadius: 50, alignSelf: 'flex-start', justifyContent: 'center' }} />
                    }
               </TouchableHighlight>
          )

        })}
      >
        {onboardingReady ? (
          // Onboarding completed, user is signed in
          <>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} /></>
        ) : (
          // User is NOT signed in
          <>
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="MainScreen" component={MainScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} /></>
        )}
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}