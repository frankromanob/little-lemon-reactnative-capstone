import React, { useState, useEffect } from 'react';
import { Text, TextInput, Image, TouchableOpacity, View, ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'expo-checkbox';
import { MaskedTextInput } from "react-native-mask-text";
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation }) => {

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

       // console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setProfileState({ ...profileState, pic: result.assets[0].uri })
        }
    };

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

    clearData = async () => {
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
            const jsonValue= JSON.parse(jsonProfile);
            if (jsonValue !== null) {
                setProfileState(jsonValue);
            }
        } catch (error) {
            console.log(error)
            // Error retrieving data
        }
    };

    saveData = async () => {
        try {
            await AsyncStorage.setItem('userProfile', JSON.stringify(profileState));
        } catch (error) {
            console.log(error)
            // Error saving data
        }
    };

    const [loaded] = useFonts({
        'Karla': require('../assets/fonts/Karla-Regular.ttf'),
        'Markazi': require('../assets/fonts/MarkaziText-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.msgtext}>Personal information</Text>
            </View>
            <View style={styles.top}>
                <View style={{flexDirection:'column', alignSelf:'center'}}>
                <Text style={{alignSelf:'center',marginRight:20,fontSize:18,fontFamily:'Markazi'}}>Avatar</Text> 
                    {profileState.pic ? <Image source={{ uri: profileState.pic }} resizeMode='contain' style={{marginRight:20,alignSelf: 'center', justifyContent: 'center', width: 90, height: 90, borderRadius: 50 }} /> :
                        <Image
                            style={{ marginRight:20, width: 90, height: 90, borderRadius: 50, alignSelf: 'center', justifyContent: 'center' }}
                            source={require('../assets/profileicon.png')}
                            resizeMode='contain' />
                    }
                    </View>
                    <View style={styles.avatar}>
                    <TouchableOpacity style={styles.buttongtop} title="Change avatar" onPress={pickImage}>
                        <Text style={styles.buttonTextw}>Change</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonwtop} title="Remove avatar" onPress={() => { setProfileState({ ...profileState, pic: false }); }}>
                        <Text style={styles.buttonText}>Remove</Text>
                    </TouchableOpacity>
                </View>
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
            <TouchableOpacity style={styles.buttony} title="Hola" onPress={() => { {clearData()}; setProfileState({}); navigation.popToTop(); }}>
                <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.buttonw} title="Discard changes" onPress={() => { navigation.goBack() }}>
                    <Text style={styles.buttonText}>Discard changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttong} title="Save changes" onPress={() => {
                    {saveData()};
                    ToastAndroid.show('Profile saved!', ToastAndroid.TOP, ToastAndroid.LONG);
                    navigation.navigate('MainScreen')
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
        fontFamily: 'Karla',
        marginHorizontal:10
    },
    top: {
        marginBottom:20,
        fontFamily: 'Markazi',
        paddingHorizontal: 30,
        textAlign:'center',
        height: 80,
        width: '100%',
        marginLeft: 10,
        marginTop: 20,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        minWidth:'50%',
    },
    input: {
        width: '100%',
        padding: 3,
        paddingHorizontal:10,
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderRadius: 10,
        borderColor: '#333333',
        borderWidth: 1,
        fontSize: 14,
        fontFamily:'Karla'
    },
    labels: {
        fontSize: 18,
        alignSelf: 'flex-start',
        color: '#333333',
        fontFamily: 'Markazi',
        fontWeight:'Bold',
        paddingHorizontal:5
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

    avatar: {
        marginRight: 10,
        paddingTop: 25,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf:'center',
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
        marginHorizontal:10,
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
    buttongtop: {
        height: 40,
        width: 100,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#495E57',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal:3,
    },
    buttonwtop: {
        height: 40,
        width: 100,
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal:3,
        backgroundColor: '#EDEFEE',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#333333',
        fontWeight: 'Bold',
        fontFamily: 'Karla',
    },
    buttonTextw: {
        color: '#EDEFEE',
        fontWeight: 'Bold',
        fontFamily: 'Karla',
    },
    msgtext: {
        color: '#333333',
        alignSelf: 'flex-start',
        fontSize: 24,
        fontWeight: 'Bold',
        fontFamily: 'Markazi',
        paddingHorizontal:10
    },
};

export default ProfileScreen;
