function Debouncing(fn,sec){
    let timerf;
    return (...arg)=>{
        clearTimeout(timerf);
        timerf=setTimeout(()=>fn(...arg),sec);
    }
}
// support for this
function Debouncingtrailing(fn,sec){
    let timerf;
    return function(...arg){
        clearTimeout(timerf);
        timerf=setTimeout(()=>fn.call(this,...arg),sec);
    }
}

//leading
function Debouncingleading(fn,sec){
    let timerf;
    let isCalled=false;
    return function(...arg){
        if(!isCalled){
            isCalled=true;
            fn.call(this,...arg);
        }
        clearTimeout(timerf);
        timerf=setTimeout(()=>{
            fn.call(this,...arg)
        },sec);
    }
}

//leadingandtrailing
function Debouncingleadingandtrail(fn,sec){
    let timerf;
    let isCalled=false;
    return function(...arg){
        if(!isCalled) {
            isCalled=true;
            fn.call(this,...arg);
        }
        clearTimeout(timerf);
        timerf=setTimeout(()=>{
            isCalled=false;
            fn.call(this,...arg)
        },sec);
    }
}

const input=document.querySelector("input");
const inputevent=(e)=>{
    console.log(e.target.value)
}
input.addEventListener("input",Debouncingleadingandtrail(inputevent,2000))