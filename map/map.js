/*
new Map()
{}
*/
let map=new Map([
    ['a',1],
    ['b',2],
    ['c',3]
]);
map.set('a',map.get('a')+1);
console.log(map.has('a'));
map.delete('a');
console.log(map.size,map.get('a'));
for(let [key,value] of map) console.log(key,value);
for(let key of map.keys()) console.log(key);
for(let value of map.values()) console.log(value);
map.clear();