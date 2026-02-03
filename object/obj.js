let obj={name:"John", age:30, city:"New York"};
console.log(obj);
console.log(Object.keys(obj));
console.log(Object.values(obj).toString());
console.log(Object.entries(obj));
let text =JSON.stringify(obj);
console.log(text);
let parseobj=JSON.parse(text);
console.log(parseobj);

for(let [key,value] of Object.entries(obj)){
    console.log(`${key}: ${value}`);
}
obj.contry="USA";
for(let key in obj){
    console.log(`${key}: ${obj[key]}`);
}
