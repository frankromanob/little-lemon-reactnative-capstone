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
                    <Image style={styles.img} source={require("../assets/hero-image.jpg")} />
                </View>
            </View>
            <View>
                <Text style={styles.titleTextb}>Order for delivery</Text>
                <View style={{ flexDirection: 'row', padding:10,margin:5 }}>
                    <TouchableOpacity style={styles.button} title="Hola" onPress={() => { }}>
                        <Text style={styles.buttonText}>Starters</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} title="Hola" onPress={() => {  }}>
                        <Text style={styles.buttonText}>Mains</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} title="Hola" onPress={() => {  }}>
                        <Text style={styles.buttonText}>Desserts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} title="Hola" onPress={() => {  }}>
                        <Text style={styles.buttonText}>Drinks</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.body}>
                <Text style={styles.titleText}>Our Menu</Text>
                <FlatList
                    data={menuData.menu}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.titleTextb}>{item.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.msgtextb}>{item.description}</Text>
                                    <Text style={styles.msgtextb}>{item.price}</Text>
                                </View>
                                <Image style={styles.imgmenu} source={{ uri: imgUriComplete(item.image) }} />
                            </View>
                            <View style={{borderColor: '#333333', borderWidth: 0.2, opacity:10}} />
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
        flex: .4,
        width: '100%',
        margintop: 10,
        backgroundColor: '#495E57'
    },
    body: {
        flex: 0.6,
        width: '100%',
        justifyContent: 'space-around',
        margintop: 10,
        backgroundColor: '#EDEFEE'
    },
    img: {
        flex: 0.5,
        height: 180,
        justifyContent: 'center',
        marginRight: 20,
        marginBottom: 20,
        borderRadius: 20,
    },

    button: {
        height: 30,
        width: 80,
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal:5,
        backgroundColor: '#EDEFEE',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
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
        justifyContent: 'flex-start',
        fontSize: 12,
        marginLeft: 20,
        marginBottom: 10,
        fontFamily: 'Karla',
        width: 220,
    },
    imgmenu: {
        flex: 0.8,
        height: 90,
        width: 30,
        justifyContent: 'flex-end',
        marginRight: 5,
        marginLeft: 5,
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
