
const result=document.getElementById("result")
// Attach click handlers using handelEvent (placeholder handlers)
handelEvent('click','#hidden',Throttling(hide,4000));
handelEvent('click','#visible',Throttling(show,3000));
handelEvent('click','#addone',Throttling(add,100));
handelEvent('click','#removeone',remove);
handelEvent('click','#removeall',Debouncing(removeall,1000));
handelEvent('click','#reverse', reverse);

const child=result.children
console.log(child)
// hide all box
function hide(e){
    result.style="visibility:hidden";
}
// show box
function show(e){
    result.style.visibility="visible";
}
// Add box
function add(e){
    let id=result.childElementCount+1
    let temp=document.createElement("div");
    temp.id=id;
    temp.innerText=id;
    temp.classList="box"
    result.appendChild(temp)
}
//remove
function remove(e){
    //result.removeChild(result.lastChild)
    result.lastChild.remove()
}
//remove all
function removeall(e){
    result.innerHTML="";
    //result.remove() //not work
}
// reverse
function reverse(e){
    if(result.style.flexDirection==="row"){
        result.style.flexDirection="row-reverse";
        result.style.flexWrap="wrap-reverse";
    }
    else{ 
        result.style.flexDirection="row";
        result.style.flexWrap="wrap";
    }
}
// Handel Event
function handelEvent(type,selector,handeler,capture=false){
    document.querySelector(selector)
    .addEventListener(type,handeler,capture);
}

// Debouncing
function Debouncing(fn,sec){
    let timerf;
    return (...args)=>{
        clearTimeout(timerf)
        setTimeout(_=>{fn(...args)},sec);
    }
}
// Throttling
function Throttling(fn,sec){
    let flag=true;
    return (...args)=>{
        if(flag){
            flag=false;
            fn(...args);
            setTimeout(_=>{flag=true},sec);
        }
    }
}

/* const hidden=document.getElementById("hidden")
const visible=document.getElementById("visible")
const addone=document.getElementById("addone")
const removeone=document.getElementById("removeone")
const removeall=document.getElementById("removeall")
const reverse=document.getElementById("reverse") */

