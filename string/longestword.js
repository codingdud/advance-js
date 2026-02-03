function longestwordinarr(str){
    return str.split(" ").reduce((acc,x)=>acc.length<x.length?x:acc,"")
}
console.log(longestwordinarr("hello world!"));