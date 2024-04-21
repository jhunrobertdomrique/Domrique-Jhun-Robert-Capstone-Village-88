//directives to load Node.Js/////////////////////////////////////////////////////
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/user_Routes");
const productRoute = require("./routes/product_Routes");
const app = express();
const port = process.env.PORT || 4000;
const db = mongoose.connection;

// Connect to MOngoDB database////////////////////////////////////////////////
mongoose.connect(
    "mongodb+srv://admin:admin123@batch253-domrique.wk1bqpw.mongodb.net/Jolly-Go?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
db.once("open", () => console.log("Now connected to MongoDB Atlas."));

//app.use///////////////////////////////////////////////////////////////////////
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes/////////////////////////////////////////////////////////////////////////
app.use("/users", userRoute);
app.use("/products", productRoute);

//This is to listen//////////////////////////////////////////////////////////////
if (require.main === module) {
    app.listen(port, () => {
        console.log(`API is now online on port ${port}`);
    });
}
///////////////////////////////////////////////////////////////////////////////////
//Arot-arot lang....
module.exports = app;
