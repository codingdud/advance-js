function Throttling1(fn,sec){
    let flag=true;
    return (...arg)=>{
        if(flag){
            flag=false;
            fn(...arg);
            setTimeout(_=>{flag=true},sec)
        }
    }
}
// support for this 
function Throttling2(fn,sec){
    let flag=true;
    return function (...arg){
        if(flag){
            flag=false;
            fn.call(this,...arg);
            setTimeout(_=>{flag=true},sec)
        }
    }
}
