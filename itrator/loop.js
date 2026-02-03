let arr=[1,2,3,4,5];
for(let val of arr){
    console.log(val);
}
let len=arr.length;
while(len--) console.log(arr[len]);
for(let i in arr){
    console.log(i);
}
len=arr.length-1;
do{
    console.log(arr[len]);
}while(len--);
arr.forEach(val=>console.log(val));


console.log(arr.filter(x=>x>1));
console.log(arr.map(x=>x+2));
console.log(arr.flatMap(x=>[x,x+1]));
console.log(arr.find(x=>x>2));
console.log(arr.reduce((acc,val)=>val+acc,0));

function itratorpattern(){
    let n=0;
    let done=false;
    return {
        [Symbol.iterator](){
            return this;
        },
        next:()=>{
            n+=10;
            if(n>50) done=true;
            return {value:n,done:done};
        }
    }
}
for(let x of itratorpattern()){
    console.log("itrator:",x);
}
function* generator(){
    yield 1;
    yield 2;
    yield 3;
}
let it=generator();
for( let i of it) console.log(i);