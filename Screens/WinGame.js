import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/Feather'
import { LinearGradient } from "expo-linear-gradient";
import taoBangSudoku from '../TaoMaTranSudoku/MaTranSudoku'
import '../TaoMaTranSudoku/global'
export default function WinGame(props) {
    var mucdo = props.route.params.mucdo == "Dễ" ? "de" : props.route.params.mucdo == "Trung bình" ? "trungbinh" : "kho"
  return (
    <LinearGradient style ={{flex:1}} colors={["#62CDFF","#3E54AC"]}>
    <ImageBackground style={styles.container} source={props.route.params.coKLM==true?require('../images/wingameklm.png'):require('../images/wingame.png')} resizeMode='stretch'>
      <View style={{flex:1,marginTop:250,alignItems:"center",justifyContent:"space-between"}}>
        {props.route.params.coKLM==true?null:<Text style={styles.textXCM}>XIN CHÚC MỪNG</Text>}
        <View style = {styles.content}>
            <View style={styles.content1}>
            <Text style={styles.text}><Icon2 name="bar-chart" size= {20}/>   Độ khó</Text>
            <Text style={styles.text}>{props.route.params.mucdo}</Text>
            </View>
            <View style={styles.content1}>
            <Text style={styles.text}><Icon2 name="clock" size= {20} />   Thời gian</Text>
            <Text style={styles.text}>{props.route.params.thoigian}</Text>
            </View>
            <View style={styles.content1}>
            <Text style={styles.textKLM}><Icon2 name="clock" size= {20} />   Thời gian ngắn nhất</Text>
            <Text style={styles.textKLM}>{props.route.params.coKLM==true?props.route.params.thoigian:global.data[mucdo].thoigianngannhat}</Text>
            </View>
        </View>
        <View style = {styles.btn_view}>
            <TouchableOpacity style={styles.btn1} onPress={()=>{
                if(props.route.params.mucdo == "Dễ"){
                    props.navigation.navigate('Game',{mucdo:"Dễ",manggiatri:taoBangSudoku(9)})
                }
                else if(props.route.params.mucdo == "Trung bình"){
                    props.navigation.navigate('Game',{mucdo:"Trung bình",manggiatri:taoBangSudoku(27)})
                }
                else{
                    props.navigation.navigate('Game',{mucdo:"Dễ",manggiatri:taoBangSudoku(54)})
                }
            }}>
                <Text style={styles.textBlue}>Ván mới</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn2} onPress={()=>props.navigation.navigate("Home")}>
                <Text style={styles.text}><Icon name = "home" size={20}></Icon> Màn hình chính</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:"#6DA9E4"
    },
    content:{
        width:330,
        height:170,
        borderRadius:10,
        borderWidth:1,
        borderColor:"#B6EAFA",
        justifyContent:"space-between",
        padding:20
    },
    text:{
        fontSize:17,
        fontWeight:700,
        color:"white"
    },
    content1:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    btn_view:{
        height:100,
        width:"70%",
        marginBottom:50,
        justifyContent:"space-between",
        alignItems:"center"
    },
    btn1:{
        borderRadius:30,
        alignItems:"center",
        padding:10,
        backgroundColor:"white",
        width:"100%"
    },
    textKLM:{
        fontSize:17,
        fontWeight:700,
        color:"yellow"
    },
    textBlue:{
        fontSize:17,
        fontWeight:700,
        color:"#537FE7"
    },
    btn2:{
        borderRadius:30,
        alignItems:"center",
        padding:5
    },
    icon:{
        marginRight:10
    },
    textXCM:{
        fontSize:25,
        fontWeight:700,
        color:"white",
        position:"absolute",
        top:-78
    }
})