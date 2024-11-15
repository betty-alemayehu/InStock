import React from "react";
import "./WarehouseList.scss";

import WarehouseRow from "../WarehouseRow/WarehouseRow.jsx";
import WarehouseRibbon from "../WarehouseRibbon/WarehouseRibbon.jsx";
import SearchHeader from "../SearchHeader/SearchHeader.jsx";

import { useState } from "react";

export default function WarehouseList({
  warehouseItems,
  generateWarehouseItems,
}) {
  const [warehouse, setWarehouse] = useState();

  const [search, setSearch] = useState("");

  const handleSearchInput = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <>
      {/* Responsive Search Header */}
      <SearchHeader
        title="Warehouses"
        buttonTitle="+ Add New Warehouse"
        buttonLink="/warehouse/add"
        handleSearchInput={handleSearchInput}
      />
      <div className="warehouse-list">
        {/* The table header. Seperate from contents ribbon doesnt show on mobile */}
        {/* Pass prop of what items to show in list for the warehouse inventory view */}
        <WarehouseRibbon />
        {/* Table contents */}
        {warehouseItems.map((warehouse, index) => (
          <WarehouseRow
            key={warehouse.id}
            index={index}
            warehouse={warehouse}
            total={warehouseItems.length}
            setWarehouse={setWarehouse}
            generateWarehouseItems={generateWarehouseItems}
          />
        ))}
      </div>
    </>
  );
}
