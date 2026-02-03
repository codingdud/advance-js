class User{
    ab=10;
    static role="Developer";
    static count=0;
    constructor(){
        let cb=20;
        User.count++;
    }
    static add(b){// add to prototype of class not class itself
        return this.count+b;
    }
    inc(){
        //will not woke because it try to access this from obj not class as static methods and variable are realted to class
        //this.count++; 
        User.count++;
    }
    get(){
        return User.count;
    }
}

const obj=new User();
console.log(User.add(1))
console.log(obj.get())
console.log(User)
console.log(obj)

class MathUtil {
  static add(a, b) {
    return a + b;
  }
}

