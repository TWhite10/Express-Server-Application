const express = require("express");
const router = express.Router();


const products = [];
let nextProductId = 1;

// function for errors 
const error = (status, message) => {
    const err = new Error(message);
    err.status = status;
    return err;
};

router
    .route("/")
    .get((req, res) => {
        const links = [
            {
                href: "products/:id",
                rel: ":id",
                type: "GET"
            }
        ];
        res.json({ products, links });
    })
    .post((req, res, next) => {
        if (req.body.name && req.body.price) {
            const product = {
                id: nextProductId++,
                name: req.body.name,
                price: parseFloat(req.body.price),
                description: req.body.description || '',
                createdAt: new Date()
            };
            products.push(product);
            res.json(products[products.length - 1]);
        } else {
            next(error(400, "Name and price are required"));
        }
    });

router
    .route("/:id")
    .get((req, res, next) => {
        const product = products.find(p => p.id == req.params.id);
        const links = [
            {
                href: `/${req.params.id}`,
                rel: "",
                type: "PATCH"
            },
            {
                href: `/${req.params.id}`,
                rel: "",
                type: "DELETE"
            }
        ];
        
        if (product) {
            res.json({ product, links });
        } else {
            next(error(404, "Product not found"));
        }
    })
    .patch((req, res, next) => {
        const product = products.find((p, i) => {
            if (p.id == req.params.id) {
                for (const key in req.body) {
                    // Only allow updating certain fields
                    if (['name', 'price', 'description'].includes(key)) {
                        products[i][key] = key === 'price' ? 
                            parseFloat(req.body[key]) : 
                            req.body[key];
                    }
                }
                return true;
            }
        });
        
        if (product) {
            res.json(product);
        } else {
            next(error(404, "Product not found"));
        }
    })
    .delete((req, res, next) => {
        const product = products.find((p, i) => {
            if (p.id == req.params.id) {
                products.splice(i, 1);
                return true;
            }
        });
        
        if (product) {
            res.json(product);
        } else {
            next(error(404, "Product not found"));
        }
    });

module.exports = router;