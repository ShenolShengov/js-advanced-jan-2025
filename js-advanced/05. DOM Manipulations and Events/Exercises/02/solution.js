function attachEventsListeners() {
    const unitsToSeconds = {
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    document.querySelector('main').addEventListener('click', convertHandler);

    function convertHandler(e) {
        if (!e.target.matches('input[type="button"]')) return;

        const unitInput = e.target.previousElementSibling;
        const amount = Number(unitInput.value);
        const unit = unitInput.id.slice(0, -1);
        const amountInSeconds = unitsToSeconds[unit] * amount;

        [...document.querySelectorAll('input[type="text"]')].forEach((i) => {
            i.value = amountInSeconds / unitsToSeconds[i.id.slice(0, -1)];
        });
    }
}
