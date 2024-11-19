
const express = require("express");
const app = express();
const productsRouter = require("./routes/products");

// middleware
app.use(express.json());

// route testing
app.use("/api/products", productsRouter);

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