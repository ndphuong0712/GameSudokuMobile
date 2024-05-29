function ThoiGianText(phut, giay) {
    if (phut < 10) phut = "0" + phut
    if (giay < 10) giay = "0" + giay;
    return phut + ":" + giay
}
function ThoiGian(callback,giay) {
    let phut = Math.floor(giay/60)
    let giay1 = giay - 60*phut
    callback(phut, giay1)
}
function ChuyenGiaySangPhut(giay){
    let phut = Math.floor(giay/60)
    let giay1 = giay - 60*phut
    return ThoiGianText(phut,giay1)
}
function ChuyenPhutSangGiay(tg){
    let mangTG = tg.split(':').map(function(a){
        return Number(a)
    })
    return mangTG[0]*60+mangTG[1]
}
function SoSanhThoiGian(tg1,tg2){
    // tg1>=tg2 => true
    // tg1<tg2 => false
    if(tg2 == "") return false
    if(ChuyenPhutSangGiay(tg1) < ChuyenPhutSangGiay(tg2)) return false
    return true
} 
function ThoiGianTrungBinh(tgtb,sovan,tg){
    if(tgtb == "") tgtb = "00:00"
    let tongtg = ChuyenPhutSangGiay(tgtb)*sovan+ChuyenPhutSangGiay(tg)
    let ss = Math.ceil(tongtg/(sovan+1))
    return ChuyenGiaySangPhut(ss)
} 
export {ThoiGianText,ThoiGian,SoSanhThoiGian,ThoiGianTrungBinh}