import React from "react";
import "./DeleteModal.scss";
import closeIcon from "/assets/icons/close-24px.svg";

function DeleteModal({ isOpen, onClose, onDelete, itemName }) {
  if (!isOpen) return null; // Don’t render the modal if it’s not open

  return (
    <div className="modal">
      <div className="modal__overlay">
        <div className="modal__content">
          <img
            src={closeIcon}
            alt="Close"
            className="modal__close-icon"
            onClick={onClose}
          />
          <div className="modal__text-container">
            <h1 className="modal__title">Delete {itemName} inventory item?</h1>
            <p className="modal__description">
              Please confirm that you’d like to delete {itemName} from the
              inventory list. You won’t be able to undo this action.
            </p>
          </div>
          <div className="modal__buttons">
            <button className="button button--secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="button button--delete" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
