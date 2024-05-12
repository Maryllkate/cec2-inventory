const Purchase = require("../models/purchase");
const Product = require("../models/product");

const purchaseStock = async (productID, purchaseStockData) => {
  try {
    // Retrieve current product data
    const myProductData = await Product.findOne({ _id: productID });
    
    // Parse purchaseStockData to ensure it's treated as a number
    const purchaseQuantity = parseInt(purchaseStockData);
    
    // Update stock quantity
    const myUpdatedStock = myProductData.stock + purchaseQuantity;
    
    // Update the product document with the new stock quantity
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productID },
      { stock: myUpdatedStock },
      { new: true } // Return the updated document
    );

    console.log("Stock updated successfully:", updatedProduct);
  } catch (error) {
    console.error("Error updating Purchase stock: ", error);
  }
};

module.exports = purchaseStock;
