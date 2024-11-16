import React, { useState, useEffect } from "react";
import "./InventoryList.scss";

import InventoryRow from "../InventoryRow/InventoryRow.jsx";
import InventoryRibbon from "../InventoryRibbon/InventoryRibbon.jsx";
import SearchHeader from "../SearchHeader/SearchHeader.jsx";

export default function InventoryList({ inventoryItems }) {
  const [filteredInventory, setFilteredInventory] = useState(inventoryItems);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(null); // State for sorting column
  const [orderBy, setOrderBy] = useState("asc"); // State for sorting order

  // Apply search and sorting functionality
  useEffect(() => {
    let updatedInventory = [...inventoryItems];

    // Apply search filter
    if (search) {
      updatedInventory = updatedInventory.filter((item) =>
        [item.item_name, item.warehouse_name, item.category, item.description]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Apply sorting if sortBy is set
    if (sortBy) {
      updatedInventory.sort((a, b) => {
        const aValue = a[sortBy]?.toString().toLowerCase() || "";
        const bValue = b[sortBy]?.toString().toLowerCase() || "";

        if (aValue < bValue) return orderBy === "asc" ? -1 : 1;
        if (aValue > bValue) return orderBy === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredInventory(updatedInventory);
  }, [search, sortBy, orderBy, inventoryItems]);

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
    <div className="inventory-container">
      {/* Responsive Search Header */}
      <SearchHeader
        title="Inventory"
        buttonTitle="+ Add New Item"
        buttonLink="/inventory/add"
        handleSearchInput={handleSearchInput}
      />
      <div className="inventory-list">
        <InventoryRibbon
          onSort={handleSort}
          sortBy={sortBy}
          orderBy={orderBy}
        />
        {filteredInventory.map((inventory) => (
          <InventoryRow key={inventory.id} inventory={inventory} />
        ))}
      </div>
    </div>
  );
}
