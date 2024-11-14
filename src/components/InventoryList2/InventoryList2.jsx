import React from "react";
import "./InventoryList2.scss";

// import InventoryHeader from "../InventoryHeader/InventoryHeader.jsx";
// import InventoryItem from "../InventoryItem/InventoryItem.jsx";

// import searchIcon from "/assets/icons/search-24px.svg";
// import chevronIcon from "/assets/icons/chevron_right-24px.svg";
// import trashIcon from "/assets/icons/delete_outline-24px.svg";
// import editIcon from "/assets/icons/edit-24px.svg";

import InventoryRow from "../InventoryRow/InventoryRow";
import InventoryRibbon from "../InventoryRibbon/InventoryRibbon.jsx";
import SearchHeader from "../SearchHeader/SearchHeader";

import { useState } from "react";

import { Link } from "react-router-dom";

export default function InventoryList2({
  inventoryItems,
  generateInventoryItems,
}) {
  const [inventory, setInventory] = useState();

  const [search, setSearch] = useState("");

  const handleSearchInput = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <div>
      {/* Responsive Search Header */}
      <SearchHeader
        title="Inventory"
        buttonTitle="+ Add New Item"
        buttonLink="/inventory/add"
        handleSearchInput={handleSearchInput}
      />
      <div className="inventory-list">
        {/* The table header. Seperate from contents ribbon doesnt show on mobile */}
        {/* Pass prop of what items to show in list for the warehouse inventory view */}
        <InventoryRibbon />
        {/* Table contents */}
        {inventoryItems.map((inventory) => (
          <InventoryRow
            key={inventory.id}
            inventory={inventory}
            setInventory={setInventory}
          />
        ))}
      </div>
    </div>
  );
}
