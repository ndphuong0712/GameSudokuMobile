import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
export default function CaiDat(props) {
    return (
        <View style={{ flex: 1,backgroundColor:"white" }}>
            <TouchableOpacity style={styles.borderBottom} onPress={() => {props.navigation.navigate("CachChoi") }}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Icon name="lightbulb-on-outline" size={25}/>
                    <Text style={styles.text}>Cách chơi</Text>
                </View>
                <Icon name="chevron-right" size={30}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.borderBottom} onPress={() => {props.navigation.navigate("GioiHanSaiLam") }}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Icon name="close-circle-outline" size={25}/>
                    <Text style={styles.text}>Giới hạn sai lầm</Text>
                </View>
                <Icon name="chevron-right" size={30}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: "black",
        lineHeight: 50,
        marginLeft:10
    },
    borderBottom: {
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        borderBottomColor: "#BDCDD6",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})