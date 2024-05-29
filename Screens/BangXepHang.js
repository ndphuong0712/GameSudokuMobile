import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import API from '../TaoMaTranSudoku/API'
const Item = (props)=>{
  return(
    <View style={styles.item}>
          <View style={styles.number}>
            <Text style={styles.textNumber}>{props.index + 1}</Text>
          </View>
          <View style={styles.name}>
          <Text style={styles.text}>{props.data.taikhoan}</Text>
          <Text style={styles.text}>{props.data.diem}</Text>
          </View>
        </View>
  )
}

export default function BangXepHang() {
  useEffect(()=>{
    API("").then(function(res){
        let mang = res
        for(let  i = 0; i < mang.length-1;++i){
            for(let j = i+1;j<mang.length;++j){
                if(mang[i].diem < mang[j].diem){
                    let a = {...mang[i]}
                    mang[i] = {...mang[j]}
                    mang[j] = a
                }
            }
        }
        let mang2 = []
        let sl = mang.length>=10?10:mang.length
        for(let i = 0; i <sl;++i){
            mang2.push(mang[i])
        }
        global.dataBXH = mang2
        setDataBXH(global.dataBXH)
    })
},[global.data])
  const [dataBXH,setDataBXH] = useState(global.dataBXH)
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient style={{ height: 100, justifyContent: "center", alignItems: "center" }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#00337C', '#362FD9', '#537FE7']}>
        <Text style={{ fontSize: 35, fontWeight: 'bold', color: "white" }}>BẢNG XẾP HẠNG</Text>
      </LinearGradient>
      <LinearGradient style={{ flex: 1}} colors={["#4649FF","#153462"]}>
        <FlatList style={{flex: 1, paddingHorizontal: 10}}
          data={dataBXH}
          renderItem={({item,index})=><Item data={item} index={index}/>}
          keyExtractor={item=>item.taikhoan}
          ListHeaderComponent={()=><View style={{height:30}}/>}
        />
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    marginBottom:30
  },
  number: {
    borderWidth: 5,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor:"#00ABB3",
    borderColor:"#B3FFAE"
  }
  ,
  textNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  name:{
    borderRadius:10,
    flex: 1,
    backgroundColor: "#00ABB3",
    paddingHorizontal:10,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  text:{
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  }
})