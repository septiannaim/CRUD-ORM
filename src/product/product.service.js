// Service layyer bertujuan untuk menghandle logic bisnis
// Layer ini berisi logic yang berhubungan dengan database
// knapa dipisah? agar tanggung jawab terisolasi dan function 
// resusable

const prisma = require('../db');
 // Import prisma client dari layer db
const getAllProducts = async () => {
    if (typeof id !== 'number') {
        throw new Error("Product ID must be a number");
    }
    const products = await prisma.product.findMany();
    return products;
};

 const  getProductById = async (productId) => {
    const product  = await prisma.product.findUnique({
        where: {
            id: parseInt(productId),
        },
    });
    if (!product) {
        return res.status(400).send("product not found");
    }
    return product;
};


const createProduct = async (newProductData) => {
    const product = await prisma.product.create({
        data : {
            name: newProductData.name,
            description: newProductData.description,
            price: newProductData.price,
            image: newProductData.imageurl,
        },
    });
    return product;
};

const deleteProductById = async (id) => {
     await getProductById(id);

await prisma.product.delete({
where: {
    id ,
},
});
//DELETE FROM pro ducts WHERE id = {productId}
}

const patchProductById = async (id, productData) => {
    const product = await prisma.product.update({
        where: {
            id: parseInt(id),
        }, data: {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            image: productData.imageUrl,
        },
    });
    return product;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    patchProductById, 
};