function Calculator(val){
  this.cal=val;
  this.add=(num)=>{
      this.cal+=num;
      return this;
  };
  this.display=(num)=>{
    console.log(this.cal)
  }
}
console.log(new Calculator(10).add(100).display())