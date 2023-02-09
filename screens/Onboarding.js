import React, { useState } from 'react';
import { Text, TextInput, View, Image,TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



const OnboardingScreen = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');

    _storeData = async () => {
        try {
          await AsyncStorage.setItem('userName',firstName);
          await AsyncStorage.setItem('userEmail',email);
        } catch (error) {
          // Error saving data
        }
      };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.img} source={require("../assets/Logo.png")} />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.msgtext}>Let us get to know you</Text>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <TouchableOpacity disabled={!email || !firstName} style={styles.button} onPress={() => {
                    _storeData();
                    navigation.navigate('Main')}}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
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
        flex: 0.1,
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

export default OnboardingScreen;
