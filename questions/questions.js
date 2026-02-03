//Given the following deep copy function: 

// deep copy function implement for nested array and object  
function deepCopy(obj){ 
    if(obj === null || typeof obj !== "object") return obj; 
    if(Array.isArray(obj)) return obj.map(deepCopy); 
 
    const cloneobj = {}; 
    if(typeof obj === "object"){ 
        for(let [key, value] of Object.entries(obj)){ 
            let temp = deepCopy(value); 
            cloneobj[key] = temp; 
        } 
    } 
    return cloneobj; 
} 
 

//Use a WeakMap (preferred) to store references of already cloned objects: 

function deepCopy(obj, map = new WeakMap()) { 
  if (obj === null || typeof obj !== "object") return obj; 
  if (map.has(obj)) return map.get(obj); 
  if (Array.isArray(obj)) { 
    const arr = []; 
    map.set(obj, arr); 
    obj.forEach((item, i) => { 
      arr[i] = deepCopy(item, map); 
    }); 
    return arr; 
  } 
  const clone = {}; 
  map.set(obj, clone); 
  for (let [key, value] of Object.entries(obj)) { 
    clone[key] = deepCopy(value, map); 
  } 
  return clone; 
} 
 


class LinkedList { 
  constructor() { 
    this.head = this.tail = null; 
    this.size = 0; 
  } 
// TODO: Implement iterator here 
  [Symbol.iterator]() { 
    // your code 
  }     
append(value) { 
    const node = new Node(value); 
    if (!this.head) this.head = this.tail = node; 
    else this.tail = this.tail.next = node; 
    this.size++; 
  } 
} 
 