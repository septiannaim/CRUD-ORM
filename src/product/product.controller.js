// Layer untuk hanlde requsets dan respone
// Biasanya layer ini berisi logic yang berhubungan dengan HTTP
// Seperti req, res, status code, header, dll
// Jangan menaruh logic yang berhubungan dengan database di layer ini
// Pindahkan logic yang berhubungan dengan database ke layer service

const express = require('express');

const prisma = require('../db'); // Import prisma client dari layer db

const router = express.Router();


router.get("/", async (req, res) => {
    const products = await prisma.product.findMany();
        res.send(products);
});
router.get("/:id", async (req, res) => {
    const productId = req.params.id;

const product  = await prisma.product.findUnique({
    where: {
    id: parseInt(productId),
},
});
if (!product) {
    return res.status(400).send("product not found")
}

res.send(product);
});
router.post("/", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
const productId = req.params.id;  //harus String

await prisma.product.delete({
where: {
    id : Number(productId),
},
});

//DELETE FROM pro ducts WHERE id = {productId}
res.send("Product deleted successfully");
})

router.put("/:id", async (req, res) => {
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

router.patch("/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;
  

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

module.exports = router;