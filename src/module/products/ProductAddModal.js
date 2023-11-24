import React from "react";
import Modal from "../../components/Modal";

const ProductAddModal = ({ viewProduct, onClose }) => {
  return (
    <Modal isOpen={viewProduct} onClose={onClose}>
      <h2>Add Product</h2>
    </Modal>
  );
};

export default ProductAddModal;
