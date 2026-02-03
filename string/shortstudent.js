class Student{
    constructor(name,grade,id){
        this.name=name;
        this.grade=grade;
        this.id=id;
    }
}

function shortstudent(std){
    return std.sort((a,b)=>{
        if(a.grade!==b.grade){
            return a.grade-b.grade;
        }
        return a.id-b.id;
    })
}
const students= [
  new Student("Animesh", 10, 3),
  new Student("Ravi", 9, 2),
  new Student("Aman", 10, 1),
  new Student("Neha", 9, 5)
];
console.log(students.sort((a, b) => a.grade - b.grade || a.id - b.id));