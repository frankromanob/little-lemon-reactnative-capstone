import React, { useState } from 'react';
import { Text, TextInput, View, Image, TouchableOpacity, TouchableWithoutFeedback,Keyboard } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



const OnboardingScreen = ({ navigation }) => {
    const [profileState, setProfileState] = useState({
        pic: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        orderNoti: false,
        passwordNoti: false,
        offersNoti: false,
        newsNoti: false
    });

    saveData = async () => {
        try {
            await AsyncStorage.setItem('userProfile', JSON.stringify(profileState));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Image style={styles.img} source={require("../assets/lemon-29.png")} />
                <View style={styles.formContainer}>
                    <Text style={styles.msgtext}>Let us get to know you</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        onChangeText={(text) => setProfileState({ ...profileState, firstName: text })}
                        value={profileState.firstName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        onChangeText={(text) => setProfileState({ ...profileState, lastName: text })}
                        value={profileState.lastName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={(text) => setProfileState({ ...profileState, email: text })}
                        value={profileState.email}
                    />
                    <TouchableOpacity disabled={!profileState.email || !profileState.firstName || !profileState.lastName} style={styles.button} onPress={() => {
                        saveData();
                        navigation.navigate('Profile')
                    }}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
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
    header: {
        flex: 0.1,
        height: 100,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        margintop: 10,
        backgroundColor: '#EDEFEE'
    },
    formContainer: {
        flex: 0.9,
        justifyContent: 'center',
        width: '80%',
    },
    input: {
        height: 40,
        borderColor: '#333333',
        borderRadius: 10,
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
        fontFamily: 'Karla',
        fontWeight:'bold'
    },
    button: {
        height: 40,
        width: 80,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#EDEFEE',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30
    },

    buttonText: {
        color: '#333333',
        fontSize:24,
        fontFamily: 'Markazi',
    },
    msgtext: {
        color: '#333333',
        alignItems: 'center',
        alignSelf: 'center',
        fontSize: 34,
        fontFamily: 'Markazi',
    },
};

export default OnboardingScreen;
