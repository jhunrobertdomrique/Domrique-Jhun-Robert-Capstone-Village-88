const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_Controller");
const auth = require("../auth");

// ROUTES REGISTRATION_________________________________________________________________
router.post("/register", (req, res) => {
    userController
        .registerUser(req.body)
        .then((resultFromController) => res.send(resultFromController))
        .catch((err) => res.send(err));
});

// ROUTES AUTHENTICATION_________________________________________________________________
router.post("/login", (req, res) => {
    userController
        .loginUser(req.body)
        .then((resultFromController) => res.send(resultFromController))
        .catch((err) => res.send(err));
});

// // NON-ADMIN USER CHECKOUT (CREATE ORDER)_________________________________________________________________

router.post("/checkout", auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization);
    let data = {
        userId: userData.id,
        isAdmin: userData.isAdmin,
    };

    if (data.isAdmin === false) {
        userController
            .checkout(data, req.body)
            .then((resultFromController) => res.send(resultFromController))
            .catch((err) => res.send(err));
    }
});

// ROUTE: RETRIEVE USER DETAILS_________________________________________________________________
router.get("/:userId/userDetails", (req, res) => {
    const userData = auth.decode(req.headers.authorization);

    userController
        .getProfile({ userId: userData.id })
        .then((resultFromController) => res.send(resultFromController))
        .catch((err) => res.send(err));
});
// ROUTE: CheckEmails_________________________________________________________________
router.post("/checkEmail", (req, res) => {
    userController
        .checkEmailExists(req.body)
        .then((resultFromController) => res.send(resultFromController))
        .catch((err) => res.send(err));
});

// ROUTE: RETRIEVE ALL USER DETAILS
router.get("/allUsers", (req, res) => {
    userController
        .getAllUsers()
        .then((resultFromController) => res.send(resultFromController))
        .catch((err) => res.send(err));
});

//Do not touch this exports.............................
module.exports = router;
