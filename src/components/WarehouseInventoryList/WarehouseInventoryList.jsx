import InventoryRibbon from "../InventoryRibbon/InventoryRibbon";
import InventoryRow from "../InventoryRow/InventoryRow";
import "./WarehouseInventoryList.scss";

export default function WarehouseInventoryList({ inventoryList }) {
	console.log(inventoryList);
	return (
		<>
			<InventoryRibbon />
			<ul className="warehouseInventory__list">
				{inventoryList.map((inventory) => (
					<li key={inventory.id} className="warehouseInventory__item">
						<InventoryRow inventory={inventory} path="warehouse" />
					</li>
				))}
			</ul>
		</>
	);
}
