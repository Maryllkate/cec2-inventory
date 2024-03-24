const mongoose = require("mongoose");
const uri = "mongodb+srv://marylldriz:Chikit%400016@b-297.ynrfqyy.mongodb.net/cec2-inventory?retryWrites=true&w=majority";

async function main() {
    try {
        await mongoose.connect(uri);
        console.log("Connection to mongoDB successful");
    } catch (err){
        console.error("Error connecting to mongoDB.", err);
    }
}

module.exports = { main };