function recfibonaki(n,mp){
    if(n==0||n==1) return n;
    if(mp.has(n)) return mp.get(n);
    let temp=recfibonaki(n-1,mp)+recfibonaki(n-2,mp);
    mp.set(n,temp);
    return temp;
}
console.log(recfibonaki(1000,new Map()));