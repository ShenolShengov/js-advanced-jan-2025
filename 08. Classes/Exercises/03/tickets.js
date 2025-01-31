function solve(ticketsData, sortingProperty) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    const tickets = ticketsData.reduce((tickets, ticketData) => {
        const [destination, price, status] = ticketData.split('|');
        const ticket = new Ticket(destination, +price, status);
        tickets.push(ticket);
        return tickets;
    }, []);

    return tickets.sort((firstTicket, secondTicket) => {
        if (sortingProperty === 'price') {
            return firstTicket.price - secondTicket.price;
        }
        return firstTicket[sortingProperty].localeCompare(
            secondTicket[sortingProperty]
        );
    });
}

console.log(solve(
    [
        'Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed',
    ],
    'destination'
));
