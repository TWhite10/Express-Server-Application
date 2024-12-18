
const express = require("express");
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');//

const productsRouter = require("./routes/products");
const viewsRouter = require("./routes/views");

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); 



//view engine
app.set('view engine', 'ejs');
app.set("views" ,(path.join(__dirname, 'views')));
app.use(expressLayouts);
app.set('layout', 'layout');

//routes
app.use('/', viewsRouter);
app.use('/data/products', productsRouter);

// error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message,
            status: err.status
        }
    });
});


app.use((req, res) => {
    res.status(404).json({ error: { message: "Not Found", status: 404 }});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});