function fun(one=10,two=20,...args){
    //for(let x of arguments) console.log(x);
    console.log(one,two,args);
}
fun(1)
fun(1,2,3,4,5,6,7);
fun(null,undefined,3,4,5,6,7);
arr=[1,2,3,4,5];
fun(...arr);