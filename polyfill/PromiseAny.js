let p1=new Promise((resolve, reject) => {
    console.log("start 1")
    setTimeout(()=>resolve("Resolve 1"),2000)
})
let p2=new Promise((resolve, reject) => {
    console.log("start 2")
    setTimeout(()=>resolve("Resolve 2"),1000)
})
let p3=new Promise((resolve, reject) => {
    console.log("start 3")
    setTimeout(()=>reject("reject 3"),400)
})


Promise.myany=function(promise){
    return new Promise((res,rej)=>{
        let count=0;
        let failsafe=new Array(promise.length);
        promise.forEach((p,i) => {
            p.then(res).catch(f=>{
                failsafe[i]=f;
                if(++count===promise.length) rej(failsafe)
            })
        });
    })
}
Promise.any([p1,p2,p3]).then(console.log).catch(console.log);
Promise.myany([p3]).then(console.log).catch(console.log);