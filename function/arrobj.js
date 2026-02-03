const obj = {
  val: 10,
  show: () => console.log(this.val)
};

obj.show(); // ❌
