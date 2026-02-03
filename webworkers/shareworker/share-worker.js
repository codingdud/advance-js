connections=[];
onconnect=function(e){
    const port=e.ports[0];
    connections.push(port);
    port.onmessage=(e)=>{
        connections.forEach(p => {
            p.postMessage(e.data)
        });
    }
}