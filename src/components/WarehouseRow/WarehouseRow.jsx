import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./WarehouseRow.scss";
import deleteImage from "/assets/icons/delete_outline-24px.svg";
import editImage from "/assets/icons/edit-24px.svg";

function WarehouseRow({ warehouse, generateWarehouseItems }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteSuccess = () => {
    generateWarehouseItems();
  };

  return (
    <ul>
      <li className="warehouse-row__row">
        <div
          className="warehouse-row__col warehouse-row__col--1"
          data-label="warehouse item"
        >
          <Link
            className="warehouse-row__col--title"
            to={`/warehouse/${warehouse.id}`}
          >
            {warehouse.warehouse_name}
          </Link>
        </div>
        <div
          className="warehouse-row__col warehouse-row__col--2"
          data-label="Address"
        >
          {warehouse.address}
        </div>
        <div
          className="warehouse-row__col warehouse-row__col--3"
          data-label="Contact Name"
        >
          {warehouse.contact_name}
        </div>

        <div
          className="warehouse-row__col warehouse-row__col--4"
          data-label="Contact Information"
        >
          <div>{warehouse.contact_phone}</div>
          <div>{warehouse.contact_email}</div>
        </div>

        <div
          className="warehouse-row__col warehouse-row__col--5"
          data-label="Actions"
        >
          <button
            className="warehouse-row__col--btn"
            onClick={() => setIsModalOpen(true)}
          >
            <img src={deleteImage} alt="delete" />
          </button>
          <Link
            to={`/warehouse/${warehouse.id}/edit`}
            className="warehouse-row__col--btn"
          >
            <img src={editImage} alt="edit" />
          </Link>
        </div>
      </li>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        itemType="warehouse"
        itemId={warehouse.id}
        itemName={warehouse.warehouse_name}
        onSuccess={handleDeleteSuccess}
      />
    </ul>
  );
}

export default WarehouseRow;
