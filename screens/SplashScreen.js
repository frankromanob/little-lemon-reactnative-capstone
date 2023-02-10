import React from 'react';
import { View, Image } from "react-native";


const SplashScreen = () => {
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
