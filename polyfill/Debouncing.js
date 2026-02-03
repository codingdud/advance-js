function Debouncing1(fn,sec){
    let timerf;
    return (...arg)=>{
        clearTimeout(timerf);
        timerf=setTimeout(()=>fn(...arg),sec);
    }
}
// support for this
function Debouncing2(fn,sec){
    let timerf;
    return function(...arg){
        clearTimeout(timerf);
        timerf=setTimeout(()=>fn.call(this,...arg),sec);
    }
}
