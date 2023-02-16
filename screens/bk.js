db.transaction((tx) => {
    tx.executeSql('select * from menu; ', [], (txObj, { rows: { _array } }) => {console.log('select---',_array);setMenuData(_array) },(txObj, error) => console.log('Error', error))
})