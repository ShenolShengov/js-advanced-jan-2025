function solve() {
   const addedProduct = {};

   const shopingCart = document.querySelector('.shopping-cart');

   shopingCart.addEventListener('click', shopingCartActionHandler);

   function shopingCartActionHandler(e) {
       const targetElement = e.target;

       if (targetElement.nodeName !== 'BUTTON') return;

       if (targetElement.matches('.checkout')) {
           checkout();
       } else {
           addProduct(targetElement);
       }
   }

   function addProduct(addBtn) {
       const productEl = addBtn.closest('.product');
       const name = productEl.querySelector('.product-title').textContent;
       const price = +productEl.querySelector('.product-line-price')
           .textContent;

       addedProduct[name] ??= { name, price, quantity: 0 };
       addedProduct[name].quantity += 1;

       printNotificatonMessage(name, price);
   }

   function printNotificatonMessage(name, price) {
       const messageReciever = getMessageReciever();
       messageReciever.textContent += `Added ${name} for ${price.toFixed(2)} to the cart.\n`;
   }

   function getMessageReciever() {
       return document.querySelector('textarea');
   }

   function checkout() {
       const totalPrice = Object.values(addedProduct).reduce(
           (sum, { price, quantity }) => sum + price * quantity,
           0
       );
       const joinedProducts = Object.keys(addedProduct).join(', ');
       const messageReciever = getMessageReciever();
       messageReciever.textContent += `You bought ${joinedProducts} for ${totalPrice.toFixed(2)}.`;
       disableAllButons();
   }

   function disableAllButons() {
     document.body.querySelectorAll('button').forEach(b => b.disabled = true);
   }
}