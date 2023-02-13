import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image, FlatList } from "react-native";
import { useFonts } from 'expo-font';


const MainScreen = ({ navigation }) => {


    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
            .then((response) => response.json())
            .then((data) => { setMenuData(data); });
    }, []);


    const [fontsLoaded] = useFonts({
        'Markazi': require('../assets/fonts/MarkaziText-Medium.ttf'),
        'Karla': require('../assets/fonts/Karla-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }
    const imgUri1 = 'https://github.com/frankromanob/little-lemon-reactnative-capstone/blob/main/assets/'
    const imgUri2 = '?raw=true'

    const imgUriComplete = (image) => {
        const uricompleta = imgUri1 + image + imgUri2;
        console.log(uricompleta);
        return (uricompleta)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleText}>Little Lemon</Text>
                <View style={{ flex: 1, flexDirection: 'row' }} >
                    <View style={{ flex: 1, flexDirection: 'column' }} >
                        <Text style={styles.titleText1}>Chicago</Text>
                        <Text style={styles.msgtext}>We are a family owned mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                    </View>
                    <Image style={styles.img} source={require("../assets/grilledFish.jpg")} />
                </View>
            </View>
            <View style={styles.body}>
                <Text style={styles.titleText}>Our Menu</Text>
                {console.log(menuData.menu)}
                <FlatList
                    data={menuData.menu}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.titleTextb}>{item.name}</Text>
                                <Text style={styles.msgtextb}>{item.description}</Text>
                                <Text style={styles.msgtextb}>{item.price}</Text>
                            </View>
                            <Image style={styles.imgmenu} source={{ uri: imgUriComplete(item.image) }} />
                        </View>
                    )}
                    keyExtractor={(item, index) => item.id}
                />
            </View>
            <TouchableOpacity style={styles.button} title="Hola" onPress={() => { navigation.navigate('Profile') }}>
                <Text style={styles.buttonText}>My profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#EDEFEE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: .5,
        width: '100%',
        margintop: 10,
        backgroundColor: '#495E57'
    },
    body: {
        flex: 0.7,
        width: '100%',
        justifyContent: 'space-around',
        margintop: 10,
        backgroundColor: '#EE9972'
    },
    img: {
        flex: 1,
        height: '90%',
        justifyContent: 'center',
        marginRight: 20,
        marginBottom: 20,
        borderRadius: 50,
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
        fontWeight: 'Bold',
    },
    msgtext: {
        flex: 1,
        color: '#EDEFEE',
        justifyContent: 'center',
        fontSize: 14,
        marginLeft: 20,
        margintop: 5,
        fontFamily: 'Karla',
        width: 150,
    },
    msgtextb: {
        flex: 1,
        color: '#333333',
        justifyContent: 'space-between',
        fontSize: 12,
        marginLeft: 20,
        marginBottom:10,
        fontFamily: 'Karla',
        width:80,
    },
    imgmenu: {
        flex: .5,
        height: 60,
        width: 30,
        justifyContent: 'center',
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 5,
    },
    titleText: {
        fontFamily: 'Markazi',
        color: '#F4CE14',
        justifyContent: 'flex-start',
        marginLeft: 10,
        fontSize: 42,
        fontWeight: 'Bold',
    },
    titleText1: {
        color: '#EDEFEE',
        justifyContent: 'flex-start',
        marginLeft: 10,
        fontSize: 30,
        fontFamily: 'Markazi'
    },
    titleTextb: {
        color: '#333333',
        justifyContent: 'flex-start',
        marginLeft: 10,
        fontSize: 26,
        fontFamily: 'Markazi'
    },
};

export default MainScreen;
