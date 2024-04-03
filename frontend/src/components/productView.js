import React from "react";

const ProductModal = ({ product, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{product.name}</h2>
        <img src={product.productImage} alt={product.name} className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default ProductModal;
