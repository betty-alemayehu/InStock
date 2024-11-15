import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./InventoryRow.scss";
import deleteImage from "/assets/icons/delete_outline-24px.svg";
import editImage from "/assets/icons/edit-24px.svg";

const URL = import.meta.env.VITE_API_URL;

function InventoryRow({ inventory }) {
  //to navigate back to page after cancel or submit
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal when delete icon is clicked
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  // Close the modal without deleting
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Confirm delete and redirect
  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`${URL}/inventories/${inventory.id}`);
      if (response.status === 204) {
        navigate("/inventory"); // Redirect after successful delete
      }
    } catch (error) {
      console.error("Error deleting inventory item:", error);
    } finally {
      setIsModalOpen(false); // Close the modal after deletion
    }
  };
  return (
    <div>
      <li className="inventory-row__row">
        <div
          className="inventory-row__col inventory-row__col--1"
          data-label="inventory item"
        >
          <Link
            className="inventory-row__col--title"
            key={inventory.id}
            to={`/inventory/${inventory.id}`}
          >
            {inventory.item_name}
          </Link>
        </div>
        <div
          className="inventory-row__col inventory-row__col--2"
          data-label="Category"
        >
          {inventory.category}
        </div>

        <div
          className="inventory-row__col inventory-row__col--3"
          data-label="Status"
        >
          {/* Conditional styling for in vs out of stock*/}
          {inventory.status === "In Stock" ? (
            <span className="inventory-row__col--success">
              {inventory.status}
            </span>
          ) : (
            <span className="inventory-row__col--failed">
              {inventory.status}
            </span>
          )}
        </div>

        <div
          className="inventory-row__col inventory-row__col--4"
          data-label="Qty"
        >
          {inventory.quantity}
        </div>
        <div className="inventory-row__col inventory-row__col--5 inventory-row__col--5--hidden">
          &nbsp;
        </div>
        <div
          className="inventory-row__col inventory-row__col--5"
          data-label="Warehouse"
        >
          {inventory.warehouse_name}
        </div>
        <div
          className="inventory-row__col inventory-row__col--6"
          data-label="Actions"
        >
          {/* Delete button to trigger modal */}
          <button
            className="inventory-row__col--btn"
            onClick={handleDeleteClick}
          >
            <img src={deleteImage} alt="delete" />
          </button>
          {/* Route to: <Route path="inventory/:id/edit" element={<InventoryEdit />} /> */}
          <Link
            to={`/inventory/${inventory.id}/edit`}
            className="inventory-row__col--btn"
          >
            <img src={editImage} alt="edit" />
          </Link>
        </div>
      </li>

      {/* Delete confirmation modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleConfirmDelete}
        itemName={inventory.item_name} // Pass the item name as a prop
      />
    </div>
  );
}

export default InventoryRow;
