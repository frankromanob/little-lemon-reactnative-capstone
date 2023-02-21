import React from 'react';
import { View, Image } from "react-native";
import { useFonts } from 'expo-font';


const SplashScreen = () => {
    const [fontsLoaded] = useFonts({
        'Markazi': require('../assets/fonts/MarkaziText-Medium.ttf'),
        'Karla': require('../assets/fonts/Karla-Regular.ttf'),
      });

      if (!fontsLoaded) {
          return null;
      }

    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require("../assets/lemon-29.png")} />
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#DDDDDD',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        height: '40%',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',

    },
};

export default SplashScreen;
