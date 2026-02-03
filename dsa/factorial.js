function factorial(n){
    if(n===0||n===1) return 1;
    let ans=1;
    for(let i=n;i>=1;i--) ans*=i;;
    return ans;
    //return n*factorial(n-1);
}
console.log(factorial(5));