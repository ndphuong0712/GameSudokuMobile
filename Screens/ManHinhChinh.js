import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { LinearGradient } from "expo-linear-gradient";
import taoBangSudoku from '../TaoMaTranSudoku/MaTranSudoku'
import API from '../TaoMaTranSudoku/API'
import '../TaoMaTranSudoku/global'
export default function Time(props) {
    
    const [openbs,setOpenbs] = useState(false)
    const animation = useRef(new Animated.Value(-200)).current
    function open(){
        Animated.timing(
            animation,
            {
                toValue:0,
                duration:300,
                useNativeDriver:false
            }
        ).start();
        setOpenbs(true)
    }
    function close(){
        Animated.timing(
            animation,
            {
                toValue:-200,
                duration:300,
                useNativeDriver:false
            }
        ).start();
        setOpenbs(false)
    }
    return (
        <LinearGradient style ={{flex:1}} colors={["white","#DAF5FF"]}>
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1,padding:15 }}>
                <TouchableOpacity onPress={()=>{
                    props.navigation.navigate('CaiDat')
                }} style={{width:40,justifyContent:"center",alignItems:"center",height:40,borderRadius:100}}>
                    <Icon name="cog-outline" size={30} color="black"></Icon>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 7,alignItems:"center" }}>
                <Text style={{fontSize:70,fontWeight:"900",color:"#9BA4B5"}}>SUDOKU</Text>
                
                <Image style={{height:300,width:'100%'}}source={require('../images/sudoku.png')} resizeMode='cover'></Image>
                
                
            </View>
            <View style={{ flex: 2,alignItems:"center",justifyContent:"center" }}>
                <TouchableOpacity onPress={open} style={{justifyContent:"center",alignItems:"center",borderWidth:2,width:"80%",height:50,borderRadius:30,borderColor:"#3F5BAE"}}>
                    <Text style={{fontSize:18,fontWeight:"700",color:"#3F5BAE"}}>Ván mới</Text>
                </TouchableOpacity>
            </View>
            <Animated.View style={[styles.bottomsheet,{bottom:animation}]}>
                <TouchableOpacity style={{flexDirection:"row",alignItems:"center",marginBottom:10}} onPress={()=>{props.navigation.navigate("Game",{mucdo:"Dễ",manggiatri:taoBangSudoku(9)});close()}}>
                    <Icon name="emoticon-excited-outline" size = {30} color="black"></Icon>
                    <Text style={{fontSize:20,color:"black",marginLeft:10}}>Dễ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:"row",alignItems:"center",marginBottom:10}} onPress={()=>{props.navigation.navigate("Game",{mucdo:"Trung bình",manggiatri:taoBangSudoku(27)});close()}}>
                    <Icon name="emoticon-neutral-outline" size = {30} color="black"></Icon>
                    <Text style={{fontSize:20,color:"black",marginLeft:10}}>Trung bình</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:"row",alignItems:"center",marginBottom:10}} onPress={()=>{props.navigation.navigate("Game",{mucdo:"Khó",manggiatri:taoBangSudoku(54)});close()}}>
                    <Icon name="emoticon-cool-outline" size = {30} color="black"></Icon>
                    <Text style={{fontSize:20,color:"black",marginLeft:10}}>Khó</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={close} style={{position:"absolute",right:0,top:0}}>
                    <Icon name="close-thick" size={30}/>
                </TouchableOpacity>
            </Animated.View>
            {openbs == true ?<View style={styles.background}></View>:null}
        </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    background:{
        position:"absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:"rgba(0,0,0,0.5)"
    },
    bottomsheet:{
        position:'absolute',
        height:200,
        backgroundColor:"white",
        width:"100%",
        paddingHorizontal:10,
        paddingTop:30,
        zIndex:100,
        justifyContent:"center",
        borderTopLeftRadius:15,
        borderTopRightRadius:15
    }
})