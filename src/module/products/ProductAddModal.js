import React from "react";
import * as yup from "yup";
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
      addProductApi(data).then(() => onClose());
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Title is required"),
      price: yup.number().required("Price is required"),
      description: yup.string().required("Description is required"),
      image: yup.string().required("Image is required"),
      category: yup.string().required("Category is required"),
    }),
  });
  return (
    <Modal isOpen={viewProduct} onClose={onClose}>
      <h1 className="text-2xl font-semibold mb-3">Add Product</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <FormLabel name="Title" />
            <FormInput
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-600 text-sm">{formik.errors.title}</p>
            )}
          </div>
          <div>
            <FormLabel name="Price" />
            <FormInput
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-600 text-sm">{formik.errors.price}</p>
            )}
          </div>
          <div>
            <FormLabel name="Description" />
            <FormInput
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-600 text-sm">
                {formik.errors.description}
              </p>
            )}
          </div>
          <div>
            <FormLabel name="Image" />
            <FormInput
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
            />
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-600 text-sm">{formik.errors.image}</p>
            )}
          </div>
          <div>
            <FormLabel name="Category" />
            <FormInput
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
            />
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-600 text-sm">{formik.errors.category}</p>
            )}
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
