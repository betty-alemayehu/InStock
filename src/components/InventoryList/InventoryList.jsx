import React from "react";
import "./InventoryList.scss";

import InventoryRow from "../InventoryRow/InventoryRow.jsx";
import InventoryRibbon from "../InventoryRibbon/InventoryRibbon.jsx";
import SearchHeader from "../SearchHeader/SearchHeader.jsx";

import { useState } from "react";

<<<<<<< HEAD
export default function InventoryList2({ inventoryItems }) {
	const [inventory, setInventory] = useState();
=======
export default function InventoryList2({
  inventoryItems,
  generateInventoryItems,
}) {
  const [inventory, setInventory] = useState();
>>>>>>> develop

	const [search, setSearch] = useState("");

	const handleSearchInput = (event) => {
		const { value } = event.target;
		setSearch(value);
	};

<<<<<<< HEAD
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
						path="inventory"
					/>
				))}
			</div>
		</div>
	);
=======
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
            generateInventoryItems={generateInventoryItems}
          />
        ))}
      </div>
    </div>
  );
>>>>>>> develop
}
