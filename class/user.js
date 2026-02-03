class User{
    constructor(name){
        this.name=name;
    }
    login(){
        return `${this.name} login in`;
    }
}
//Developer → User → Object
class Developer extends User{
    constructor(name,lang="js"){
        super(name);
        this.lang=lang;
    }
    getDetails(){
        return `${this.name} do development in ${this.lang}`;
    }
}
let objuser=new Developer("Animesh kumar")
console.log(objuser.getDetails())