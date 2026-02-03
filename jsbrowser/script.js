/* let b=100;
var a=10;
{
    let a=120;
    function add(n){
        if(n==0) return 0;
        return n+add(n-1);
    }
    console.log(add(8))
}

let cart=["shoes","hat","pajama"];
let pr=createOrder(cart);
//console.log(pr);
pr.then(id=>{console.log(id)})
.catch(err=>console.log(err));

function createOrder(cart){
    let pr=new Promise((res,rej)=>{
        if(!valid(cart)){
            rej(new Error("cart is not valid"))
        }else{
            setTimeout(()=>res(1101),5000);
        }
    })
    return pr;
}
function valid(cart){
    return false;
} */

// let flag = false;

// function a() {
//   return Promise.resolve().then(() => {
//     flag = true;
//     return false;
//   });
// }

// function b() {
//   return a().then((res) => {
//     flag = res;
//   });
// }

// b();

// Promise.resolve().then(() => {
//   console.log(flag);
// });
let p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("A");
  }, 1000);
});

p1.then(data=>console.log(data));