class Emp{
    constructor(name,salary=3000){
        this.name=name;
        this.salary=salary;
    }
    getSalary(){
        return 3000;
    }
}
class Manager extends Emp{
    constructor(name,salary=4000){
        super(name,salary);
    }
    getSalary(){
        return `${this.name} Manager get salary:${this.salary*10}`;
    }
}
class Inter extends Emp{
    constructor(name,salary=1500){
        super(name,salary);
    }
    getSalary(){
        return `${this.name} Intern get salary:${this.salary*2}`;
    }
}
let ram=new Manager("ram");
let aniket=new Inter("Aniket");
console.log(ram.getSalary())
console.log(aniket.getSalary());
