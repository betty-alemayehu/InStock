/* eslint-disable react/prop-types */
import axios from "axios";
import "./InventoryDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailsHeader from "../../components/DetailsHeader/DetailsHeader";
import LabelContent from "../../components/LabelContent/LabelContent";

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
		<div className="inventoryDetails__container">
			<div className="inventoryDetails__container--shadow">
				<DetailsHeader
					title={item_name}
					pathBack="/inventory"
					pathEdit={`/inventory/${id}`}
				/>
				<section className="inventoryDetails-card">
					<div className="inventoryDetails-card__section inventoryDetails-card__section--one">
						<LabelContent label="item description:" content={description} />
						<LabelContent label="category:" content={category} />
					</div>
					<div className="inventoryDetails-card__section inventoryDetails-card__section--two">
						<div className="inventoryDetails-card__section inventoryDetails-card__section--three">
							<LabelContent
								label="status:"
								content={status}
								className="inventoryDetails-card__section--status"
							/>
							<LabelContent
								label="quantity:"
								content={quantity}
								className="inventoryDetails-card__section--quantity"
							/>
						</div>
						<LabelContent label="warehouse:" content={warehouse_name} />
					</div>
				</section>
			</div>
		</div>
	);
}
