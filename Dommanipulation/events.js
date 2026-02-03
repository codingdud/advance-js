/* //button diffrent event handeling
//click
const btn=document.getElementById("btn")
btn.addEventListener('click',(e)=>{
    console.log(e.target)
})
//input
const input=document.getElementById("name")
input.addEventListener("input",(e)=>{
    console.log(e.target.value)
})
//scroll
const box=document.getElementById("box")
let count=0;
box.addEventListener("scroll",()=>{
    console.log(count++);
})
//keypress
document.addEventListener("keydown",(e)=>{
    console.log("key press:",e.key);
})
//dom contetnt loaded
document.addEventListener("DOMContentLoaded",()=>{
    console.log("completed dom constrction")
}) */

function handelevent(type,selector,handeler,capture=false){
    document.querySelector(selector)
    .addEventListener(type,handeler,capture);
}
/* 
  - Parent (ul) listener catches it
1️⃣ Capturing Phase  (Window → Target)
  - Click happens on <li>
2️⃣ Target Phase
  - Event bubbles up
3️⃣ Bubbling Phase  (Target → Window)

event.target → original element
event.currentTarget → element with listener
 */
handelevent("click","#list",(e)=>{
    console.log(e.target.innerHTML)
    console.log(e.target.textContent)
})

function Debounce(fn,delay){
    let timerf;
    return (...arr)=>{
        clearTimeout(timerf);
        timerf=setTimeout(()=>fn(...arr),delay);
    }
}
function Throtteling(fn,delay){
    let flag=false;
   return (...arg)=>{
    if(!flag){
        flag=true;
        fn(...arg);
        setTimeout(()=>{flag=false},delay);
    }
   }
}
handelevent("input","#name",Debounce((e)=>console.log(e.target.value),1000));
handelevent("click","#btn",Throtteling((e)=>console.log("clicked"),1000));

//event bubbling and capturing
//e.stopPropagation();
var capture=true;

handelevent("click","#grandparent",(e)=>console.log("bubble grand parent"));
handelevent("click","#parent",(e)=>{console.log("bubble parent");});
handelevent("click","#child",(e)=>console.log("bubble child"));

handelevent("click","#grandparent",(e)=>console.log("capture grand parent"),capture);
handelevent("click","#parent",(e)=>{console.log("capture parent"); },capture);
handelevent("click","#child",(e)=>console.log("capture child"),capture);

