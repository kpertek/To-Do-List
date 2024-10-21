import React, { useState, useRef, useEffect } from 'react';
import { Modal, TextInput, View, StyleSheet, Pressable, Image, TouchableWithoutFeedback } from 'react-native';

function ToDoInput(props) {
    const inputRef = useRef();
    const [enteredToDoText, setEnteredToDoText] = useState(props.initialText || '');

    function ToDoItemInputHandler(enteredText) {
        setEnteredToDoText(enteredText);
    }

    function addToDoItemHandler() {
        props.onAddToDoItem(enteredToDoText);
        setEnteredToDoText('');
    }

    useEffect(() => {
        setEnteredToDoText(props.initialText || ''); // Setze den Text bei Änderungen der props
    }, [props.initialText]);

    return (
        <Modal visible={props.visible} animationType='fade' transparent={true} onShow={() => setTimeout(() => inputRef.current.focus(), 100)}>
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.overlay} />
            </TouchableWithoutFeedback>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Add a new To-Do item'
                    onChangeText={ToDoItemInputHandler}
                    value={enteredToDoText}
                    ref={inputRef}
                />
                <View style={styles.buttonContainer}>
                    <Pressable onPress={addToDoItemHandler}>
                        <Image style={styles.iconStyle} source={require('../assets/icons/arrow-circle-right.png')} />
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

export default ToDoInput;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        paddingTop: 18,
        paddingBottom: 18,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    buttonContainer: {
    },
    textInput: {
        borderWidth: 1,
        width: '100%',
        borderRadius: 5,
        padding: 8,
    },
    iconStyle: {
        width: 46,
        height: 46,
    },
});
