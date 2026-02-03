onmessage=(e)=>{
    const res=e.data*2;
    postMessage(res);
}