function solve() {
    return {
        hasClima: (car) => {
            car.temp = 21;
            car.tempSettings = 21;
            car.adjustTemp = function () {
                console.log(this);
                if (this.temp < this.tempSettings) {
                    temp++;
                } else if (this.temp > this.tempSettings) {
                    temp--;
                }
            };
        },

        hasAudio: (car) => {
            car.currentTrack = { name: null, artist: null };
            car.nowPlaying = function () {
                if (!this.currentTrack) return;
                console.log(
                    `Now playing '${this.currentTrack.name}' by ${currentTrack.artist}`
                );
            };
        },

        hasParktronic: (car) => {
            car.checkDistance = (distance) => {
                const beepCount = distance < 0.1 ? 3 : distance < 0.25 ? 2 : distance < 0.5 ? 1 : 0;
                console.log('Beep!'.repeat(beepCount));
            };
        }
    };
}

const a = solve();
const car = {};

a.hasClima(car);
car.adjustTemp();
console.log(car);
