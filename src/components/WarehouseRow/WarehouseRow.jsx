import React from "react";
import "./WarehouseRow.scss";
import { Link } from "react-router-dom";
import deleteImage from "/assets/icons/delete_outline-24px.svg";
import editImage from "/assets/icons/edit-24px.svg";

function WarehouseRow({ warehouse, index, total }) {
  return (
    <ul>
      <li
        key={warehouse.id}
        className={`warehouse-row__row ${
          index === total - 1 ? "last-item" : ""
        }`}
      >
        <div
          className="warehouse-row__col warehouse-row__col--1"
          data-label="warehouse item"
        >
          <Link
            className="warehouse-row__col--title"
            key={warehouse.id}
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
          {/* Trash icon, route to delete modal once created */}
          <button className="warehouse-row__col--btn">
            <img src={deleteImage} alt="delete" />
          </button>
          {/* Route to: <Route path="warehouse/:id/edit" element={<WarehouseEdit />} /> */}
          <Link
            to={`/warehouse/${warehouse.id}/edit`}
            className="warehouse-row__col--btn"
          >
            <img src={editImage} alt="edit" />
          </Link>
        </div>
      </li>
    </ul>
  );
}

export default WarehouseRow;
