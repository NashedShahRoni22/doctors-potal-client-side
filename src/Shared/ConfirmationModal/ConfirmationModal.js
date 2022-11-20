import React from "react";

const ConfirmationModal = ({title, message, closeConfirmationModal, handelDeleteDoctor, doctorData}) => {
    return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {title}
          </h3>
          <p className="py-4">
            {message}
          </p>
          <div className="modal-action">
            <label onClick={()=>handelDeleteDoctor(doctorData)} htmlFor="confirmation-modal" className="btn btn-error btn-xs">
              Delete
            </label>
            <label onClick={closeConfirmationModal} className="btn btn-success btn-xs">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
