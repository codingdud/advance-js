class Database{
    static #connections=0;
    static #connect(){
        return ++Database.#connections;
    }
    static connect(){
        return this.#connect();
    }
}
console.log(Database.connect())
console.log(Database.connect())
console.log(Database.connect())

//private fild are not inheritance

//legace implimentation of private variable using functions

function Counter(){
    let count=0;
    this.inc=()=>++count;
}

const obj=new Counter()
console.log(obj.inc())
console.log(obj)