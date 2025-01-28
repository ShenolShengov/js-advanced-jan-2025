function printDeckOfCards(cards) {
    function createCard (face, suit){
        const validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const suits = { S: '\u2660', H: '\u2665', D: '\u2666', C: '\u2663' };
        const validSuits = Object.keys(suits);
    
        if (!validFaces.includes(face) || !validSuits.includes(suit)) {
            const error = new Error("Not valid face or suit");
            error.invalidCard = face + suit;
            throw error;
        }
        const result = {
            toString: () => `${face}${suits[suit]}`,
        };
        return result;
    }
    try {
        const result = cards.map(d => {
            const [face, suit] = d.length == 2 ? d.split('') : [d.slice(0, 2), d.slice(-1)];
            return createCard(face, suit);
        }).join(' ');
        console.log(result);
    } catch (e) {
        console.log(`Invalid card: ${e.invalidCard}`);
    }
  }

// printDeckOfCards(['AS', '10D', 'KH', '2C']);
printDeckOfCards(['5S', '3D', 'QD', '1C']);