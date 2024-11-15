import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./InventoryRow.scss";
import deleteImage from "/assets/icons/delete_outline-24px.svg";
import editImage from "/assets/icons/edit-24px.svg";

function InventoryRow({ inventory, generateInventoryItems }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteSuccess = () => {
    generateInventoryItems();
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
          <button
            className="inventory-row__col--btn"
            onClick={() => setIsModalOpen(true)}
          >
            <img src={deleteImage} alt="delete" />
          </button>
          <Link
            to={`/inventory/${inventory.id}/edit`}
            className="inventory-row__col--btn"
          >
            <img src={editImage} alt="edit" />
          </Link>
        </div>
      </li>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        itemType="inventory"
        itemId={inventory.id}
        itemName={inventory.item_name}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
}

export default InventoryRow;
