function calculator() {
    let firstElement = null;
    let secondElement = null;
    let resultEl = null;

    return {
        init(selector1, selector2, resultSelector) {
            firstElement = document.querySelector(selector1);
            secondElement = document.querySelector(selector2);
            resultEl = document.querySelector(resultSelector);
        },
        add() {
            resultEl.value = +firstElement.value + +secondElement.value;
        },
        subtract() {
            resultEl.value = +firstElement.value - +secondElement.value;
        }
    };
}
