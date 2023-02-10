import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image, ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'expo-checkbox';
import { MaskedTextInput } from "react-native-mask-text";


const ProfileScreen = ({ navigation }) => {

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

    useEffect(() => {
        retrieveData()
    }, [])


    let userProfile = {
        pic: '',
        firstname: '',
        lastname: '',
        phone: '',
        order: false,
        password: false,
        offers: false,
        news: false,
    }

    clearData = async (userProfile) => {
        try {
            await AsyncStorage.removeItem('userProfile');
        } catch (error) {
            // Error removing data
            console.log(error)
        }
    };
    retrieveData = async () => {
        try {
            const jsonProfile = await AsyncStorage.getItem('userProfile');
            console.log(jsonProfile);
            if (userProfile !== null) {
                setProfileState(JSON.parse(jsonProfile));
            }
        } catch (error) {
            console.log(error)
            // Error retrieving data
        }
    };

    saveData = async () => {
        try {
            await AsyncStorage.setItem('userProfile',JSON.stringify(profileState));
        } catch (error) {
            console.log(error)
            // Error savin data
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.msgtext}>Personal information</Text>
            <View>
                <Image style={{ width: 90, height: 90, borderRadius: 50, justifyContent: 'center' }} source={require("../assets/Profile.png")} />
            </View>

            <View style={styles.fields}>
                <Text style={styles.labels}>First Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setProfileState({ ...profileState, firstName: text })}
                    value={profileState.firstName}
                />
                <Text style={styles.labels}>Last Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setProfileState({ ...profileState, lastName: text })}
                    value={profileState.lastName}
                />
                <Text style={styles.labels}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setProfileState({ ...profileState, email: text })}
                    value={profileState.email}
                />
                <Text style={styles.labels}>Phone number</Text>
                <MaskedTextInput
                    mask='(999)999-9999'
                    style={styles.input}
                    onChangeText={(text) => setProfileState({ ...profileState, phone: text })}
                    value={profileState.phone}
                />
            </View>
            <Text style={styles.msgtext}>Email notifications</Text>
            <View style={styles.noti}>
                <CheckBox
                    value={profileState.orderNoti}
                    onValueChange={(newValue) => setProfileState({ ...profileState, orderNoti: newValue })}
                    color={profileState.orderNoti ? '#495E57' : '#333333'}
                />
                <Text style={styles.labels} >Order status</Text>
            </View>
            <View style={styles.noti}>
                <CheckBox 
                    value={profileState.passwordNoti}
                    onValueChange={(newValue) => setProfileState({ ...profileState, passwordNoti: newValue })}
                    color={profileState.passwordNoti ? '#495E57' : '#333333'}
                />
                <Text style={styles.labels} >Password changes</Text>
            </View>
            <View style={styles.noti}>
                <CheckBox 
                    value={profileState.offersNoti}
                    onValueChange={(newValue) => setProfileState({ ...profileState, offersNoti: newValue })}
                    color={profileState.offersNoti ? '#495E57' : '#333333'}
                />
                <Text style={styles.labels} >Special offers</Text>
            </View>
            <View style={styles.noti}>
                <CheckBox
                    value={profileState.newsNoti}
                    onValueChange={(newValue) => setProfileState({ ...profileState, newsNoti: newValue })}
                    color={profileState.newsNoti ? '#495E57' : '#333333'}
                />
                <Text style={styles.labels} >Newsletter</Text>
            </View>
            <TouchableOpacity style={styles.buttony} title="Hola" onPress={() => { clearData();navigation.navigate('Onboarding') }}>
                <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.buttonw} title="Hola" onPress={() => { navigation.goBack() }}>
                    <Text style={styles.buttonText}>Discard changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttong} title="Hola" onPress={() => {
                    saveData();
                    ToastAndroid.show('Profile saved!',ToastAndroid.CENTER,ToastAndroid.LONG)
                }}>
                    <Text style={styles.buttonTextw}>Save changes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#EDEFEE',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    fields: {
        margin: 10,
        flexDirections: 'column',
        width: '90%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    noti: {
        margin: 10,
        flexDirection: 'row',
    },
    top: {
        flex: 0.2,
        height: 60,
        width: '100%',
    },
    input: {
        width: '100%',
        padding: 3,
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderRadius: 10,
        borderColor: '#333333',
        borderWidth: 1,
        fontSize: 14
    },
    labels: {
        fontSize: 14,
        alignSelf: 'flex-start',
        color: '#333333',
    },
    checks: {
        color: '#495E57',

    },
    footer: {
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
    },
    buttony: {
        height: 40,
        width: '90%',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#F4CE14',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttong: {
        height: 40,
        width: '40%',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#495E57',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonw: {
        height: 40,
        width: '40%',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#EDEFEE',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#333333',
        fontWeight: 'bold',
    },
    buttonTextw: {
        color: '#EDEFEE',
        fontWeight: 'bold',
    },
    msgtext: {
        color: '#333333',
        alignSelf: 'flex-start',
        fontSize: 18,
        fontWeight: 'bold',
    },
};

export default ProfileScreen;
