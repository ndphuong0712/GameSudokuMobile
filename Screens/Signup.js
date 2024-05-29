import { SafeAreaView, StyleSheet, Image, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import axios from 'axios';

export default function Signup({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  function checkAccount() {
    if (username === '') {
      Alert.alert('Bạn chưa nhập tên tài khoản!');
      return;
    }
    if (username !== '') {
      if (username.length < 6) {
        Alert.alert('Tên tài khoản phải tối thiểu 6 kí tự!');
        return;
      }
    }
    if (password === '') {
      Alert.alert('Bạn chưa nhập mật khẩu!');
      return;
    }
    if (password !== '') {
      if (password.length < 6) {
        Alert.alert('Mật khẩu phải tối thiểu 6 kí tự!');
        return;
      }
    }
    if (confirmPassword === '') {
      Alert.alert('Bạn chưa nhập xác nhận mật khẩu!');
      return;
    }
    if (confirmPassword !== password) {
      Alert.alert('Mật khẩu và xác nhận mật khẩu không khớp!');
      return;
    }
    axios.get('https://645e6a9912e0a87ac0efd331.mockapi.io/users')
      .then((respone) => {
        
        return respone.data
      }).then((accounts => {
        let check = true
        accounts.forEach(element => {
          if (element.taikhoan === username) {
            
            check = false
          }
        })
        if (check) {
          let fromData = {
            taikhoan: username,
            matkhau: password,
            de: {
              vanchoi: 0,
              vanchoithang: 0,
              thoigianngannhat: '',
              thoigiantrungbinh: '',
              chuoithanghientai: 0,
              chuoithangdainhat: 0,
              vanthangkoloi:0
            },
            trungbinh: {
              vanchoi: 0,
              vanchoithang: 0,
              thoigianngannhat: '',
              thoigiantrungbinh: '',
              chuoithanghientai: 0,
              chuoithangdainhat: 0,
              vanthangkoloi:0
            },
            kho: {
              vanchoi: 0,
              vanchoithang: 0,
              thoigianngannhat: '',
              thoigiantrungbinh: '',
              chuoithanghientai: 0,
              chuoithangdainhat: 0,
              vanthangkoloi:0
            },
            diem: 0,
          };
          axios.post('https://645e6a9912e0a87ac0efd331.mockapi.io/users', fromData)
            .then((respone) => {
              if (respone.data) {
                Alert.alert('Đăng kí thành công. Hãy đăng nhập ngay nào!');
                navigation.goBack();
              }
            })
            .catch((error) => console.log(error));
        }
        else{
          Alert.alert('Tên tài khoản đã tồn tại. Vui lòng nhập tên khác!');
        }
      }))
      .catch((error) => console.log(error));
  }
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.logo}>
        <Image source={require('../images/pastime.png')} style={styles.img} />
        <Text style={styles.text}>SUDOKU</Text>
      </View>
      <View style={styles.items}>
        <Image source={require('../images/user.png')} style={styles.img1} />
        <TextInput style={styles.input} placeholder="Tên tài khoản" onChangeText={(text) => setUsername(text)} />
      </View>
      <View style={styles.items}>
        <Image source={require('../images/lock.png')} style={styles.img1} />
        <TextInput style={styles.input} placeholder="Nhập mật khẩu" secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
      </View>
      <View style={styles.items}>
        <Image source={require('../images/lock.png')} style={styles.img1} />
        <TextInput style={styles.input} placeholder="Xác nhận mật khẩu" secureTextEntry={true} onChangeText={(text) => setConfirmPassword(text)} />
      </View>
      <TouchableOpacity onPress={() => { checkAccount(); }}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgba(85, 88, 255, 1)', 'rgba(0, 192, 255, 1)']} style={styles.item}>
          <Text style={styles.text2}>Đăng kí</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.signup}>
        <Text style={styles.text3}>Bạn đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
          <Text style={styles.text4}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 30,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4294FF',
    marginLeft: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  items: {
    borderRadius: 30,
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30,
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  img1: {
    width: 20,
    height: 20,
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10,
  },
  input: {
    fontSize: 20,
    paddingLeft: 10,
  },
  text1: {
    textAlign: 'right',
    marginRight: 30,
    fontSize: 18,
    marginTop: 15,
  },
  item: {
    borderRadius: 30,
    marginTop: 70,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center',
  },
  text2: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
  },
  signup: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    flexDirection: 'row',
  },
  text3: {
    fontSize: 18,
  },
  text4: {
    fontSize: 18,
    color: '#4294FF',
    fontWeight: 'bold',
  },
});


