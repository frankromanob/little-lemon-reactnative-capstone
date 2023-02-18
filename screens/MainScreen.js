import React, { useState, useEffect } from 'react';
import { TextInput, Text, TouchableOpacity, View, Image, FlatList, ToastAndroid } from "react-native";
import { useFonts } from 'expo-font';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');


const MainScreen = ({ navigation }) => {

    const [menuData, setMenuData] = useState({ menu: [] });

    const [buscar, setBuscar] = useState('');
    const [startersflag, setStartersflag] = useState(false);
    const [mainsflag, setMainsflag] = useState(false);
    const [dessertsflag, setDessertsflag] = useState(false);
    const [drinksflag, setDrinksflag] = useState(false);


    const fetchMenu = () => {

        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS menu('
                    + 'name TEXT, '
                    + 'price REAL, '
                    + 'description TEXT, '
                    + 'category TEXT, '
                    + 'image TEXT ); ');
                tx.executeSql('SELECT * FROM menu;', [], (tx, { rows: { _array } }) => {
                    setMenuData({ menu: _array });
                    resolve(_array.length)
                });
            });
        })
    }

    const fetchMenuJ = async () => {
        const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
        const dataM = await response.json()
        setMenuData({ menu: dataM.menu })
        //Then insert json data on local db
        insertMenu(dataM.menu)
    };

    const insertMenu = (props) => {
        console.log('[---insertando del json---]:', props.length)
        db.transaction((tx) => {
            for (let i = 0; i < props.length; i++) {
                tx.executeSql('insert into menu (name,price,description,category,image) values (?,?,?,?,?)', [props[i].name,
                props[i].price,
                props[i].description,
                props[i].category,
                props[i].image],
                    (tx, results) => { console.log('Inserted:', results.rowsAffected) },
                    error => { console.log(error) }
                    ,);
            }
        })
    }


    useEffect(() => {
        //select data from local db
        (async () => {
            //  If no local data from db, fetch from json
            if (await fetchMenu() === 0) {
                fetchMenuJ();
            }
        })()


    }, []);


    const [fontsLoaded] = useFonts({
        'Markazi': require('../assets/fonts/MarkaziText-Medium.ttf'),
        'Karla': require('../assets/fonts/Karla-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    /////---------for testing----

    const dropTable = () => {
        db.transaction((tx) => {
            tx.executeSql('DROP TABLE IF EXISTS menu', [])
        })
        console.log('----dropped the table----');
    }
    /////////-------


    if (menuData.length === 0) {
        ToastAndroid.show('No menu data', ToastAndroid.TOP, ToastAndroid.LONG);
        console.log('No menu data')
        return null;
    }

    const searchMenu = (props) => {
        let queryflags = '';
        if (startersflag) { queryflags += 'starters,' }
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM menu WHERE name like (?)',
                ['%' + props + '%'], (tx, { rows: { _array } }) => {
                    setMenuData({ menu: _array });
                }, error => { console.log(error) });
        });
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleText}>Little Lemon</Text>
                <View style={{ flexDirection: 'row' }} >
                    <View style={{ flex: 1, flexDirection: 'column' }} >
                        <Text style={styles.titleText1}>Chicago</Text>
                        <Text style={styles.msgtext}>We are a family owned mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                    </View>
                    <Image style={styles.img} source={require("../assets/hero-image.jpg")} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#000', height: 30, borderRadius: 15, margin: 10, }}>
                    <Image style={{ resizeMode: 'stretch', alignItems: 'center', width: 20, height: 20, padding: 10, margin: 5 }} source={require("../assets/search-icon.png")} />
                    <TextInput
                        style={{ justifyContent: 'center', color: 'black', flex: 1, width: 180, backgroundColor: 'white', borderRadius: 20, fontFamily: 'Karla', marginHorizontal: 10, }}
                        placeholder="Search..."
                        onChangeText={(text) => {
                            setBuscar({ ...buscar, text })
                            searchMenu(text)
                        }}
                        value={buscar}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', padding: 5 }}>
                    <TouchableOpacity style={!startersflag ? styles.button : styles.buttonPressed}
                        onPress={() => {
                            setStartersflag(!startersflag)
                            searchMenu(buscar)
                        }}>
                        <Text style={!startersflag ? styles.buttonText : styles.buttonTextPressed}>Starters</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={!mainsflag ? styles.button : styles.buttonPressed} 
                        onPress={() => {
                            setMainsflag(!mainsflag)
                            searchMenu(buscar)
                        }}>
                        <Text style={!mainsflag ? styles.buttonText : styles.buttonTextPressed}>Mains</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={!dessertsflag ? styles.button : styles.buttonPressed} 
                        onPress={() => {
                            setDessertsflag(!dessertsflag)
                            searchMenu(buscar)
                        }}>
                        <Text style={!dessertsflag ? styles.buttonText : styles.buttonTextPressed}>Desserts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={!drinksflag ? styles.button : styles.buttonPressed} 
                        onPress={() => {
                            setDrinksflag(!drinksflag)
                            searchMenu(buscar)
                        }}>
                        <Text style={!drinksflag ? styles.buttonText : styles.buttonTextPressed}>Drinks</Text>
                    </TouchableOpacity>
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
                                <Image style={styles.imgmenu} source={{
                                    uri: `https://github.com/frankromanob/little-lemon-reactnative-capstone/blob/main/assets/${item.image}?raw=true`
                                }}
                                />
                            </View>
                            <View style={{ borderColor: '#333333', borderWidth: 0.2, }} />
                        </View>
                    )}
                    keyExtractor={(item, index) => item.name + index}
                />
            </View>
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
        flex:0.8,
        width: '100%',
        margintop: 5,
        backgroundColor: '#495E57'
    },
    body: {
        flex:1,
        width: '100%',
        backgroundColor: '#EDEFEE'
    },
    img: {
        flex: 0.5,
        height: 170,
        justifyContent: 'center',
        marginRight: 20,
        marginBottom: 5,
        borderRadius: 20,
    },

    button: {
        height: 30,
        width: 80,
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: 5,
        backgroundColor: '#EDEFEE',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPressed: {
        height: 30,
        width: 80,
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: 5,
        backgroundColor: '#495E57',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#333333',
        fontWeight: 'Bold',
    },
    buttonTextPressed: {
        color: '#F4CE14',
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
