function add(x,y,z){
    return x+y+z
}

const addcurry=x=>y=>z=>x+y+z;
/*
(x)=>(y)=>(z)=>x+y+z;
(x)=>{
    return (y)=>{
        return (z)=>x+y+z;
    }
}
*/
console.log(addcurry(1)(2)(3));