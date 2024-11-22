const express = require("express");
const router = express.Router();
const products = require('../data/products');

//main page
router.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'productsPage',
        products: products
    });
});

//all products
router.get('/products', (req, res) => {
    res.render('products/index', {
        pageTitle: 'All Products',
        products: products
    });
});
//new product 
router.get('/products/new', (req, res) => {
    res.render('products/new', {
        pageTitle: 'Add New Product',
        formData:{}
    });
});
//create new product
router.post('/products', (req, res) => {
    const { name, price, description } = req.body;
    if (!name || !price) {
        return res.render('products/new', {
            pageTitle: 'Add New Product',
            error: 'Name and price are required',
            formData: req.body
        });

    }
    const product = {
        id: products.length + 1,
        name,
        price: parseFloat(price),
        description: description || '',
        createdAt: new Date()
    };
    products.push(product);
    
    res.redirect('/products');
});



module.exports = router;