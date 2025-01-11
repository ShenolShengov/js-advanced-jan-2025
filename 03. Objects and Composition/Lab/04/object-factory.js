function solve(library, orders) {
    const fulfilledOrders = orders.reduce((fulfilledOrders, currentOrder) => {
        const fulfilledOrder = Object.assign({}, currentOrder.template);
        const parsedParts = currentOrder.parts.reduce((parts, current) => {
            parts[current] = library[current];
            return parts;
        }, {});

        Object.assign(fulfilledOrder, parsedParts);

        fulfilledOrders.push(fulfilledOrder);
        return fulfilledOrders;
    }, []);
    return fulfilledOrders;
}

const library = {
    print: function () {
      console.log(`${this.name} is printing a page`);
    },
    scan: function () {
      console.log(`${this.name} is scanning a document`);
    },
    play: function (artist, track) {
      console.log(`${this.name} is playing '${track}' by ${artist}`);
    },
  };
  const orders = [
    {
      template: { name: 'ACME Printer'},
      parts: ['print']      
    },
    {
      template: { name: 'Initech Scanner'},
      parts: ['scan']      
    },
    {
      template: { name: 'ComTron Copier'},
      parts: ['scan', 'print']      
    },
    {
      template: { name: 'BoomBox Stereo'},
      parts: ['play']      
    }
  ];

const products = solve(library, orders);
console.log(products);