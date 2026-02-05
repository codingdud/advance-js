let map=new Map();
function memoization(fn,...arg){
    let key=fn.name+"|"+JSON.stringify(arg);
    if(map.has(key)) {
        let temp=map.get(key);
        map.delete(key);
        map.set(key,temp);
        return temp;
    }
    if(map.size>=5) map.delete(map.keys().next().value);
    let result = fn(...arg);
    map.set(key,result);
    return result;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { memoization, map };
}
if (typeof global !== 'undefined') {
    global.memoization = memoization;
    global.map = map;
}

function slowAdd(a, b) {
    console.log("computed:", a, b);
    return a + b;
}
/* 
console.log("Test 1 — cache hit");

console.log(memoization(slowAdd, 2, 3));
console.log(memoization(slowAdd, 2, 3));
console.log(memoization(slowAdd, 2, 3));
console.log(map); // expect 5

console.log("Test 2 — different args");

memoization(slowAdd, 2, 3);
memoization(slowAdd, 4, 5);
memoization(slowAdd, 5, 6);
console.log(map); // expect 5

console.log("Test 3 — eviction");

memoization(slowAdd, 1, 1);
memoization(slowAdd, 2, 3);
memoization(slowAdd, 3, 3);
memoization(slowAdd, 4, 4);
memoization(slowAdd, 5, 5);
memoization(slowAdd, 5, 5);
memoization(slowAdd, 5, 5);
memoization(slowAdd, 5, 5);
memoization(slowAdd, 2, 3);



console.log(map); // expect 5

console.log("Test 4 — first key should be recomputed");

memoization(slowAdd, 1, 1); // might be evicted → recompute

function slowSquare(n){
    for(let i=0;i<1e8;i++){}
    return n*n;
}

console.time("first");
memoization(slowSquare, 10);
console.timeEnd("first");

console.time("second");
memoization(slowSquare, 10);
console.timeEnd("second");
 */