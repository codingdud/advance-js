result=[];
function printx(n){
    let sp=2*(n-1);
    for(let i=0;i<n;i++){
        temp=" ".repeat(i)+"#".repeat(i+1)+" ".repeat(sp*2)+"#".repeat(i+1);
        //result.push(temp);
        console.log(temp);
        sp=sp-2;
    }
    sp=0;
    for(let i=n-1;i>=0;i--){
        temp=" ".repeat(i)+"#".repeat(i+1)+" ".repeat(sp*2)+"#".repeat(i+1);
        //result.push(temp);
        console.log(temp);
        sp=sp+2;
    }
}
printx(9);
/*
1-0
2-2
3-4
4-6
5-8
6-10
7-12
*/