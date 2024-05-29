//Chuỗi kí tự
// var ckt = "123456789"

//Tạo mảng 9x9
// var mang = new Array(9);
// for(let i = 0; i < mang.length;++i){
//     mang[i] = new Array(9)
// }

//Kiểm tra ngang
function ktn(kt,mang){
    for(let i = 0 ; i < mang.length;++i){
        if(kt == mang[i]){
            return false
        }
    }
    return true
}

// Kiểm tra dọc
function ktd(kt,mang,cot){
    for(let i = 0; i < mang.length ; ++i){
        if(kt == mang[i][cot]){
            return false
        }
    }
    return true
}

//kiểm tra vùng
function ktv(kt,mang,vtx,vty){
    let x,y;
    if(vtx < 3) x = 0
    else if(vtx < 6) x = 3
    else x = 6
    if(vty < 3) y = 0
    else if(vty < 6) y = 3
    else y = 6
    for(let i = x;i<x+3;i++){
        for(let j = y;j<y+3;j++){
            if(kt == mang[i][j]){
                return false
            }
        }
    }
    return true
}

// var k = [0]
// console.log(k[0])
// var k = 0
function sudoku(x,y,ckt,mang,k){
    if(x == 9){
        k[0] = 1;
        return;
    }
    else{
        for(let i = 0; i < ckt.length;++i){
            if(ktn(ckt[i],mang[x]) && ktd(ckt[i],mang,y) && ktv(ckt[i],mang,x,y)){
                let xx,yy
                if(y<8){
                    yy = y+1
                    xx = x
                }
                else{
                    yy = 0
                    xx = x+1
                }
                let ckt2 = taoChuoiNgauNhien()
                mang[x][y] = ckt[i]
                sudoku(xx,yy,ckt2,mang,k)
                if(k[0] == 1) return;
                mang[x][y] = undefined
            }
        }
    }
}
//Random kí tự từ 1 mảng
function randomkt(kt){
    let tong = kt.length
    let vt = Math.floor(Math.random()*10)
    let buocnhay = 9/tong;
    for(let i = 1; i <= tong;++i){
        if(vt <= buocnhay*i) {
            let a = kt[i-1]
            kt.splice(i-1,1)
            return a;
        }    
    }
}

function taoChuoiNgauNhien(){
    let mang1 = ["1","2","3","4","5","6","7","8","9"];
    let mang2 ="";
    for(let i = 0; i <9;++i){
        mang2 += randomkt(mang1)
    }
    return mang2
}


//Random kí tự từ 1 mảng(ko bỏ kí tự được random)
function randomkt2(kt){
    let tong = kt.length
    let vt = Math.floor(Math.random()*10)
    let buocnhay = 9/tong;
    for(let i = 1; i <= tong;++i){
        if(vt <= buocnhay*i) {
            let a = kt[i-1]
            // kt.splice(i-1,1)
            return a;
        }    
    }
}


//Tạo mảng vị trí cần ẩn
function randomHidden(sl){
    let arr = ["0","1","2","3","4","5","6","7","8"]
    let arr2=[]
    for(let i = 0;i<sl;++i){
        let hidden
        do{
            hidden = randomkt2(arr) + randomkt2(arr)
        }while(arr2.indexOf(hidden) != -1)
        arr2.push(hidden)
    }
    return arr2;
}

// Xóa giá trị từ mảng hidden
function hiddenSudoku(mang,manghidden){
    for(let z = 0;z<manghidden.length;++z){
        let check = 0;
        for(let i = 0; i < 9;++i){
            if(check == 1) break;
            for(let j = 0; j < 9;++j){
                let ij = ""+i+j;
                if(ij == manghidden[z]){
                    mang[i][j] = undefined;
                    check = 1;
                    break;
                }
            }
        }
    }
}

function taoBangSudoku(slhidden){
    //Tạo mảng 9x9
    let mang = new Array(9);
    for(let i = 0; i < mang.length;++i){
        mang[i] = new Array(9)
    }
    let ckt = taoChuoiNgauNhien()
    let k = [0];
    sudoku(0,0,ckt,mang,k)
    let manghidden = randomHidden(slhidden)
    hiddenSudoku(mang,manghidden)
    return mang
}
//Kiểm tra khi nhập 1 số trong game
function kiemtra(kt,mang,hang,cot){
    if(ktn(kt,mang[hang]) && ktd(kt,mang,cot) && ktv(kt,mang,hang,cot)) return true;
    return false
}
//Copy 1 mảng 2 chiều
function copyMang2Chieu(mang2chieu){
    let mang = new Array(mang2chieu.length)
    for(let i= 0; i < mang.length;++i){
        mang[i] = new Array(mang2chieu[i].length)
    }
    for(let i=0;i<mang.length;++i){
        for(let j=0;j<mang[i].length;++j){
            mang[i][j]= mang2chieu[i][j]
        }
    }
    return mang
}
function taoMangCell(manggiatri){
    let mangCell = new Array(9);
    for (let i = 0; i < mangCell.length; ++i) {
        mangCell[i] = new Array(9)
    }
    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            mangCell[i][j] = { giatri: manggiatri[i][j], duocsua: manggiatri[i][j] != undefined ? 0 : 1, duocchon: 0, trongvungduocchon: 0, dung: manggiatri[i][j] != undefined ? 1 : -1 };
        }
    }
    return mangCell
}
export default taoBangSudoku
export {kiemtra,copyMang2Chieu,taoMangCell}