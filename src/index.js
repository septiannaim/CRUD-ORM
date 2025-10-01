const express = require('express');
const dotenv = require('dotenv');
const app = express();
const { PrismaClient } = require('@prisma/client');  // Pastikan Prisma Client diimpor dengan benar
const prisma = new PrismaClient();  // Buat instance Prisma Client

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());


app.get ('/api', (req, res) => {
    res.send('Hello World');
});

const productController = require('./product/product.controller');
app.use('/products', productController);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
