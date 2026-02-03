var readline=required('readline-sync');

//user input
var n=readline.question("Enter number of elements:");
var arr=[];
for(let i=0;i<n;i++){
    let ele=readline.question("Enter element "+(i+1)+":");
    arr.push(Number(ele));
}