const User={
    name: "Alice",
    age: 30,
}
const Teacher={
    subject:"maths",
    __proto__:User,
}
const Student={
    class:"XI",
    __proto__:User,
}
console.log(Teacher.name)
console.log(Student.age)
