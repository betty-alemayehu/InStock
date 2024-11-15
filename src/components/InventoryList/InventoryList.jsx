import React, { useState, useEffect } from "react";
import "./InventoryList.scss";

import InventoryRow from "../InventoryRow/InventoryRow.jsx";
import InventoryRibbon from "../InventoryRibbon/InventoryRibbon.jsx";
import SearchHeader from "../SearchHeader/SearchHeader.jsx";

import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
//consider removing inventoryItems
export default function InventoryList({ inventoryItems }) {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchInventory();
  }, [search]);

  const fetchInventory = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/inventories`, {
        params: { s: search },
      });
      setInventory(data);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
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
        <InventoryRibbon />
        {inventory.map((inventory) => (
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
