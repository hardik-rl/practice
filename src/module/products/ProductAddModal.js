import React from "react";
import Modal from "../../components/Modal";
import FormLabel from "../../shared/FormLabel";
import FormInput from "../../shared/FormInput";

const ProductAddModal = ({ viewProduct, onClose }) => {
  return (
    <Modal isOpen={viewProduct} onClose={onClose}>
      <h2>Add Product</h2>
      <form>
        <div className="form-group">
          <FormLabel />
          <FormInput />
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductAddModal;
