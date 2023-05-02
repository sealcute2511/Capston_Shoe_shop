const Detail = {
    init() {
        this.buildProductData();
    },
    async buildProductData() {
        const product = await Product.getById(1);
        if (product == null) return;
        console.log(product);
        const $contentProduct = $('#content-product');

        const arySizeLi = [];
        for (const size of product.size) {
            arySizeLi.push($('<li />').text(size));
        }

        $contentProduct.find('.size .list-size').empty().append(arySizeLi);
        $contentProduct.find('.box-image-preview img').attr('src', product.image);
        $contentProduct.find('.box-product-info .title h4').text(product.name);
        $contentProduct.find('.box-product-info .description').text(product.description);
        $contentProduct.find('.price p').text(`$${product.price}`);

        this.buildRelationProduct(product.relatedProducts);
    },
    async buildRelationProduct(relationProduct) {
        const $areaRelationProduct = $('#relation-product .area-relation-product');
        $areaRelationProduct.empty();
        if (typeof relationProduct != 'object' || !Array.isArray(relationProduct))
            return;
        const relatedProductTemplate = await Common.loadTemplate('relation-product');
        for (const product of relationProduct) {
            const newHtmlProduct = Common.replaceDataForTemplate(relatedProductTemplate, product);
            $areaRelationProduct.append(newHtmlProduct);
        }
    }
}

Detail.init();
