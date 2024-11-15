import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./WarehouseInventoryRow.scss";
import deleteImage from "/assets/icons/delete_outline-24px.svg";
import editImage from "/assets/icons/edit-24px.svg";
import LabelContent from "../LabelContent/LabelContent";

function WarehouseInventoryRow({ inventory, getInventory }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleDeleteSuccess = () => {
		getInventory();
	};

	return (
		<>
			<div className="warehouseInventory-row__col warehouseInventory-row__col--1">
				<Link
					className="warehouseInventory-row__col--title"
					key={inventory.id}
					to={`/inventory/${inventory.id}`}
				>
					<LabelContent
						label="inventory item"
						content={inventory.item_name}
						clickable={true}
						path="warehouse"
					/>
				</Link>
			</div>

			<div className="warehouseInventory-row__col warehouseInventory-row__col--2">
				<LabelContent
					label="category"
					content={inventory.category}
					clickable={false}
					path="warehouse"
				/>
			</div>

			<div className="warehouseInventory-row__col warehouseInventory-row__col--3">
				<LabelContent
					label="status"
					content={inventory.status}
					clickable={false}
					path="warehouse"
				/>
			</div>

			<div className="warehouseInventory-row__col warehouseInventory-row__col--4">
				<LabelContent
					label="qty"
					content={inventory.quantity}
					clickable={false}
					path="warehouse"
				/>
			</div>
			<div
				className="warehouseInventory-row__col warehouseInventory-row__col--6"
				data-label="Actions"
			>
				<button
					className="warehouseInventory-row__col--btn"
					onClick={() => setIsModalOpen(true)}
				>
					<img
						src={deleteImage}
						alt="delete icon"
						className="warehouseInventory-row__image"
					/>
				</button>
				<Link
					to={`/inventory/${inventory.id}/edit`}
					className="warehouseInventory-row__col--btn"
				>
					<img
						src={editImage}
						alt="edit icon"
						className="warehouseInventory-row__image"
					/>
				</Link>
			</div>

			<DeleteModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				itemType="inventory"
				itemId={inventory.id}
				itemName={inventory.item_name}
				onSuccess={handleDeleteSuccess}
			/>
		</>
	);
}

export default WarehouseInventoryRow;
