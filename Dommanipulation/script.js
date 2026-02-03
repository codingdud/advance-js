let par=document.createElement('p')
let text=document.createTextNode("hello world!");
par.appendChild(text);
let body=document.querySelector("body");
body.appendChild(par);
let button=document.querySelector(".btn")
button.addEventListener("click",(e)=>{
    const span=document.querySelector("#secret");
    span.className="pass flex-box"
    span.innerHTML=randcode()
})
function randcode(){
    let result=[];
    for(let i=0;i<4;i++) result.push(Math.ceil(Math.random()*9))
    return result.join(" ");
}
