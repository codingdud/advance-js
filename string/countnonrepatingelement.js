function countnonrepeatingelement(str){
    obj={};
    for(let ch of str){
        obj[ch]=(obj[ch]||0)+1;
    }
    for(let ch of str){
        if(obj[ch]==1) return ch;
    }
    return null;
}
console.log(countnonrepeatingelement("sgsdjjbsdgbhi"))