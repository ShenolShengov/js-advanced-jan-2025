class SnowSportStore {
    constructor(storeName) {
        this.storeName = storeName;
        this.availableEquipment = [];
        this.revenue = 0;
    }

    addEquipment(type, price, condition) {
        if (
            typeof type !== 'string' ||
            type === '' ||
            Number(price) === NaN ||
            price <= 0 ||
            typeof condition !== 'string' ||
            condition === ''
        ) {
            throw new Error('Invalid equipment details!');
        }

        this.availableEquipment.push({ type, price, condition });
        return `New equipment added: ${type} / ${condition} condition - ${(+price).toFixed(
            2
        )}$.`;
    }

    rentEquipment(type, rentalDays) {
        const foundEquipment = this.availableEquipment.find(a => a.type === type && a.condition === 'used');
        if(!foundEquipment) {
            throw new Error(`${type} is not available for rent!`);
        }
        const rentalCost = foundEquipment.price * 0.1 * rentalDays;
        this.revenue += rentalCost;
        return `${type} rented for ${rentalDays} days. Total cost: ${rentalCost.toFixed(2)}$.`;
    }

    sellEquipment(type) {
        const foundEquipment = this.availableEquipment.find(a => a.type === type && a.condition === 'new');
        const index = this.availableEquipment.findIndex(a => a.type === type && a.condition === 'new');
        if(!foundEquipment) {
            throw new Error(`${type} is not available for purchase!`);
        }
        this.availableEquipment.splice(index, 1);
        this.revenue += +foundEquipment.price;
        return `${type} has been sold for ${(+foundEquipment.price).toFixed(2)}$.`;
    }

    showRevenue() {
        if(this.revenue === 0){
            return 'Nothing has been sold or rented.';
        }
        return `${this.storeName} has made a total revenue of ${this.revenue.toFixed(2)}$.`;
    }
}

let store = new SnowSportStore('Alpine Gear Shop');
console.log(store.addEquipment('Ski', 500, 'new'));
console.log(store.addEquipment('Boots', 100, 'used'));
console.log(store.addEquipment('Helmet', 200, 'new'));
console.log(store.addEquipment('Snowboard', 300, 'used'));
console.log(store.sellEquipment('Ski'));
console.log(store.sellEquipment('Helmet'));
console.log(store.rentEquipment('Snowboard', 3));
console.log(store.showRevenue());