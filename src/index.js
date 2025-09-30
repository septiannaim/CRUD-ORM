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


app.delete("/products/:id", async (req, res) => {
const productId = req.params.id;  //harus String

await prisma.product.delete({
where: {
    id : Number(productId),
},
});

//DELETE FROM pro ducts WHERE id = {productId}
res.send("Product deleted successfully");
})


app.put("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    if (
        !(
            productData.image &&
            productData.description &&
            productData.name &&
            productData.price
        )
    ) {
        return res.status(400).send("some fields are missing");
    }

    await prisma.product.update({
        where: {
            id: parseInt(productId),
        }, data: {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            image: productData.imageUrl,
        },    
});
res.send({
    data: productData,
    message: "Product updated successfully"});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
