function deepCopy(obj,seen=new WeakMap()){
    if(typeof obj!=="object"||obj===null) return obj;
    if(seen.has(obj)) return seen.get(obj);
    const res=Array.isArray(obj)?[]:{};
    seen.set(obj,res);
    for(let i in obj){
        res[i]=deepCopy(obj[i],seen);
    }
    return res;
}

const objj={
    a:[1,2,3,4],
    c:3,
    g:"gramer",
    h:[1,2,3,{q:"query"}]
}
objj.j=objj.h;
let temp =deepCopy(objj);
objj.j[0]=100
console.log(objj)
console.log(temp);