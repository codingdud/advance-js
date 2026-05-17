setTimeout(() =>callback(10), 1000);
callback=(val)=>console.log(val);
var result=false
let mypromise=new Promise((resolve,reject)=>{
    if(result){
        resolve("Promise resolved  successfully");
    }
    else{
        reject("Promise rejected");
    }
})
mypromise.then(mes=>console.log(mes)).catch(err=>console.log(err));

let p1=new Promise((resolve, reject) => {
    console.log("start 1")
    setTimeout(()=>resolve("Resolve 1"),1000)
})
let p2=new Promise((resolve, reject) => {
    console.log("start 2")
    setTimeout(()=>resolve("Resolve 2"),1000)
})
async function resolver(){
    console.log("start async function");
    let a=await p1;
    console.log("promise 1");
    console.log(a);
    let b=await p2;
    console.log("promise 2");
    console.log(b);
}
console.log(resolver())

