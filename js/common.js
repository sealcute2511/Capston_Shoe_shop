const Common = {
    hostApi: 'https://shop.cyberlearn.vn/api/',
    getApiUrl(uri) {
        uri = uri.replace(/^\/?|\/?$/g, "")
        return this.hostApi + uri;
    },
    async loadTemplate(template, data = []) {
        const url = '/template/' + template + '.html';
        const html = await $.get(url);
        return this.replaceDataForTemplate(html, data);
    },
    replaceDataForTemplate(html, data, prefixKey = '') {
        for (const key in data) {
            if (typeof data[key] != 'object') {
                html = html.replaceAll(`{{ ${prefixKey + key} }}`, data[key]);
                continue;
            }
            if (!Array.isArray(data[key])) {
                const newPrefix = prefixKey != '' ? `${prefixKey}.${key}.` : `${key}.`;
                html = this.replaceDataForTemplate(html, data[key], newPrefix);
                continue;
            }
            for (const index in data[key]) {
                if (typeof data[key][index] != 'object') {
                    html = html.replaceAll(`{{ ${prefixKey + key}[${index}] }}`, data[key][index]);
                    continue;
                }
                const newPrefix = prefixKey != '' ? `${prefixKey}.${key}[${index}].` : `${key}[${index}].`;
                html = this.replaceDataForTemplate(html, data[key][index], newPrefix);
            }
        }
        return html;
    },
    parseJson(data, _default = null) {
        try {
            return JSON.parse(data);
        } catch (e) {
            return _default;
        }
    },
    getFormData(el) {
        if (!(el instanceof jQuery)) {
            el = $(el);
        }
        return el.serializeArray().reduce((result, data) => {
            result[data.name] = data.value;
            return result;
        }, {});
    }
}
