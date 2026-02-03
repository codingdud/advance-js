class User{
    #password;
    constructor(pass){
         this.#password=pass;
    }
    check(pwd){
        return this.#password===pwd;
    }
}
const user=new User("pass")
//console.log(user.#password)
console.log(user.check("pass"))

class Payment{
    #vaild(amount){
        return amount>0;
    }
    pay(amount){
        if(this.#vaild(amount)){
            console.log("payment successful")
        }else{
            console.log("payment unsuccessfull")
        }
    }
}
const obj=new Payment();
obj.pay(100);