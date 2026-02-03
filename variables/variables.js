// let var const in js
{
    var a=10; //non blocking scop
    let b=20; // block scoped
    const c=30;// block scoped
    // const j; must be initialize
    //c=130; cant be update or reintialized
    console.log(c)
}
console.log(a); // ok 
//console.log(b); //not ok
