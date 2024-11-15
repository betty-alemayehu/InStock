import React from "react";
import "./DeleteModal.scss";
import closeIcon from "/assets/icons/close-24px.svg";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function DeleteModal({
  isOpen,
  onClose,
  itemType,
  itemId,
  itemName,
  onSuccess,
}) {
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      const endpoint =
        itemType === "inventory"
          ? `${apiUrl}/inventories/${itemId}`
          : `${apiUrl}/warehouses/${itemId}`;
      const response = await axios.delete(endpoint);

      if (response.status === 204) {
        onSuccess(); // Callback to refresh list or navigate
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error(`Error deleting ${itemType} item:`, error);
    }
  };

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
            <h1 className="modal__title">
              Delete {itemName} {itemType}
              {itemType === "inventory" ? " item?" : "?"}
            </h1>
            <p className="modal__description">
              {`Please confirm that you’d like to delete ${itemName} from the
                             ${
                               itemType === "inventory"
                                 ? " inventory list"
                                 : " list of warehouses"
                             }. You won’t be able to undo this action.`}
            </p>
          </div>
          <div className="modal__buttons">
            <button className="button button--secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="button button--delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
