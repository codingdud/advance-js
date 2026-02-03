function combination(str){
    let visited=new Array(str.length).fill(false);
    let ans=[];
    trycombination(str,ans,visited)
}

let res=[];
function trycombination(str,ans,visited){
    if(str.length===ans.length){ 
        res.push(ans.join(""));
        //console.log(ans);
    }
    for(let i=0;i<str.length;i++){
        if(!visited[i]){
            visited[i]=true;
            ans.push(str[i]);
            trycombination(str,ans,visited);
            ans.pop();
            visited[i]=false;
        }
    }
}

combination("abc")
console.log(res);
