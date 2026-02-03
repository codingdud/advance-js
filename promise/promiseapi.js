let p1=new Promise((resolve, reject) => {
    console.log("start 1")
    setTimeout(()=>resolve("Resolve 1"),2000)
})
let p2=new Promise((resolve, reject) => {
    console.log("start 2")
    setTimeout(()=>resolve("Resolve 2"),1000)
})
let p3=new Promise  ((resolve, reject) => {
    console.log("start 3")
    setTimeout(()=>reject("reject 3"),400)
})

Promise.all([p1,p2]).then(x=>console.log(x)).catch(x=>console.log(x));
Promise.race([p1,p2,p3]).then(x=>console.log(x)).catch(x=>console.log(x));
Promise.any([p1,p2,p3]).then(x=>console.log(x)).catch(x=>console.log(x));