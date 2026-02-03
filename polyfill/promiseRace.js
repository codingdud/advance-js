Promise.myrace = function(promises){
    return new Promise((res,rej)=>{
        promises.forEach(x=>{
            x.then(res).catch(rej)
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

Promise.myrace([p1,p2,p3]).then(console.log).catch(console.log)
Promise.race([p1,p2,p3]).then(console.log).catch(console.log)
