function getInfo() {
    const byId = (id) => document.querySelector('#' + id);
    const html = {
        stopId: byId('stopId'),
        stopName: byId('stopName'),
        buses: byId('buses'),
    };

    const stopId = html.stopId.value;

    if (!stopId) {
        showErrorMessage();
        return;
    }

    const url = 'http://localhost:3030/jsonstore/bus/businfo/' + stopId;

    fetch(url)
        .then((r) => {
            if (r.status !== 200) {
                throw new Error('Invaild stop id');
            }
            return r.json();
        })
        .then(showBusInfo)
        .catch(showErrorMessage);

    function showBusInfo(data) {
        console.log(data);
        const {stopName, buses} = html;
        stopName.textContent = data.name;
        const busesEls = Object.entries(data.buses).map(([id, arriveTime]) => {
            const el = document.createElement('li');
            el.textContent = `Bus ${id} arrives in ${arriveTime} minutes`;
            return el;
        });
        buses.append(...busesEls);
    }

    function showErrorMessage(e) {
        console.error(e);
        html.stopName.textContent = 'Error';
    }
}
