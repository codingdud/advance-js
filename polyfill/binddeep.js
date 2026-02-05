Function.prototype.mybind=function(...arg1){
    return (...arg2)=>{
        return this.mycall(...arg1,...arg2);
    }
}
Function.prototype.mycall=function(context,...args){
    if(!context) context={};
    context.fn=this;
    return context.fn(...args);
}
let Persone={
    fname:"Animesh",
    lname:"kumar"
}
let Persone2={
    fname:"Aniket",
    lname:"gupta"
}

function Details(city,state){
    console.log(`${this.fname} ${this.lname} ${city} ${state}`);
}

Details.mybind(Persone,"ranchi")("jharkhand");
Details.bind(Persone2,"ranchi")("jharkhand");
let bindcall=Details.bind(Persone,"ranchi");
bindcall.call(Persone2,"delhi")
let mybindcall=Details.mybind(Persone,"ranchi");
mybindcall.mycall(Persone2,"daradun")





