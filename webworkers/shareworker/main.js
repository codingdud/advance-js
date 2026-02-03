const worker=new SharedWorker("./share-worker.js")
worker.port.start();
const uid=`id_${Math.random().toString(14).slice(8)}`
worker.port.postMessage(`hello from tab ${uid}`);
worker.port.onmessage=(e)=>{
    console.log(e.data);
}