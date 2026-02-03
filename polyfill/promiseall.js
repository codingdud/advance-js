Promise.myall=function(promises){
    return new Promise((res,rej)=>{
        let result=new Array(promises.length);
        count=0;
        promises.forEach((p,i) => {
                p.then(x=>{
                    result[i]=x;
                    if(++count==promises.length) res(result);
                }
            ).catch(rej)
        });

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
//Promise.all([p1,p2]).then(console.log).catch(console.log)
//Promise.myall([p1,p2]).then(console.log).catch(console.log)
