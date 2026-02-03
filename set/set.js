let set = new Set([1,2,2,2,2,2,3,4,5,5,5,5]);
set.add(6);
set.add(7);
set.delete(3);
set.delete(3);
console.log(set.has(1));
console.log(set);
console.log(set.keys(),set.values());

let A=new Set([1,2,3,4,5]);
let B=new Set([4,5,6,7,8]);
console.log(A.union(B));
console.log(A.intersection(B))
console.log(A.difference(B))
console.log(A.symmetricDifference(B));

console.log(A.isSubsetOf(B));
console.log(A.isSupersetOf(B));