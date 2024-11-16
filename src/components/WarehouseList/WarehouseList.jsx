import React, { useState, useEffect } from "react";
import "./WarehouseList.scss";

import WarehouseRow from "../WarehouseRow/WarehouseRow.jsx";
import WarehouseRibbon from "../WarehouseRibbon/WarehouseRibbon.jsx";
import SearchHeader from "../SearchHeader/SearchHeader.jsx";

export default function WarehouseList({
  warehouseItems,
  generateWarehouseItems,
}) {
  const [filteredWarehouses, setFilteredWarehouses] = useState(warehouseItems);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search) {
      const filtered = warehouseItems.filter((warehouse) =>
        [
          warehouse.warehouse_name,
          warehouse.address,
          warehouse.city,
          warehouse.country,
          warehouse.contact_name,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      setFilteredWarehouses(filtered);
    } else {
      setFilteredWarehouses(warehouseItems);
    }
  }, [search, warehouseItems]);

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="warehouse-container">
      {/* Responsive Search Header */}
      <SearchHeader
        title="Warehouses"
        buttonTitle="+ Add New Warehouse"
        buttonLink="/warehouses/add"
        handleSearchInput={handleSearchInput}
      />
      <div className="warehouse-list">
        <WarehouseRibbon />
        {filteredWarehouses.map((warehouse, index) => (
          <WarehouseRow
            key={warehouse.id}
            index={index}
            warehouse={warehouse}
            total={filteredWarehouses.length}
            generateWarehouseItems={generateWarehouseItems}
          />
        ))}
      </div>
    </div>
  );
}
