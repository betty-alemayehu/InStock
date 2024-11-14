import "./Inventory.scss";
// import InventoryList from "../../components/InventoryList/InventoryList";

import InventoryList2 from "../../components/InventoryList2/InventoryList2";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);

  // Hard coded temporarily
  const apiUrl = "http://localhost:5050";

  useEffect(() => {
    generateInventoryItems();
  }, []);
  const generateInventoryItems = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/inventories`);
      setInventoryItems(data); // sets the inventory list as all inventory items
      // check inventory items are fetched in FE console
      console.log(data);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  return (
    <>
      {/* <InventoryList /> */}
      {/* <div className="container"> */}
      <InventoryList2
        inventoryItems={inventoryItems}
        generateInventoryItems={generateInventoryItems}
      />
      {/* </div> */}
    </>
  );
}
