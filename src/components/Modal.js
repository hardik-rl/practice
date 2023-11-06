import React from "react";

const Modal = ({ setIsVisible,children }) => {
  return (
    <div className="modal">
      <h2 align="center">Example of Modal in Reactjs</h2>
      <div className="modal-content">
        <div className="close">
          <button onClick={() => setIsVisible(false)}>Close</button>
        </div>
       {children}
        {/* <iframe
          className="h-full w-full"
          src={`${documentPreview.path}#toolbar=0`}
        ></iframe> */}
      </div>
    </div>
  );
};

export default Modal;
