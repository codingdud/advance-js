const original = [{ name: "Alice" }, { name: "Bob", skills: ["JS", "C++"] }];
//const copy=structuredClone(original)
//const copy=JSON.parse(JSON.stringify(original))
const copy=deepCopy(original)
function deepCopy(obj){
    if(obj===null||typeof obj!=="object") return obj;
    const res=(Array.isArray(obj))?[]:{};
    for(let i in obj){
        res[i]=deepCopy(obj[i]);
    }
    return res;
}

console.log(original);
console.log(copy)