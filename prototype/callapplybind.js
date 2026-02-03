let Person={
    firstname:"Animesh",
    lastname:"kumar",
}
function printName(home,town){
        console.log(this.firstname+" "+this.lastname+" "+home+","+town)
}
let Person2={
    firstname:"sachine",
    lastname:"tendukar",
}
//function browing 
printName.call(Person2,"home","town")
printName.apply(Person,["home","town"])
//create new function with obj or class or another funtion obj
printName.bind(Person2,"home","town")()

