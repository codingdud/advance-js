/*
sort
map
filter
groupBy
reduce
foreach

*/
let arr=new Array(10,12,15,18,20,25,30);
arr.sort((a,b)=>a-b);
console.log(arr.reverse());
console.log(Math.max(...arr));
console.log(Math.min(...arr));
[arr[0],arr[1]]= [arr[1],arr[0]];
console.log(arr);
