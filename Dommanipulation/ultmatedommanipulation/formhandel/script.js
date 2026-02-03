const form=document.getElementById("Myform")
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const result=document.getElementById("result");
    let formData=new FormData(form);
    console.log(Object.fromEntries(formData))
     for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
        let temp=document.createElement('p');
        temp.textContent=`${key}: ${value}`
        temp.style="padding:4px; color:green;"
        result.appendChild(temp);
    }
    result.style="visibility:visible"
    form.reset();
})

const button=document.getElementById("resetBt")
let cb=(e)=>{
    form.reset();
    const result=document.getElementById("result");
    result.innerHTML="";
    result.style="visibility:hidden"
}
button.addEventListener("click",throtal(cb,3000))

//throtal

function throtal(fn,sec){
    let temp=true;
    return (...arg)=>{
        if(temp){
            temp=false;
            fn(...arg)
            setTimeout(()=>{temp=true},sec);
        }
    }
}

function debouncing(fn,sec){
    let temp;
    return (...arg)=>{
        clearInterval(temp);
        temp=setTimeout(()=>{
            fn(...arg)
        },sec)
    }
}