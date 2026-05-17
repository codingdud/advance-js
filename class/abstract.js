class Payment {
    constructor() {
        if (this.constructor === Payment) {
            throw new Error("abstract class can't create object from abstract class!😁");
        }
    }
    pay() {
        throw new Error("Method must be implemented");
    }
}

class PayPal extends Payment {
    constructor() {
        super(); // This is safe now because we only throw if directly instantiating Payment
    }
    
    pay(amount) {
        console.log(`payed ${amount} through paypal`);
    }
}

class Upi extends Payment {
    constructor() {
        super();
    }
    
    pay(amount) {
        console.log(`payed ${amount} through Upi`);
    }
}

class Card extends Payment {
    constructor() {
        super();
    }
    
    pay(amount) {
        console.log(`payed ${amount} through Card`);
    }
}

let paypaypal = new PayPal();
paypaypal.pay(100);
let upipay = new Upi();
upipay.pay(200);
let cardpay = new Card();
cardpay.pay(300);