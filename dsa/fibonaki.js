function fib(n){
    let fibonaki=[0,1];
    for(let i=2;i<=n;i++)fibonaki.push(fibonaki[i-1]+fibonaki[i-2]);
    return fibonaki;
}
console.log(fib(10));