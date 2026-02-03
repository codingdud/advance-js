let obj={
    a:1,
    c:2,
    get getc(){return this.c*4},
    set setc(x){this.c=x;},
}
Object.defineProperties(obj,{
    geta:{
        get(){return this.a*2},
        configurable:true,
        enumerable:true,
    },
    seta:{
        set(x){this.a=x},
    },
    val:{
        value:10,
        writable:true,
        enumerable:false,
    },
    calculate:{
        value:function(){return this.a*this.c;}
        // When called as obj.calculate(), 'this' dynamically binds to 'obj'

    }
})
obj.seta=10;
console.log(obj.geta)
obj.setc=20;
console.log(obj.getc)
console.log(obj.val)
console.log(obj.calculate())



/* 
    Data Descriptor - Can have:
    value
    writable ✓
    configurable ✓
    enumerable ✓
    Accessor Descriptor - Can have:
    get ✓
    set ✓
    configurable ✓
    enumerable ✓
    NOT writable ❌
    NOT value ❌
 */