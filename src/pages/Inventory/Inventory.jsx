import "./Inventory.scss";
import InventoryList from "../../components/InventoryList/InventoryList";
const apiUrl = import.meta.env.VITE_API_URL;

import axios from "axios";
import { useEffect, useState } from "react";

export default function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);

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
      <InventoryList
        inventoryItems={inventoryItems}
        generateInventoryItems={generateInventoryItems}
      />
    </>
  );
}
