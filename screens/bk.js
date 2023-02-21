db.transaction((tx) => {
    tx.executeSql('select * from menu; ', [], (txObj, { rows: { _array } }) => { console.log('select---', _array); setMenuData(_array) }, (txObj, error) => console.log('Error', error))
})

fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
    .then((response) => response.json())
    .then((data) => { setMenuData(data) });



[{ "category": null, "description": null, "image": null, "name": null, "price": null }, 
 { "category": null, "description": null, "image": null, "name": null, "price": null }, 
 { "category": null, "description": null, "image": null, "name": null, "price": null }, 
 { "category": null, "description": null, "image": null, "name": null, "price": null }, 
 { "category": null, "description": null, "image": null, "name": null, "price": null }, 
 { "category": null, "description": null, "image": null, "name": null, "price": null }, 
 { "category": null, "description": null, "image": null, "name": null, "price": null }, 
 { "category": "starters", "description": "Our delicious salad is served with Feta cheese and peeled cucumber. Includes tomatoes, onions, olives, salt and oregano in the ingredients.", "image": "greekSalad.jpg", "name": "Greek Salad", "price": 12.99 }, { "category": "starters", "description": "Delicious grilled bread rubbed with garlic and topped with olive oil and salt. Our Bruschetta includes tomato and cheese.", "image": "bruschetta.jpg", "name": "Bruschetta", "price": 7.99 }, { "category": "mains", "description": "Fantastic grilled fish seasoned with salt.", "image": "grilledFish.jpg", "name": "Grilled Fish", "price": 20 }, { "category": "mains", "description": "Delicious pasta for your delight.", "image": "pasta.jpg", "name": "Pasta", "price": 6.99 }, { "category": "desserts", "description": "You can't go wrong with this delicious lemon dessert!", "image": "lemonDessert.jpg", "name": "Lemon Dessert", "price": 4.99 }]


 <Text style={styles.titleTextb}>Order for delivery</Text>

 <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.button} title="Hola" onPress={() => { dropTable() }}>
                    <Text style={styles.buttonText}>Drop menu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} title="Hola" onPress={() => { insertMenu() }}>
                    <Text style={styles.buttonText}>Save Menu</Text>
                </TouchableOpacity>
            </View>


'%' + props + '%',


"expo-image-picker": "^14.1.0",

const [loaded] = useFonts({
    'Karla': require('../assets/fonts/Karla-Regular.ttf'),
    'Markazi': require('../assets/fonts/MarkaziText-Regular.ttf'),
});

if (!loaded) {
    return null;
}