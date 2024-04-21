const express = require("express");
const router = express.Router();
const productController = require("../controllers/product_Controller");
const auth = require("../auth");

//ROUTES : CREATE PRODUCT (ADMIN ONLY).....................................
router.post("/create", auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization);

    if (userData.isAdmin) {
        productController
            .addProduct(req.body)
            .then((resultFromController) => res.send(resultFromController))
            .catch((err) => res.send(err));
    } else {
        res.send(false);
    }
});

// ROUTES: RETRIEVE ALL PRODUCTS ............................................
router.get("/all", auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization);

    if (userData.isAdmin) {
        productController
            .getAllProducts()
            .then((resultFromController) => res.send(resultFromController))
            .catch((err) => res.send(err));
    } else {
        res.send(false);
    }
});

// ROUTES: RETRIEVE ALL "ACTIVE" PRODUCTS ............................................
router.get("/active", (req, res) => {
    productController
        .getAllActiveProducts()
        .then((resultFromController) => res.send(resultFromController))
        .catch((err) => res.send(err));
});

// ROUTES: RETRIEVE "SINGLE" PRODUCTS ...........................................
router.get("/:productId", (req, res) => {
    console.log(req.params);
    productController
        .getProduct(req.params)
        .then((resultFromController) => res.send(resultFromController));
});
router.get("/:productId/edit", (req, res) => {
    productController
        .editProduct(req.params)
        .then((resultFromController) => res.send(resultFromController));
});
// ROUTE: UPDATE PRODUCT INFORMATION (ADMIN ONLY) .........................................
router.put("/:productId", auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization);

    if (userData.isAdmin) {
        productController
            .updateProduct(req.params, req.body)
            .then((resultFromController) => res.send(resultFromController))
            .catch((err) => res.send(err));
    } else {
        res.send(false);
    }
});

//ROUTES: ARCHIVE PRODUCT (ADMIN ONLY) .........................................
router.patch("/:productId/archive", auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization);

    if (userData.isAdmin) {
        productController
            .archiveProduct(req.params)
            .then((resultFromController) => res.send(resultFromController))
            .catch((err) => res.send(err));
    } else {
        res.send(false);
    }
});

//ROUTES: UNARCHIVE PRODUCT (ADMIN ONLY) .........................................
router.patch("/:productId/unarchive", auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization);

    if (userData.isAdmin) {
        productController
            .unarchiveProduct(req.params)
            .then((resultFromController) => res.send(resultFromController))
            .catch((err) => res.send(err));
    } else {
        res.send(false);
    }
});

// DELETE

router.delete("/:productId", auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization);

    if (userData.isAdmin) {
        productController
            .deleteProduct(req.params)
            .then((resultFromController) => res.send(resultFromController))
            .catch((err) => res.send(err));
    } else {
        res.send(false);
    }
});
//Do not touch by touch.......................................
module.exports = router;
