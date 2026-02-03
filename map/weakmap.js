let wm=new WeakMap();
let mp=new Map();
let user = { id: 1 };
mp.set(user,"cached data");
wm.set(user,"cached data");
console.log(wm.get(user))
user=null;
for(let [x,y] of mp){
    console.log(x,y);
}
console.log(wm.get(temp))
