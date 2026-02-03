const result=document.getElementById("result")

// Attach click handlers using handelEvent (placeholder handlers)
handelEvent('click','#hidden',Throttling(hide,3000));
handelEvent('click','#visible',Throttling(show,3000));
handelEvent('click','#addone',Throttling(add,100));
handelEvent('click','#removeone',remove);
handelEvent('click','#removeall',Debouncing(removeall,1000));
handelEvent('click','#reverse', reverse);

//event Deligation
result.addEventListener("click",(e)=>{
    let child=document.getElementById(e.target.id)
    if(e.target.id.includes("x_")){
        e.target.parentNode.remove();
    }
    
},true)

// Debouncing
function Debouncing(fn,sec){
    let timerf;
    return (...args)=>{
        clearTimeout(timerf);
        timerf=setTimeout(()=>{fn(...args)},sec);
    }
}

// Throttling
function Throttling(fn,sec){
    let flag=true;
    return (...args)=>{
        if(flag){
            flag=false;
            fn(...args)
            setTimeout(()=>{flag=true},sec)
        }
    }
}
// Event handeler function
function handelEvent(type,selector,handeler,capture=false){
    document.querySelector(selector)
    .addEventListener(type,handeler,capture);
}


// hide all box
function hide(e){
    console.log("hello")
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
    let x=document.createElement("span")
    x.id=`x_${id}`
    x.textContent="x";
    x.classList="close";
    temp.id=id;
    temp.innerText=id;
    temp.classList="box"
    temp.appendChild(x);
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