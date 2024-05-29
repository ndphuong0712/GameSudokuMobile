import { Alert, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import taoBangSudoku, { copyMang2Chieu, taoMangCell } from '../TaoMaTranSudoku/MaTranSudoku';
import { kiemtra } from '../TaoMaTranSudoku/MaTranSudoku';
import Icon from "react-native-vector-icons/FontAwesome5"
import { ThoiGianText, ThoiGian, SoSanhThoiGian, ThoiGianTrungBinh } from '../TaoMaTranSudoku/ThoiGian';
import "../TaoMaTranSudoku/global"
import API from '../TaoMaTranSudoku/API';
const kiemtrahoanthanh = (mang) => {
    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            if (mang[i][j].dung != 1) return false
        }
    }
    return true
}
var ThoiGianBatDau
export default function Game(props) {
    useEffect(() => { manggiatri = copyMang2Chieu(props.route.params.manggiatri); setMangSudoku(taoMangCell(manggiatri)); setLoi(0); setThoigian(ThoiGianText(0, 0)); giay.current = 1 }, [props.route.params.manggiatri])
    var soloitoida = global.sailam
    var manggiatri = copyMang2Chieu(props.route.params.manggiatri)
    useEffect(() => {
        ThoiGianBatDau = setInterval(() => {
            ThoiGian((phut, giay) => { setThoigian(ThoiGianText(phut, giay)) }, giay.current++);
        }
            , 1000)
        return () => {
            clearInterval(ThoiGianBatDau)
        }
    }, [props.route.params.manggiatri])
    const giay = useRef(1)
    const [mangSudoku, setMangSudoku] = useState(taoMangCell(manggiatri))
    const [loi, setLoi] = useState(0)
    const [thoigian, setThoigian] = useState(ThoiGianText(0, 0))

    var mangSo = []
    for (let i = 1; i <= 9; ++i) {
        mangSo.push(
            <TouchableOpacity key={i} onPress={() => {
                let mang2 = Array.from(mangSudoku);
                let mang3 = new Array(9)
                for (let m = 0; m < mang3.length; ++m) {
                    mang3[m] = new Array(9)
                }
                for (let ii = 0; ii < 9; ++ii) {
                    for (let jj = 0; jj < 9; ++jj) {
                        mang3[ii][jj] = mang2[ii][jj].giatri
                    }
                }
                for (let ii = 0; ii < 9; ++ii) {
                    for (let jj = 0; jj < 9; ++jj) {
                        if (mang2[ii][jj].duocchon == 1 && mang2[ii][jj].duocsua == 1) {
                            mang2[ii][jj].giatri = i;
                            mang3[ii][jj] = undefined;
                            if (kiemtra(i, mang3, ii, jj)) mang2[ii][jj].dung = 1
                            else {
                                mang2[ii][jj].dung = 0
                                setLoi(loi + 1)
                                if (loi + 1 == soloitoida) {
                                    let mucdo = props.route.params.mucdo == "Dễ" ? "de" : props.route.params.mucdo == "Trung bình" ? "trungbinh" : "kho"
                                    let data = {
                                        [mucdo]: {
                                            "vanchoi": global.data[mucdo].vanchoi + 1,
                                            "vanchoithang": global.data[mucdo].vanchoithang,
                                            "thoigianngannhat": global.data[mucdo].thoigianngannhat,
                                            "vanthangkoloi": global.data[mucdo].vanthangkoloi,
                                            "thoigiantrungbinh": global.data[mucdo].thoigiantrungbinh,
                                            "chuoithanghientai": 0,
                                            "chuoithangdainhat": global.data[mucdo].chuoithangdainhat
                                        },
                                        diem:global.data.diem==0?0:global.data.diem - 5
                                    }
                                    let options = { method: 'PUT', headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }

                                    if (global.id != 0) {
                                        API(global.id, options).then(function () {
                                            API(global.id).then(function (res) {
                                                global.data = res
                                            })
                                        })
                                    }

                                    Alert.alert("Trò chơi kết thúc", `Bạn đã thua vì mắc ${loi + 1} lỗi`, [{ text: "Lại từ đầu", onPress: () => { setMangSudoku(taoMangCell(manggiatri)); setLoi(0); setThoigian(ThoiGianText(0, 0)); giay.current = 1; } }, { text: "Màn hình chính", onPress: () => { props.navigation.navigate("Home") } }])
                                }

                            }
                        }
                    }
                }
                setMangSudoku(mang2);
                if (kiemtrahoanthanh(mangSudoku)) {
                    clearInterval(ThoiGianBatDau)
                    let mucdo = props.route.params.mucdo == "Dễ" ? "de" : props.route.params.mucdo == "Trung bình" ? "trungbinh" : "kho"
                    let coKLM = SoSanhThoiGian(thoigian, global.data[mucdo].thoigianngannhat) == false ? true : false
                    let data = {
                        [mucdo]: {
                            "vanchoi": global.data[mucdo].vanchoi + 1,
                            "vanchoithang": global.data[mucdo].vanchoithang+1,
                            "thoigianngannhat": coKLM == true? thoigian:global.data[mucdo].thoigianngannhat,
                            "vanthangkoloi":loi == 0? global.data[mucdo].vanthangkoloi+1:global.data[mucdo].vanthangkoloi,
                            "thoigiantrungbinh": ThoiGianTrungBinh(global.data[mucdo].thoigiantrungbinh,global.data[mucdo].vanchoithang,thoigian),
                            "chuoithanghientai": global.data[mucdo].chuoithanghientai+1,
                            "chuoithangdainhat": global.data[mucdo].chuoithanghientai==global.data[mucdo].chuoithangdainhat?global.data[mucdo].chuoithanghientai+1:global.data[mucdo].chuoithangdainhat
                        },
                        diem:mucdo=='de'?global.data.diem+5:mucdo=='trungbinh'?global.data.diem+20:global.data.diem+50
                    }
                    let options = { method: 'PUT', headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }

                    if (global.id != 0) {
                        API(global.id, options).then(function () {
                            API(global.id).then(function (res) {
                                global.data = res
                            })
                        })
                    }
                    props.navigation.navigate("WinGame", { mucdo: props.route.params.mucdo, thoigian: thoigian, coKLM: coKLM})
                }
            }}>
                <Text style={{ fontSize: 50, color: "#3F5BAE" }}>{i}</Text>
            </TouchableOpacity>
        )
    }
    var mang = []
    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            mang.push(
                <TouchableWithoutFeedback key={"" + i + j} onPress={() => {
                    let mang2 = Array.from(mangSudoku);
                    for (let ii = 0; ii < 9; ++ii) {
                        for (let jj = 0; jj < 9; ++jj) {
                            mang2[ii][jj].duocchon = 0
                            mang2[ii][jj].trongvungduocchon = 0
                        }
                    }
                    for (let ii = 0; ii < 9; ++ii) {
                        mang2[ii][j].trongvungduocchon = 1
                        mang2[i][ii].trongvungduocchon = 1
                    }
                    let vtx, vty;
                    if (i <= 2) vtx = 0;
                    else if (i <= 5) vtx = 3
                    else vtx = 6
                    if (j <= 2) vty = 0;
                    else if (j <= 5) vty = 3
                    else vty = 6
                    for (let ii = vtx; ii < vtx + 3; ++ii) {
                        for (let jj = vty; jj < vty + 3; ++jj) {
                            mang2[ii][jj].trongvungduocchon = 1
                        }
                    }
                    mang2[i][j].duocchon = 1
                    setMangSudoku(mang2);


                }}>
                    <View style={{ height: 40, width: "11%", backgroundColor: mangSudoku[i][j].duocchon == 0 ? mangSudoku[i][j].trongvungduocchon == 0 ? "white" : "#E9E9F3" : mangSudoku[i][j].dung != 0 ? "#C1D2FE" : "#FFC1C1", justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "gray", borderBottomWidth: i == 2 || i == 5 ? 4 : 1, borderRightWidth: j == 2 || j == 5 ? 4 : 1 }}>
                        <Text style={{ fontSize: 20, color: mangSudoku[i][j].duocsua == 0 ? "black" : mangSudoku[i][j].dung == 0 ? "red" : "#00CCFF" }}>{mangSudoku[i][j].giatri}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }
    return (
        <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "#F7F8FD" }}>
            <View style={{ flex: 1.5, justifyContent: "flex-end" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.text}>{props.route.params.mucdo}</Text>
                    {soloitoida != 100 ? <Text style={styles.text}>Lỗi: {loi}/{soloitoida}</Text> : null}
                    <Text style={styles.text}>{thoigian}</Text>
                </View>
            </View>
            <View style={{ flex: 5, backgroundColor: "white", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignContent: "center", borderRadius: 5 }}>
                {
                    mang
                }
            </View>
            <View style={{ flex: 3.5, justifyContent: "center" }}>
                <View style={{ height: "80%", backgroundColor: "white", elevation: 10, shadowColor: "black", borderRadius: 10 }}>
                    <View style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity style={{ padding: 10, borderRadius: 30 }} onPress={() => {
                            let mang2 = Array.from(mangSudoku);
                            for (let ii = 0; ii < 9; ++ii) {
                                for (let jj = 0; jj < 9; ++jj) {
                                    if (mang2[ii][jj].duocchon == 1 && mang2[ii][jj].duocsua == 1) {
                                        mang2[ii][jj].giatri = undefined;
                                        mang2[ii][jj].dung = -1;
                                    }
                                }
                            }
                            setMangSudoku(mang2);
                        }}>
                            <View>
                                <Icon name={"eraser"} size={30} color={"#83818C"} />
                                <Text style={{ fontSize: 20, color: "#83818C" }}>Xóa</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2, justifyContent: "space-evenly", alignItems: "center", flexDirection: "row" }}>
                        {
                            mangSo
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: "#BBBBBB"
    }
})