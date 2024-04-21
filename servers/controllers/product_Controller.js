const Product = require("../models/Product_models");

// CREATE PRODUCT (ADMIN ONLY)...................................................
module.exports.addProduct = (reqBody) => {
    let newProduct = new Product({
        category: reqBody.category,
        name: reqBody.name,
        description: reqBody.description,
        price: reqBody.price,
        image: reqBody.image,
    });

    return newProduct
        .save()
        .then((product) => true)
        .catch((err) => false);
};

// RETRIEVE ALL COURSES ..............................................................
module.exports.getAllProducts = () => {
    return Product.find({})
        .then((result) => result)
        .catch((err) => err);
};

// RETRIEVE ALL "ACTIVE" PRODUCTS ............................................
module.exports.getAllActiveProducts = () => {
    return Product.find({ isActive: true })
        .then((result) => result)
        .catch((err) => err);
};

// RETRIEVE "SINGLE" PRODUCTS ...........................................
module.exports.getProduct = (reqParams) => {
    return Product.findById(reqParams.productId)
        .then((result) => {
            return result;
        })
        .catch((err) => err);
};
module.exports.editProduct = (reqParams) => {
    return Product.findById(reqParams.productId)
        .then((result) => {
            return result;
        })
        .catch((err) => err);
};

// UPDATE PRODUCT INFORMATION (ADMIN ONLY) .........................................
//redo => "true" for line52 soon....
module.exports.updateProduct = (reqParams, reqBody) => {
    let updatedProduct = {
        isActive: reqBody.isActive,
        category: reqBody.category,
        image: reqBody.image,
        name: reqBody.name,
        description: reqBody.description,
        price: reqBody.price,
    };

    return Product.findByIdAndUpdate(reqParams.productId, updatedProduct)
        .then((product) => true)
        .catch((err) => err);
};

// ARCHIVE PRODUCT (ADMIN ONLY) .........................................
module.exports.archiveProduct = (reqParams) => {
    let archiveActiveField = {
        isActive: false,
    };

    return Product.findByIdAndUpdate(reqParams.productId, archiveActiveField)
        .then((course) => true)
        .catch((err) => err);
};

// UNARCHIVE PRODUCT (ADMIN ONLY) .........................................
module.exports.unarchiveProduct = (reqParams) => {
    let archiveActiveField = {
        isActive: true,
    };

    return Product.findByIdAndUpdate(reqParams.productId, archiveActiveField)
        .then((course) => true)
        .catch((err) => err);
};

// DELETE
module.exports.deleteProduct = (reqParams) => {
    return Product.findByIdAndRemove(reqParams.productId)

        .then((removedProduct) => removedProduct)

        .catch((error) => error);
};
