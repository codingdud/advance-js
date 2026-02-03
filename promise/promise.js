let cart=["shoes","hat","pajama"];

createOrder(cart).then(id=>{
    console.log(id)
    return id;
})
.then(id=>procidetoPayment(id))
.then(paymentid=>{console.log(paymentid)})
.catch(err=>console.log(err));

function createOrder(cart){
    return new Promise((res,rej)=>{
        if(!valid(cart)){
            rej(new Error("cart is not valid"))
        }else{
            setTimeout(()=>res(1101),5000);
        }
    })}
function valid(cart){
    return true;
}
function procidetoPayment(orderID){
    console.log(orderID);
    return new Promise((resolve,_)=>resolve(123456));
}