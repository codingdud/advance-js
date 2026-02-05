function *generator(){
    const a=yield 1;
    const b=yield 2;
    const c=yield 3;
    console.log(a,b,c)
    return 4;
}

//costom itrator for yield

let it = generator();
/* let y=11
res=it.next(y++)
while(!res.done){
    console.log(res)
    res=it.next(y++);
}
console.log(res) */

function executer(y=10){
    res=it.next(y);
    if(res.done){
        console.log(res);
    }else{
        console.log(res);
        executer(++y)
    }
}
executer()

/* 
it.next(11) → _ = 11 → yield 1
it.next(12) → a = 12 → yield 2
it.next(13) → b = 13 → yield 3
it.next(14) → c = 14 → console.log(12,13,14) → return 4 
*/
