function extract(content) {
    const text = document.querySelector(`#${content}`).textContent;
    return text.match(/(?<=\()[^()]+(?=\))/gm);
}