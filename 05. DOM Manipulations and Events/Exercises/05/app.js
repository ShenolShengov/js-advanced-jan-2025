function encodeAndDecodeMessages() {
    const encodeBtn = document.querySelector('button');
    encodeBtn.addEventListener('click', encodeMessageHandler);

    const decodeBtn = document.querySelector('#main div:last-child button');
    decodeBtn.addEventListener('click', decodeMessageHandler);

    function encodeMessageHandler() {
        const messageArea = getEncodeTextarea();
        const encodedMessage = messageArea.value
            .split('')
            .map((c) => String.fromCodePoint(c.codePointAt(0) + 1))
            .join('');
        messageArea.value = '';
        getDecodeTextarea().value = encodedMessage;
    }

    function decodeMessageHandler() {
        const messageArea = getDecodeTextarea();
        const decodedMessage = messageArea.value
            .split('')
            .map((c) => String.fromCodePoint(c.codePointAt(0) - 1))
            .join('');
        messageArea.value = decodedMessage;
    }

    function getEncodeTextarea() {
        return document.querySelector('textarea');
    }

    function getDecodeTextarea() {
        return document.querySelectorAll('textarea')[1];
    }
}
