function anagram(str1,str2){
    if(str1.length!==str2.length) return false;
    return str1.split("").sort((a,b)=>a-b).join("")===str2.split("").sort().join("");
}
console.log(anagram("aaabb","bbaaa"))
