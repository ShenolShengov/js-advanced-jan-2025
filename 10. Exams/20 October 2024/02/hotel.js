class Hotel {
    constructor(initialBudget) {
        this.initialBudget = initialBudget;
        this.roomAvailability = {};
        this.roomsCount = 0;
        this.supplyStock = {};
    }

    restockSupplies(supplies) {
        let message = '';
        supplies.forEach((s) => {
            const [name, quantity, totalPrice] = s.split(' ');
            if (this.initialBudget >= totalPrice) {
                this.initialBudget -= totalPrice;
                this.supplyStock[name] ??= 0;
                this.supplyStock[name] += +quantity;
                message += `Successfully stocked ${quantity} ${name}\n`;
            } else {
                message += `There was not enough money to restock ${quantity} ${name}`;
            }
        });
        return message.trim();
    }

    addRoomType(roomType, neededSupplies, pricePerNight) {
        if (this.roomAvailability[roomType]) {
            return `The ${roomType} is already available in our hotel, try something different.`;
        }
        const supplies = neededSupplies.map((s) => {
            const [name, quantity] = s.split(' ');
            return { name, quantity: +quantity };
        });
        this.roomAvailability[roomType] = {
            type: roomType,
            supplies,
            pricePerNight,
        };
        this.roomsCount++;
        return `Great idea! Now with the ${roomType}, we have ${this.roomsCount} types of rooms available, any other ideas?`;
    }

    showAvailableRooms() {
        if (this.roomsCount === 0) {
            return 'Our rooms are not ready yet, please come back later...';
        }
        return Object.values(this.roomAvailability)
            .map((r) => `${r.type} - $ ${r.pricePerNight}`)
            .join('\n')
            .trim();
    }

    #isSuppliesAvailable(roomType) {
        const neededSupplies = this.roomAvailability[roomType].supplies;
        return neededSupplies.every(({ name, quantity }) => {
            return this.supplyStock[name] && this.supplyStock[name] >= quantity;
        });
    }

    bookRoom(roomType) {
        const foundedRoom = this.roomAvailability[roomType];
        if (!foundedRoom) {
            return `There is no ${roomType} available, would you like to book another room?`;
        }
        if(!this.#isSuppliesAvailable(roomType)) {
            return `We are currently unable to accommodate your request for ${roomType}, sorry for the inconvenience.`;
        }
        return `Your booking for ${roomType} has been confirmed! The price is $${foundedRoom.pricePerNight} per night.`;
    }
}

let hotel = new Hotel(500);

console.log(hotel.restockSupplies(["Soap 100 50", "Towels 20 100", "Shampoo 50 75"]));

console.log(hotel.addRoomType("Deluxe Suite", ["Soap 5", "Towels 2"], 200));
console.log(hotel.addRoomType("Standard Room", ["Soap 2", "Towels 1"], 100));
console.log(hotel.showAvailableRooms());
console.log(hotel.bookRoom("Apartment"));
console.log(hotel.bookRoom("Deluxe Suite"));