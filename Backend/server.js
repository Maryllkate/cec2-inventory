const express = require("express");
const dotenv = require("dotenv").config();
// const { main } = require("./models/index");
const mongoose = require("mongoose");
const productRoute = require("./router/product");
const storeRoute = require("./router/store");
const purchaseRoute = require("./router/purchase");
const salesRoute = require("./router/sales");
const cors = require("cors");
const User = require("./models/users");
const Product = require("./models/product"); //


const app = express();
// const PORT = 4000;
// main();
app.use(express.json());
app.use(cors());

// database connection 
// Connect to DB and start server
const PORT = process.env.PORT || 4000;
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

  let cec2Inventory = mongoose.connection;
  cec2Inventory.on('error', console.error.bind(console, "connection error"));
  cec2Inventory.on('open', () => console.log("connected to mongoDB Atlas"))


app.use("/api/store", storeRoute);
app.use("/api/product", productRoute);
app.use("/api/purchase", purchaseRoute);
app.use("/api/sales", salesRoute);

// ------------- Signin --------------
let userAuthCheck;
app.post("/api/login", async (req, res) => {
  console.log(req.body);
  // res.send("hi");
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log("USER: ", user);
    if (user) {
      res.send(user);
      userAuthCheck = user;
      res.status(200)
    } else {
      res.status(401).send("Invalid Credentials");
      userAuthCheck = null;
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Getting User Details of login user
app.get("/api/login", (req, res) => {
  res.send(userAuthCheck);
});
// ------------------------------------

// Registration API
app.post("/api/register", (req, res) => {
  let registerUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    imageUrl: req.body.imageUrl,
  });

  registerUser
    .save()
    .then((result) => {
      res.status(200).send(result);
      alert("Signup Successfull");
    })
    .catch((err) => console.log("Signup: ", err));
  console.log("request: ", req.body);
});


app.get("/testget", async (req,res)=>{
  const result = await Product.findOne({ _id: '6429979b2e5434138eda1564'})
  res.json(result)

})

// // Here we are listening to the server
// app.listen(PORT, () => {
//   console.log("Successfully Connected to mongoDB");
// });
