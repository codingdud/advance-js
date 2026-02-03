let a="Hello, \' \" \\World!";
let b=`multi-line string ${a}
 with formating options.`;
console.log(b);
//number to string
let strnum=new String(123);
console.log(strnum);
console.log("name\tage\tlocation");
console.log("John\t25\tUSA");
console.log("line1\nline2\nline3");
console.log("hellow world\vThis is a backslash:\v");
let strwithnull="Hello\0World";
console.log(strwithnull);
let num="42";
let convertedNum=Number(num);
console.log(convertedNum);
console.log(typeof convertedNum);
let floatNum="3.14";
let convertedFloat=Number(floatNum);
let intNum=parseInt(floatNum);
console.log(intNum);
let sent="Hello World";
let words=sent.split(" ");
console.log(words);
temp='';

for(let i=0;i<sent.length;i++){
    console.log(sent.charCodeAt(i));
    console.log(String.fromCodePoint(65+i));
}
console.log(sent.slice(1,4));
console.log(sent.substring(1,4));
console.log(sent.indexOf("o"));
console.log(new Set(sent));
