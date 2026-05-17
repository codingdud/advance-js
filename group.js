const orders = [
    { orderId: 101, customer: "Neel", items: [{ name: "Pen", qty: 2, price: 10 }, { name: "Book", qty: 1, price: 50 }] },
    { orderId: 102, customer: "Aarav", items: [{ name: "Bag", qty: 1, price: 200 }] },
    { orderId: 103, customer: "Neel", items: [{ name: "Pen", qty: 5, price: 10 }, { name: "Eraser", qty: 3, price: 5 }] },
    { orderId: 104, customer: "Priya", items: [{ name: "Book", qty: 2, price: 50 }, { name: "Pen", qty: 1, price: 10 }] },
];

const res=orders.map((arr)=>{
  let price=arr.items.reduce((acc,item)=>acc+item.price*item.qty, 0)
  return [arr.customer,price]
})

console.log(res)