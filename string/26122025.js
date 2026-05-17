function maxnumberafterKSwaps(num, k) {
    let arrStr = num.split("");
    let len = arrStr.length;
    for (let i = 0; i < arrStr.length-1 && k > 0 && arrStr[i] < "5"; i++) {
        arrStr[i] = '5';
        k--;
    }
    for (let i = len - 1; i >= 0 && k > 0 && arrStr[i] !== '5'; i--) {
        arrStr[i] = '5';
        k--;
    }
    if (k > 0) return "IMPOSIBLE";
    return arrStr.join(""); 
}
console.log(maxnumberafterKSwaps("254", 2));
console.log(maxnumberafterKSwaps("16823456", 2));
console.log(maxnumberafterKSwaps("678324234", 6));