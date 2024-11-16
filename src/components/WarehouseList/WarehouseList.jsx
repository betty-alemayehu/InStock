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
  const [sortBy, setSortBy] = useState(null); // State for sorting column
  const [orderBy, setOrderBy] = useState("asc"); // State for sorting order

  // Filter warehouses based on the search term
  useEffect(() => {
    let updatedWarehouses = [...warehouseItems];

    // Apply search filter
    if (search) {
      updatedWarehouses = updatedWarehouses.filter((warehouse) =>
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
    }

    // Apply sorting if sortBy is set
    if (sortBy) {
      updatedWarehouses.sort((a, b) => {
        const aValue = a[sortBy]?.toString().toLowerCase() || "";
        const bValue = b[sortBy]?.toString().toLowerCase() || "";

        if (aValue < bValue) return orderBy === "asc" ? -1 : 1;
        if (aValue > bValue) return orderBy === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredWarehouses(updatedWarehouses);
  }, [search, sortBy, orderBy, warehouseItems]);

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };

  // Handle sorting logic
  const handleSort = (column) => {
    if (sortBy === column) {
      setOrderBy(orderBy === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setOrderBy("asc");
    }
  };

  return (
    <>
      {/* Responsive Search Header */}
      <SearchHeader
        title="Warehouses"
        buttonTitle="+ Add New Warehouse"
        buttonLink="/warehouses/add"
        handleSearchInput={handleSearchInput}
      />
      <div className="warehouse-list">
        <WarehouseRibbon
          onSort={handleSort}
          sortBy={sortBy}
          orderBy={orderBy}
        />
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
    </>
  );
}
