(() => {
    const strPropExtension = {
        ensureStart(str) {
            if (this.startsWith(str)) {
                return '' + this;
            }
            return str + this;
        },
        ensureEnd(str) {
            if (this.endsWith(str)) {
                return '' + this;
            }
            return this + str;
        },
        isEmpty() {
            return this.length === 0;
        },
        truncate(n) {
            if (this.length <= n) {
                return '' + this;
            }

            const words = this.split(' ');
            if (words.length === 1) {
                return n < 4 ? '.'.repeat(n) : this.slice(0, n - 3) + '...';
            }

            while(words.join(' ').length + 3 > n) {
                words.pop();
            }
            return words.join(' ') + '...';
        },
    };

    Object.assign(String.prototype, strPropExtension);

    String.format = (string, ...params) => {
        const placeHolders = string.match(/{\d+}/gm);
        const removeBracketRegex = /[{}]/gm;
        placeHolders.forEach((placeholder) => {
            const paramIndex = placeholder.replace(removeBracketRegex, '');
            const placeholderValue = params[paramIndex];
            if (placeholderValue)
                string = string.replace(placeholder, placeholderValue);
        });
        return string;
    };
})();
