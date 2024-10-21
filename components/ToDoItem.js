import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";

function ToDoItem(props) {
    const [isChecked, setChecked] = useState(props.isDone); // Checkbox-Status von der prop übernehmen

    function doneTaskHandler() {
        setChecked(!isChecked);
        props.onToggleTask(); // Den Status in der App umschalten
    }

    return (
        <View style={[styles.container, props.isDone && styles.doneTask]}>
            <View style={styles.checkboxContainer}>
                <Checkbox color={'#545F71'} value={isChecked} onValueChange={doneTaskHandler} />
            </View>
            <Text style={[styles.textStyle, props.isDone && styles.doneText]}>{props.text}</Text>
            <View style={styles.iconsContainer}>
                <Pressable onPress={props.onEditItem}>
                    <Image style={styles.iconStyle} source={require('../assets/icons/pencil.png')} />
                </Pressable>
                <Pressable onPress={props.onDeleteItem.bind(this, props.id)}>
                    <Image style={styles.iconStyle} source={require('../assets/icons/trash.png')} />
                </Pressable>
            </View>
        </View>
    );
}

export default ToDoItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderWidth: 2,
        borderColor: '#545F71',
        borderRadius: 5,
        marginBottom: 15,
    },
    textStyle: {
        fontSize: 14,
        margin: 15,
        color: '#545F71',
    },
    iconsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    iconStyle: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    checkboxContainer: {
        marginLeft: 10,
    },
    doneTask: {
        backgroundColor: '#EEF1F4', // Ausgegrauter Hintergrund für erledigte Aufgaben
        borderColor: '#9BA5B7'
    },
    doneText: {
        color: '#9BA5B7'
    }
});
