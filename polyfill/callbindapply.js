let Persone={
    fname:"Animesh",
    lname:"kumar"
}
let Persone2={
    fname:"Aniket",
    lname:"kumar"
}
function Details(city,state){
    console.log(`${this.fname} ${this.lname} ${city} ${state}`);
}
Function.prototype.mycall=function(context,...args){
    context.fn=this;
    return context.fn(...args);
}
Function.prototype.myapply=function(context,args){
    context.fn=this;
    return context.fn(...args);
}
Function.prototype.mybind=function(...arg1){
    return (...arg2)=>{
        return this.mycall(...arg1,...arg2);
    }
}

Details.call(Persone,"ranchi","jharkhand")
Details.mycall(Persone,"ranchi","jharkhand")
Details.apply(Persone,["delhi","gurugram"])
Details.myapply(Persone,["delhi","gurugram"])
Details.bind(Persone,"huryna","ragisthan")();
Details.mybind(Persone,"huryna")("ragisthan");
