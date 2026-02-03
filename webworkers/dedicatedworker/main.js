const worker=new Worker("./worker.js")

worker.postMessage(10);

worker.onmessage=(e)=>{
    console.log(e.data)
}