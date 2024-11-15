import "./WarehouseDetails.scss";
import WareHouseInfo from "../../components/WarehouseInfo/WarehouseInfo";
import WarehouseInventoryList from "../../components/WarehouseInventoryList/WarehouseInventoryList";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

export default function WarehouseDetails() {
	const { id } = useParams();
	const [currentWarehouse, setCurrentWarehouse] = useState(null);
	const [inventoryList, setInventoryList] = useState([]);
	let navigate = useNavigate();

	async function getWarehouse() {
		try {
			const response = await axios.get(`${VITE_API_URL}/warehouses/${id}`);
			setCurrentWarehouse(response.data);
		} catch (error) {
			if (error.status === 404) {
				navigate("/");
			}

			console.error(`Cannot fetch warehouse with id ${id}: ${error}`);
		}
	}

	async function getInventory() {
		try {
			const response = await axios.get(
				`${VITE_API_URL}/warehouses/${id}/inventories`
			);
			setInventoryList(response.data);
		} catch (error) {
			if (error.status === 404) {
				navigate("/");
			}

			console.error(`Cannot fetch warehouse with id ${id}: ${error}`);
		}
	}
	useEffect(() => {
		getWarehouse();
		getInventory();
	}, [id]);

	if (!currentWarehouse || inventoryList.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<div className="warehouseDetails__container">
			<div className="warehouseDetails__container--shadow">
				<WareHouseInfo currentWarehouse={currentWarehouse} />
				<WarehouseInventoryList inventoryList={inventoryList} />
			</div>
		</div>
	);
}
