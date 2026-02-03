const URL="https://api.github.com/users/codingdud"
async function githubapi(){
    const user= await fetch(URL)
    const data= await user.json()
    console.log(data);
    const user1= await fetch(URL)
    const data1=await user1.json()
    console.log(data1)

}
githubapi()