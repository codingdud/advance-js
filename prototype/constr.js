function deelay(sec){
  return new Promise((res,rej)=>{
    setTimeout(()=>{res()},1000)
  })
}
async function async(){
  await deelay(1000);

  console.log("hello")
}

async()