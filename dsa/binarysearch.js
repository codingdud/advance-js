function binarySearch(arr, target){
    let left =0,right=arr.length-1;
    while(left<=right){
        let mid=Math.floor(left+(right-left)/2);
        if(arr[mid]===target) return mid;
        else if(arr[mid]<target) left=mid+1;
        else right=mid-1;
    }
    return -1;
}
console.log(binarySearch([1,2,3,4,5,6,7,8,9].sort((a,b)=>a-b),5));