function Throttling1(fn,sec){
    let flag=true;
    return (...arg)=>{
        if(flag){
            flag=false;
            fn(...arg);
            setTimeout(_=>{flag=true},sec)
        }
    }
}

// support for trailling arg

function ThrottlingTrailling(fn,sec){
    let lastran=false;
    let trailingArg=null;
    return function(...arg){
        if(!lastran){
            lastran=true;
            fn.apply(this,arg);
            setTimeout(()=>{
                if(trailingArg){
                    fn.apply(this,trailingArg);
                    trailingArg=null;
                }
                lastran=false;
            },sec)
        }else{
            trailingArg=arg;
        }
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Throttling1, ThrottlingTrailling };
}
if (typeof global !== 'undefined') {
    global.Throttling1 = Throttling1;
    global.ThrottlingTrailling = ThrottlingTrailling;
}
