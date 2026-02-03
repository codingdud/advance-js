function pairExist(num){
    let str=num.toString();
    let map=new Map();
    for(let ch of str) map.set(ch,(map.get(ch)||0)+1);
    for(let val of map.values()) if(val%2!==0) return false;
    return true;
}
console.log(pairExist(12233));