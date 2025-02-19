function solve() {
    return {
        mage,
        fighter,
    };

    function mage(name) {
        return {
            name,
            health: 100,
            mana: 100,
            cast,
        };
    }

    function cast(spell) {
        console.log(`${this.name} cast ${spell}`);
        this.mana--;
    }

    function fighter(name) {
        return {
            name,
            health: 100,
            stamina: 100,
            fight,
        };
    }

    function fight() {
        console.log(`${this.name} slashes at the foe!`);
        this.stamina--;
    }
}

let create = solve();
const scorcher = create.mage('Scorcher');
scorcher.cast('fireball');
scorcher.cast('thunder');
scorcher.cast('light');

const scorcher2 = create.fighter('Scorcher 2');
scorcher2.fight();

console.log(scorcher2.stamina);
console.log(scorcher.mana);
