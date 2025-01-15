function attachGradientEvents() {
    const gradient = document.querySelector('#gradient');

    gradient.addEventListener('mousemove', function (e) {
        const percentage = Math.floor(e.offsetX / e.target.clientWidth * 100);
        document.querySelector('#result').textContent = `${percentage}%`;
    });
}