function solve() {
    const textToTransform = document.querySelector('#text').value;
    const namingConvention = document.querySelector('#naming-convention').value;

    const trasformedText = transform(textToTransform, namingConvention);

    document.querySelector('#result').textContent = trasformedText;

    function transform(textToTransform, namingConvention) {
        const toPascalCase = textToTransform.toLowerCase()
            .split(' ')
            .map((e) => e.charAt(0).toUpperCase() + e.substring(1))
            .join('');
        if (namingConvention === 'Pascal Case') {
            return toPascalCase;
        }
        if (namingConvention === 'Camel Case') {
            return toPascalCase.charAt(0).toLowerCase() + toPascalCase.substring(1);
        }
        return 'Error!';
    }
}
