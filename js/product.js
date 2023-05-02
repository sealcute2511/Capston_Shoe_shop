
const Product = {
    async get() {
        const ApiUrl = Common.getApiUrl('Product');
        const product = await $.get(ApiUrl);
        if (typeof product.statusCode == 'undefined') return [];
        if (product.statusCode !== 200) return [];
        return product.content.map(p => {
            p.categories = Common.parseJson(p.categories);
            p.relatedProducts = Common.parseJson(p.relatedProducts);
            p.size = Common.parseJson(p.size);
            return p;
        });
    },
    async getById(id) {
        const ApiUrl = Common.getApiUrl('Product/getbyid');
        const product = await $.get(ApiUrl, { id });
        if (typeof product.statusCode == 'undefined') return null;
        if (product.statusCode !== 200) return null;
        return product.content;
    }
}
