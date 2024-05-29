import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import "../TaoMaTranSudoku/global"
const Text1 = (props) => {
  return (
    <TouchableOpacity style={styles.borderBottom} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
      {props.value == props.sailam?<Icon name="check" size={20} color="#0081C9"></Icon>:null}
    </TouchableOpacity>
  )
}
export default function GioiHanSaiLam() {
  const [sailam,setSailam] = useState(global.sailam)
  return (
    <View style={{ flex: 1,backgroundColor:"white" }}>
      <Text1 value = {3} title="3 sai lầm" onPress={()=>{setSailam(3);global.sailam=3}} sailam = {sailam}/>
      <Text1 value = {5} title="5 sai lầm" onPress={()=>{setSailam(5);global.sailam=5}} sailam = {sailam}/>
      <Text1 value = {10} title="10 sai lầm" onPress={()=>{setSailam(10);global.sailam=10}} sailam = {sailam}/>
      <Text1 value = {100} title="Không giới hạn sai lầm" onPress={()=>{setSailam(100);global.sailam=100}} sailam = {sailam}/>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: "black",
    lineHeight: 50,
  },
  borderBottom: {
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderBottomColor:"#BDCDD6",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  }
})