const bcrypt = require("bcrypt");
const auth = require("../auth");
const User = require("../models/User_models");

// USER REGISTRATION_________________________________________________________________

module.exports.registerUser = (reqBody) => {
    let newUser = new User({
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        email: reqBody.email,
        password: bcrypt.hashSync(reqBody.password, 10),
    });

    return newUser
        .save()
        .then((user) => {
            if (user) {
                return true;
            } else {
                return false;
            }
        })
        .catch((err) => err);
};

// USER AUTHENTICATION_________________________________________________________________
module.exports.loginUser = (reqBody) => {
    return User.findOne({ email: reqBody.email })
        .then((result) => {
            if (result == null) {
                return false;
            } else {
                const isPasswordCorrect = bcrypt.compareSync(
                    reqBody.password,
                    result.password
                );
                if (isPasswordCorrect) {
                    return { access: auth.createAccessToken(result) };
                } else {
                    return false;
                }
            }
        })
        .catch((err) => err);
};

// // NON-ADMIN USER CHECKOUT (CREATE ORDER)_________________________________________________________________

module.exports.checkout = (data, body) => {
    const userId = data.userId;
    const check = body.check;
    const total = body.total;
    const address = body.address;

    return User.findById(userId)
        .then((user) => {
            user.orderedProduct.push({
                products: check,
                totalAmount: total,
                address: address,
            });
            return user.save();
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};

//RETRIEVE USER DETAILS_________________________________________________________________
module.exports.getProfile = (data) => {
    return User.findById(data.userId).then((result) => {
        result.password = "";

        return result;
    });
};

// Check if the email already exists
module.exports.checkEmailExists = (reqBody) => {
    return User.find({ email: reqBody.email })
        .then((result) => {
            if (result.length > 0) {
                return true;
            } else {
                return false;
            }
        })
        .catch((err) => err);
};

// Retrieve all user details
module.exports.getAllUsers = () => {
    return User.find({})
        .then((users) => {
            return users.map((user) => {
                // Exclude password field for each user
                user.password = "";
                return user;
            });
        })
        .catch((err) => err);
};
