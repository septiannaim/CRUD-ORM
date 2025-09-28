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


app.get("/products", async (req, res) => {
    const products = await prisma.product.findMany();
        res.send(products);
});

app.post("/products", async (req, res) => {
    const newProductData = req.body;

    const product = await prisma.product.create({
        data : {
            name: newProductData.name,
            description: newProductData.description,
            price: newProductData.price,    
            image: newProductData.imageUrl,
        },
    });
    res.send(
        {data: product,
        message: "Product created successfully"
        }
    );
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
