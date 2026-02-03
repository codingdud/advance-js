Promise.mysettleall=function(promises){
    return new Promise((res,rej)=>{
        let pass=new Array(promises.length);
        let count=0;
        promises.forEach((x,i)=>{
            x.then(y=>{
                pass[i]={status:"fullfiled",value:y};
                if(++count===promises.length) res(pass);
            }).catch(y=>{
                pass[i]={status:"rejected",reason:y};
                if(++count===promises.length) res(pass);
            })
        })
    })
}

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

Promise.mysettleall([p1,p2,p3]).then(console.log)
Promise.allSettled([p1,p2,p3]).then(console.log)