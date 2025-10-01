// Layer untuk hanlde requsets dan respone
// Biasanya layer ini berisi logic yang berhubungan dengan HTTP
// Seperti req, res, status code, header, dll
// Jangan menaruh logic yang berhubungan dengan database di layer ini
// Pindahkan logic yang berhubungan dengan database ke layer service

const express = require('express');

const prisma = require('../db'); // Import prisma client dari layer db
const { getAllProducts } = require('./product.service');

const router = express.Router();


router.get("/", async (req, res) => {
    const products = await getAllProducts();
        res.send(products);
});
router.get("/:id", async (req, res) => {

    try {
        const productId = req.params.id;
        const product  = await getProductById(productId);
        res.send(product);
    }
    catch (error) {
        res.status(400).send(error.message);
    }   
});



router.post("/", async (req, res) => {
    try {
    const newProductData = req.body;
    const product = await createProduct(newProductData);    

    res.send(
        {data: product,
        message: "Product created successfully"
        });
    } catch (error) {
    res.status(400).send(error.message);
    }
});
  
router.delete("/:id", async (req, res) => {
    try {
const productId = req.params.id;  //harus String
await deleteProductById(parseInt(productId));

        //DELETE FROM pro ducts WHERE id = {productId}
        res.send("Product deleted successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});



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