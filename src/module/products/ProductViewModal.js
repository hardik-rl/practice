import React from "react";
import Modal from "../../components/Modal";

const ProductViewModal = ({
  viewProduct,
  productData,
  setProductData,
  setViewProduct,
}) => {
  const closeModal = () => {
    setViewProduct(false);
    setProductData("");
    document.body.classList.remove("modal-open");
  };
  return (
    <Modal isOpen={viewProduct} onClose={closeModal}>
      <>
        <h2>Products {productData.id} Details</h2>
        <ul>
          <li>
            <strong>Title :- </strong>
            {productData.title}
          </li>
          <li>
            <strong>Description :- </strong>
            {productData.description}
          </li>
          <li>
            <strong>Price :- </strong>
            {productData.price}
          </li>
          <li>
            <strong>Category :- </strong>
            {productData.category}
          </li>
          <li>
            <strong>Rating :- </strong>
            {productData.rating?.count} out of
            <span
              style={{
                color: productData.rating?.rate > 3 ? "green" : "red",
                fontWeight: 600,
              }}
            >
              {productData.rating?.rate}
            </span>
          </li>
          <li>
            <strong>Image :- </strong>
            <img width={50} height={50} src={productData.image} alt="img" />
          </li>
        </ul>
      </>
    </Modal>
  );
};

export default ProductViewModal;
