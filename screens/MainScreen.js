import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image } from "react-native";


const MainScreen = ({navigation}) => {
    //const [firstName, setFirstName] = useState('');
   // const [email, setEmail] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.img} source={require("../assets/Logo.png")} />
            </View>
            <View style={styles.body}>
                <Image style={styles.img1} source={require("../assets/Grilledfish.png")} />
            </View>
           <TouchableOpacity style={styles.button} title="Hola" onPress={() => {navigation.navigate('Profile')}}>
                <Text style={styles.buttonText}>My profile</Text>
           </TouchableOpacity>
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
    header: {
        flex: 0.2,
        height: 100,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        margintop: 10,
        backgroundColor:'#EDEFEE'
    },
    body: {
        flex: 0.8,
        height: 100,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        margintop: 10,
        backgroundColor:'#EDEFEE'
    },
    img: {
        height: 50,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',

    },
    img1: {
        height: 300,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',

    },
    formContainer: {
        flex: 0.9,
        justifyContent: 'center',
        width: '80%',
    },
    input: {
        height: 40,
        borderColor: '#333333',
        borderRadius:10,
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    button: {
        height: 40,
        width:80,
        borderRadius:10,
        borderWidth:1,
        backgroundColor: '#EDEFEE',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30
    },

    buttonText: {
        color: '#333333',
        fontWeight: 'bold',
    },
    msgtext: {
        color: '#333333',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelft: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
};

export default MainScreen;
