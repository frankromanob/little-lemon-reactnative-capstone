import React,{ useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './screens/Onboarding';
import MainScreen from './screens/MainScreen';
import ProfileScreen from './screens/Profile';
import SplashScreen from './screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {
  const [isLoading, setisLoading] = useState(true);
  const [onboardingReady, setonboardingReady] = useState(false)

  useEffect(() => {
    retrieveData()
  }, [])

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userEmail');
      if (value !== null) {
        // We have data!!
        setonboardingReady(true);
        console.log(value);
      }
      setisLoading(false);
    } catch (error) {
      console.log(error)
      // Error retrieving data
    }
  };

  if (isLoading) {
    console.log(isLoading);
    // We haven't finished reading from AsyncStorage yet
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {onboardingReady ? (
        // Onboarding completed, user is signed in
        <Stack.Screen name="ProfileOnboard"  component={ProfileScreen}options={{
          title: 'My profile',
        }} />
      ) : (
        // User is NOT signed in
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      )}
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}