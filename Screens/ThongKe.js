import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import "../TaoMaTranSudoku/global"
export default function ThongKe(props) {
  //1:dễ  2:trung bình 3:khó
  useEffect(() => {
    if (mucdo == 1) setData(global.data.de)
    else if (mucdo == 2) setData(global.data.trungbinh)
    else setData(global.data.kho)
  }, [global.data,dangnhap])
  const [mucdo, setMucdo] = useState(1)
  const [data, setData] = useState(global.data.de)
  const [dangnhap,setDangnhap] = useState(0)
  return (
    <SafeAreaView style={styles.wrap}>
      <ImageBackground source={require('../images/background.jpg')} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.header} onPress={() => {global.id==0? props.navigation.navigate('DangNhap'):null }}>
            <Image source={require('../images/avt.png')} style={styles.img} />
            <Text style={styles.text}>{global.data.taikhoan}</Text>
          </TouchableOpacity>
          {global.id != 0?<View style={{ zIndex:1000,position: 'absolute', top: 100, height: 70, width: "100%", flexDirection: "row", alignItems: "center" }}>
            <Text  style={{ flex: 1, fontSize: 20, color: "black", paddingLeft: 20 }}>Điểm: {global.data.diem}</Text>
            <TouchableOpacity style={{alignSelf:"flex-end"}} onPress={()=>{
              global.id = 0
              global.data = global.dataKoTaiKhoan
              setDangnhap(dangnhap+1)
            }}>
              <Text style={{fontSize:18,paddingRight:5}}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>:null}
        
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => { setMucdo(1); setData(global.data.de) }}>
              <Text style={mucdo == 1 ? styles.text1 : styles.text2}>Dễ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setMucdo(2); setData(global.data.trungbinh) }}>
              <Text style={mucdo == 2 ? styles.text1 : styles.text2}>Trung bình</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setMucdo(3); setData(global.data.kho) }}>
              <Text style={mucdo == 3 ? styles.text1 : styles.text2}>Khó</Text>
            </TouchableOpacity>
          </View>
          {mucdo == 1 ? <View style={styles.hrde} /> : null}
          {mucdo == 2 ? <View style={styles.hrtb} /> : null}
          {mucdo == 3 ? <View style={styles.hrkho} /> : null}
        </View>
      </ImageBackground>
      <ScrollView>
        <View style={styles.content}>
          <Image source={require('../images/conquer.png')} style={styles.img1} />
          <Text style={styles.text3}>Trò chơi</Text>
        </View>
        <View style={styles.items}>
          <View style={styles.item}>
            <Text style={styles.text4}>Ván chơi đã bắt đầu</Text>
            <Text style={styles.text5}>{data.vanchoi}</Text>
          </View>
          <View style={styles.hr1} />
          <View style={styles.item}>
            <Text style={styles.text4}>Ván chơi đã thắng</Text>
            <Text style={styles.text5}>{data.vanchoithang}</Text>
          </View>
          <View style={styles.hr1} />
          <View style={styles.item}>
            <Text style={styles.text4}>Tỉ lệ chiến thắng</Text>
            <Text style={styles.text5}>{data.vanchoi == 0 ? "" : Math.round(Number(data.vanchoithang) / Number(data.vanchoi) * 100 * 100) / 100 + "%"}</Text>
          </View>
          <View style={styles.hr1} />
          <View style={styles.item}>
            <Text style={styles.text4}>Ván thắng không lỗi</Text>
            <Text style={styles.text5}>{data.vanthangkoloi}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Image source={require('../images/hourglass.png')} style={styles.img1} />
          <Text style={styles.text3}>Thời gian</Text>
        </View>
        <View style={styles.items}>
          <View style={styles.item}>
            <Text style={styles.text4}>Thời gian ngắn nhất</Text>
            <Text style={styles.text5}>{data.thoigianngannhat}</Text>
          </View>
          <View style={styles.hr1} />
          <View style={styles.item}>
            <Text style={styles.text4}>Thời gian trung bình</Text>
            <Text style={styles.text5}>{data.thoigiantrungbinh}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Image source={require('../images/star.png')} style={styles.img1} />
          <Text style={styles.text3}>Chuỗi thắng</Text>
        </View>
        <View style={styles.items}>
          <View style={styles.item}>
            <Text style={styles.text4}>Chuỗi thắng hiện tại</Text>
            <Text style={styles.text5}>{data.chuoithanghientai}</Text>
          </View>
          <View style={styles.hr1} />
          <View style={styles.item}>
            <Text style={styles.text4}>Chuỗi thắng dài nhất</Text>
            <Text style={styles.text5}>{data.chuoithangdainhat}</Text>
          </View>
        </View>
        <View style={{ height: 20 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menu: {
    flexDirection: 'row',
    paddingTop: 70,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 50,
    marginLeft: 20,
  },
  text: {
    fontSize: 20,
    marginTop: 50,
    paddingLeft: 10,
    color: 'black',
  },
  text1: {
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  hrde: {
    backgroundColor: 'blue',
    height: 2,
    width: 22,
    marginBottom: 5,
    marginLeft: 15,
  },
  hrkho: {
    backgroundColor: 'blue',
    height: 2,
    width: 30,
    marginBottom: 5,
    marginLeft: 185,
  },
  hrtb: {
    backgroundColor: 'blue',
    height: 2,
    width: 88,
    marginBottom: 5,
    marginLeft: 67,
  },
  containerbody: {
    color: 'white',
  },
  content: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img1: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  text3: {
    fontSize: 19,
    paddingLeft: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  items: {
    backgroundColor: 'whitesmoke',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    borderRadius: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  text4: {
    flex: 2,
    fontSize: 16,
  },
  text5: {
    flex: 1,
    fontSize: 19,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  hr1: {
    backgroundColor: 'black',
    height: 1,
    marginLeft: 15,
    marginRight: 15,
  },
});
