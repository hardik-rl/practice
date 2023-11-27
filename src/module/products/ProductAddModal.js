import React from "react";
import { useFormik } from "formik";
import Modal from "../../components/Modal";
import { addProductApi } from "./api";
import FormLabel from "../../shared/FormLabel";
import FormInput from "../../shared/FormInput";

const ProductAddModal = ({ viewProduct, onClose }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    },
    onSubmit: (data) => {
      addProductApi(data);
      onClose();
    },
  });
  return (
    <Modal isOpen={viewProduct} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <FormLabel name="Title" />
            <FormInput
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <FormLabel name="Price" />
            <FormInput
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <FormLabel name="Description" />
            <FormInput
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <FormLabel name="Image" />
            <FormInput
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <FormLabel name="Category" />
            <FormInput
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn-primary mt-6">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default ProductAddModal;
