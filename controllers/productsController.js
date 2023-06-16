const productModel = require('../models/product');
const { validationResult } = require('express-validator');

const productsController = {
    getProducts(req, res) {
        let userSession = req.session.user;
        if(!userSession) userSession = {};
        const products = productModel.findAll();
        res.app.locals.products = products;
        res.render('products-list', { title: '| Productos', products, userSession });
    },

    getProductDetail(req, res) {
        let userSession = req.session.user;
        if(!userSession) userSession = {};

        const id = Number(req.params.id);
        const product = productModel.findbyId(id);

        if (!product) {
            return res.render('product-not-found',{ title: '| Producto no disponible', userSession});
        }
        res.render('product-detail', { title: '| Detalle', product, userSession});
    },

    getCreateProduct(req, res) {
        let userSession = req.session.user;
        if(!userSession) userSession = {};
        const product = req.body;

        res.render('create-product', { title: '| Crear producto', product, userSession});
    },

    postProduct(req, res) {
        const product = req.body;
        const resultValidation = validationResult(req);
        product.price = Number(product.price);

        if (resultValidation.errors.length > 0) {

            return res.render('create-product', {
                title: '| Crear producto',
                errors: resultValidation.mapped(),
                product
            });
        }

        product.images = req.files.map(el => '/imgs/products-images/' + el.filename);

        productModel.createProduct(product);

        res.app.locals.product = createdProduct;
        res.redirect('/products');
    },

    getUpdateProduct(req, res) {
        let userSession = req.session.user;
        if(!userSession) userSession = {};
        const id = Number(req.params.id);

        const updatedProduct = productModel.findbyId(id);

        if (!updatedProduct) {
            // Con el return detenemos la ejecución del controller, y con el res.send enviamos un mensaje de error
            // *queremos detener la ejecución para que no se ejecute el otro res.render (la otra respuesta)
            return res.render('product-not-found');
        }

        res.render('update-product', { title: 'Editar producto', product: updatedProduct, userSession });
    },

    deleteProduct(req, res) {
        let id = Number(req.params.id);

        productModel.deleteById(id);

        res.redirect('/products');
    },

    updateProduct(req, res) {

        const id = Number(req.params.id);
        const product = req.body;

        product.images = req.files.map(el => '/imgs/products-images/' + el.filename);

        productModel.updateById(id, product);

        res.redirect(`/products/${id}/detail`);
    }
}

module.exports = productsController;