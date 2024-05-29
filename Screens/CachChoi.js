import { StyleSheet, Text, Image, SafeAreaView , View} from 'react-native';
import React, { useState } from 'react';

export default function CachChoi() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Image source={require('../images/row.png')} style={styles.img} />
        <Text style={styles.text}>Hàng ngang: Phải có đủ các số từ 1 đến 9, không trùng số và không cần đúng thứ tự.</Text>
      </View>
      <View style={styles.body}>
        <Image source={require('../images/column.png')} style={styles.img} />
        <Text style={styles.text}>Hàng dọc: Đảm bảo có đủ các số từ 1 đến 9, không trùng số, không cần đúng thứ tự.</Text>
      </View>
      <View style={styles.body}>
        <Image source={require('../images/block.png')} style={styles.img} />
        <Text style={styles.text}>Mỗi vùng 3x3: Phải có đủ các số từ 1 đến 9 và không trùng số nào trong cùng 1 vùng 3x3.</Text>
      </View>
      <View style={styles.body}>
        <Image source={require('../images/selection.png')} style={styles.img} />
        <Text style={styles.text}>Chọn 1 ô, sau đó nhấn vào một số để điền vào ô.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 110,
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: 'black',
    textAlign: 'justify',
  },
  img: {
    width: 100,
    height: 100,
  },
})