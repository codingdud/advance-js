function countvovels(str){
    return str
    .split(" ")
    .reduce(
        (acc,x)=>
            (acc.match(/[aeiou]/gi)||[]).length
        <(x.match(/[aeiou]/gi)||[]).length
        ?x:acc,"");
}

console.log(countvovels("hello world animesh kumar"))