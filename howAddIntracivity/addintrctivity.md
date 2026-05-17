# Adding intractivity in html eg(styling,contetnt)
 - step 1: select element of html using js (using doument api) eg document.querySelectAll("li")
 - step 2: add or change the content by tageting `style or contetn`

*wow, you are now ready add intractivity to html*

```js
const itemArr=document.querySelectAll("li");
const toggle=(e)=>{
    if(e.target.className){
        e.target.className="done";
    }else{
        e.target.className="";
    }
    itemArr.forEach((item)=>{
        item.addEventListener("click",toggle);
    })
}
```
### change contetn
```js
const content=document.querySelector("h1");
content.textContent="Hello World";
```
### change image
```js
const myImage=document.querySelect("img");
myImage.addEventListener("click",()=>{
    const imgSrc=myImage.getAttribute("src");
    if(imgSrc==="./image/chrome.png"){
        myImage.setAttribute("src","./image/firefox.png");
    }else{
        myImage.setAttribute("src","./image/chrome.png");
    }
})
```
## use Event and content
```js
const myHeading=document.querySelector("h1");
const myButton=document.querySelector("button");
function setName(){
    const myName=prompt("enter a name");
    localStorage.setItem("name",myName);
    myHeading.textContent=`chorme is awsome ${myName}`;
}
myButton.addEventListener("click",()=>{
    setName();
})
```