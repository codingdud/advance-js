const original = [{ name: "Alice" }, { name: "Bob", skills: ["JS", "C++"] }];
//const copy=structuredClone(original)
//const copy=JSON.parse(JSON.stringify(original))
const copy=deepCopy(original);

copy[1].name="Animesh"
copy[1].skills.push("c++","javascript")
console.log(original);
console.log(copy)


// deep copy function impliment for nested array and object 
function deepCopy(obj){
    if(obj===null || typeof obj!=="object") return obj;
    if(Array.isArray(obj)) return obj.map(deepCopy);
    
    const cloneobj={};
    if(typeof obj==="object"){
        for(let [key,value] of Object.entries(obj)){
            let temp=deepCopy(value);
            cloneobj[key]=temp;
        }
    }
    return cloneobj;
}
