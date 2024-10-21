import { Image, View, StyleSheet, Pressable } from "react-native";

function AddItemButton(props) {
    return (
        <View>
            <Pressable onPress={props.onPress}>
                <View style={style.buttonContainer}>
                    <Image style={style.iconStyle} source={require('../assets/icons/plus.png')} />
                </View>
            </Pressable>
        </View>
    );

}

export default AddItemButton;

const style = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#545F71',
        borderRadius: 50,
        width: 60,
        height: 60,
    },
    iconStyle: {
        width: 32,
        height: 32,
    },
})