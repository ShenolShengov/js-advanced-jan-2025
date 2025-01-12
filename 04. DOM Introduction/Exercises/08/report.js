function generateReport() {
    const output = document.querySelector('#output');
    const selectedRows = getSelectedRows();
    const dataSelector = generateSelctorForRows(selectedRows);

    const data = [...document.querySelectorAll(dataSelector)].map(
        (e) => e.textContent
    );
    const formatedData = [];
    console.log(dataSelector);

    while (data.length != 0) {
        const row = processRow(
            data.slice(0, selectedRows.length),
            selectedRows
        );
        formatedData.push(row);
        data.splice(0, selectedRows.length);
        console.log(data.length);
    }
    output.value = JSON.stringify(formatedData);

    function processRow(data, selectedRows) {
        const row = {};
        data.forEach((e, i) => {
            const currentRowName = selectedRows[i].name;
            row[currentRowName] = e;
        });
        return row;
    }

    function getSelectedRows() {
        const selectedRowsIndexes = [];
        document.querySelectorAll('input[type="checkbox"]').forEach((e, i) => {
            if (e.checked)
                selectedRowsIndexes.push({
                    name: e.getAttribute('name'),
                    index: i,
                });
        });
        return selectedRowsIndexes;
    }

    function generateSelctorForRows(rowIndexes) {
        const singleRowSelector = (i) => `tbody tr td:nth-child(${i})`;
        let selector = [];
        rowIndexes.forEach((e) =>
            selector.push(singleRowSelector(e.index + 1))
        );
        return selector.join(', ');
    }
}
