Array.prototype.mymap=function(fn){
    let res=new Array(this.length);
    for(let i=0;i<this.length;i++){
        res[i]=fn(this[i],i);
    }
    return res;
}
Array.prototype.myForEach=function(fn){
    for(let i=0;i<this.length;i++){
        fn(this[i],i);
    }
}
Array.prototype.myReduce=function(fn,idata){
    let res=idata;
    for(let i=0;i<this.length;i++){
        res=fn(res,this[i],i);
    }
    return res;
}
Array.prototype.filter=function(fn){
    let res=[];
    for(let i=0;i<this.length;i++){
        if(fn(this[i],i)) res.push(this[i]);
    }
    return res;
}
Array.prototype.fill=function(val){
    for(let i=0;i<this.length;i++){
        this[i]=val;
    }
}

