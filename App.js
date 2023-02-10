import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './screens/Onboarding';
import MainScreen from './screens/MainScreen';
import ProfileScreen from './screens/Profile';
import SplashScreen from './screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image,TouchableHighlight } from 'react-native';

const Stack = createNativeStackNavigator();


export default function App() {
  const [isLoading, setisLoading] = useState(true);
  const [onboardingReady, setonboardingReady] = useState(false)

  useEffect(() => {
    retrieveData()
  }, [])

  retrieveData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userProfile');
      if (jsonValue !== null) {
        const value= JSON.parse(jsonValue);
        console.log(value);
        // We have data!!
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
      <Stack.Navigator
        screenOptions={({navigation}) =>({
          headerMode: 'screen',
          headerTitleAlign: 'center',
          headerTintColor: '#495E57',
          headerStyle: { backgroundColor: '#EDEFEE' },
          headerTitle: (props) => (
            <>
              <Image
                style={{ width: 250, height: 70, alignSelf: 'center', justifyContent: 'center' }}
                source={require('./assets/Logo.png')}
                resizeMode='contain' />
            </>
          ),
          headerRight: (props) => (
            <>
              {onboardingReady ? (
              <TouchableHighlight onPress={() => {navigation.navigate('Profile')}} >
                <Image
                  style={{ width: 50, height: 50, borderRadius: 50, alignSelf: 'center', justifyContent: 'center' }}
                  source={require('./assets/Profile.png')}
                  resizeMode='contain' />
               </TouchableHighlight>)
                : (
                    <Image
                      style={{ width: 50, height: 50, borderRadius: 50, alignSelf: 'center', justifyContent: 'center' }}
                      source={require('./assets/profileicon.png')}
                      resizeMode='contain' />
                )
              }
            </>
          )

        })}
      >
        {onboardingReady ? (
          // Onboarding completed, user is signed in
          <Stack.Screen name="MainScreen" component={MainScreen}
            options={{
              title: '',
            }} />
        ) : (
          // User is NOT signed in
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        )}
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}