const p1={
    xp1:"i am xp1"
}
const p2={
    xp2:"i am xp2",
    __proto__:p1,
}
const p3={
    xp3:"i am xp3",
    __proto__:p2,
}
console.log(p3)