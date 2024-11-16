import "./Warehouses.scss";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
const apiUrl = import.meta.env.VITE_API_URL;

import axios from "axios";
import { useState, useEffect } from "react";

export default function Warehouses() {
	const [warehouseItems, setWarehouseItems] = useState([]);

	useEffect(() => {
		generateWarehouseItems();
	}, []);

	const generateWarehouseItems = async () => {
		try {
			const { data } = await axios.get(`${apiUrl}/warehouses`);
			setWarehouseItems(data);
		} catch (error) {
			console.error("Error fetching warehouse data:", error);
		}
	};

	return (
		<WarehouseList
			warehouseItems={warehouseItems}
			generateWarehouseItems={generateWarehouseItems}
		/>
	);
}
