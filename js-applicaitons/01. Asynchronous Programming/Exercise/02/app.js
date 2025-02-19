function solve() {
    const baseUrl = 'http://localhost:3030/jsonstore/bus/schedule/';
    let stopId = 'depot';

    const elements = {
        info: document.querySelector('.info'),
        departBtn: document.querySelector('#depart'),
        arriveBtn: document.querySelector('#arrive'),
    };

    const buildUrl = () => baseUrl + stopId;

    function depart() {
        const url = buildUrl();
        fetch(url)
            .then((r) => r.json())
            .then((d) => {
                elements.info.textContent = `Next stop ${d.name}`;
                elements.info.dataset.stopName = d.name;
                stopId = d.next;
            });
        elements.departBtn.disabled = true;
        elements.arriveBtn.disabled = false;
    }

    function arrive() {
        const name = elements.info.dataset.stopName;
        elements.info.textContent = `Arriving at ${name}`;
        elements.departBtn.disabled = false;
        elements.arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive,
    };
}

let result = solve();
