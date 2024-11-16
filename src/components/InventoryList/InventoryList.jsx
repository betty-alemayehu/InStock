import React, { useState, useEffect } from "react";
import "./InventoryList.scss";

import InventoryRow from "../InventoryRow/InventoryRow.jsx";
import InventoryRibbon from "../InventoryRibbon/InventoryRibbon.jsx";
import SearchHeader from "../SearchHeader/SearchHeader.jsx";

export default function InventoryList({
  inventoryItems,
  generateInventoryItems,
}) {
  const [filteredInventory, setFilteredInventory] = useState(inventoryItems);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search) {
      const filtered = inventoryItems.filter((item) =>
        [item.item_name, item.warehouse_name, item.category, item.description]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      setFilteredInventory(filtered);
    } else {
      setFilteredInventory(inventoryItems);
    }
  }, [search, inventoryItems]);

  const handleSearchInput = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
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
        <InventoryRibbon />
        <ul className="inventory-list__wrap">
          {filteredInventory.map((inventory) => (
            <li className="inventory-row__row" key={inventory.id}>
              <InventoryRow
                inventory={inventory}
                generateInventoryItems={generateInventoryItems}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
