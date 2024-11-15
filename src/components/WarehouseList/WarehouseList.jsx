// import React from "react";
// import "./WarehouseList.scss";

// import WarehouseRow from "../WarehouseRow/WarehouseRow.jsx";
// import WarehouseRibbon from "../WarehouseRibbon/WarehouseRibbon.jsx";
// import SearchHeader from "../SearchHeader/SearchHeader.jsx";

// import { useState } from "react";

// export default function WarehouseList({
//   warehouseItems,
//   generateWarehouseItems,
// }) {
//   const [warehouse, setWarehouse] = useState();

//   const [search, setSearch] = useState("");

//   const handleSearchInput = (event) => {
//     const { value } = event.target;
//     setSearch(value);
//   };

//   return (
//     <>
//       {/* Responsive Search Header */}
//       <SearchHeader
//         title="Warehouses"
//         buttonTitle="+ Add New Warehouse"
//         buttonLink="/warehouse/add"
//         handleSearchInput={handleSearchInput}
//       />
//       <div className="warehouse-list">
//         {/* The table header. Seperate from contents ribbon doesnt show on mobile */}
//         {/* Pass prop of what items to show in list for the warehouse inventory view */}
//         <WarehouseRibbon />
//         {/* Table contents */}
//         {warehouseItems.map((warehouse, index) => (
//           <WarehouseRow
//             key={warehouse.id}
//             index={index}
//             warehouse={warehouse}
//             total={warehouseItems.length}
//             setWarehouse={setWarehouse}
//             generateWarehouseItems={generateWarehouseItems}
//           />
//         ))}
//       </div>
//     </>
//   );
// }
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
    <>
      {/* Responsive Search Header */}
      <SearchHeader
        title="Warehouses"
        buttonTitle="+ Add New Warehouse"
        buttonLink="/warehouse/add"
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
    </>
  );
}
