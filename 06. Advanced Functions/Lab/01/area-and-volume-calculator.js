function solve(areaFun, volumeFun, coordinates) {
    return JSON.parse(coordinates)
        .reduce((figures, currentFigureData) => {
            const area = areaFun.call(currentFigureData);
            const volume = volumeFun.call(currentFigureData);
            figures.push({area, volume});
            return figures;
        }, []);
}