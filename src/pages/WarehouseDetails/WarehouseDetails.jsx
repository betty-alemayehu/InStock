import "./WarehouseDetails.scss";
import WareHouseInfo from "../../components/WarehouseInfo/WarehouseInfo";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

export default function WarehouseDetails() {
	const { id } = useParams();
	const [currentWarehouse, setCurrentWarehouse] = useState(null);
	let navigate = useNavigate();

	useEffect(() => {
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

		getWarehouse();
	}, [id]);

	if (!currentWarehouse) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<WareHouseInfo currentWarehouse={currentWarehouse} />
		</>
	);
}
