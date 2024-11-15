/* eslint-disable react/prop-types */
import axios from "axios";
import "./InventoryDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const { VITE_API_URL } = import.meta.env;

export default function InventoryDetails() {
	const { id } = useParams();
	let navigate = useNavigate();
	const [currentInventoryItem, setCurrentInventoryItem] = useState(null);

	async function getInventoryItem() {
		try {
			const response = await axios.get(`${VITE_API_URL}/inventories/${id}`);
			setCurrentInventoryItem(response.data);
		} catch (error) {
			if (error.status === 404) {
				navigate("/inventory");
			}
			console.error(`Unable to retrieve inventory details: ${error}`);
		}
	}

	useEffect(() => {
		getInventoryItem();
	}, [id]);

	if (!currentInventoryItem) {
		return <div>Loading...</div>;
	}
	const { description, category, status, quantity, warehouse_name, item_name } =
		currentInventoryItem;

	return (
		<>
			<section className="inventoryDetails-card">
				<LabelContent label="item description" content={description} />
				<LabelContent label="category" content={category} />
				<div className="inventoryDetails-card">
					<div>
						<LabelContent label="status" content={status} />
						<LabelContent label="quantity" content={quantity} />
					</div>
					<LabelContent label="warehouse" content={warehouse_name} />
				</div>
			</section>
		</>
	);
}

function LabelContent({ label, content }) {
	return (
		<div className="inventory-info">
			<h2 className="inventory-info__title">{label}</h2>
			<span className="inventory-info__description">{content}</span>
		</div>
	);
}
