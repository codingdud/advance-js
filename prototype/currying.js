// curring is trandforming a function into series of function that take one argument at a time 

function multiply(x,y){
    console.log(x*y);
}
let multiplyby2=multiply.bind(null,2);
let multiplyby3=multiply.bind(null,3);

multiplyby2(3)
multiplyby3(3)

function multi(x){
    return (y)=>{
        console.log(x*y);
    }
}
let multiplybytwo=multi(2);
let multiplybyhtree=multi(3);

multiplybytwo(2);
multiplybyhtree(3);