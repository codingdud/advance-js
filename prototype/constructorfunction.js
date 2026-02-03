function Person(name, age) {
    this.name = name;
    this.age = age;
}   
Person.prototype.greet = function() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
}

function Teacher(name,age,sub){
    Person.call(this,name,age);
    this.sub=sub;
}
// Teacher.prototype.__proto__=Person.prototype;
Object.setPrototypeOf(Teacher.prototype,Person.prototype);
/* Teacher.prototype=Object.create(Person.prototype);
Teacher.prototype.constructor=Teacher; */

let person1=new Person("human",34);
console.log(person1.greet())

const manih=new Teacher("manish",12,"maths");
console.log(manih.greet())
