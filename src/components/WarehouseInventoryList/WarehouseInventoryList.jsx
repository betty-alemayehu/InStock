import WarehouseInventoryRibbon from "../WarehouseInventoryRibbon/WarehouseInventoryRibbon";
import WarehouseInventoryRow from "../WarehouseInventoryRow/WarehouseInventoryRow";
import "./WarehouseInventoryList.scss";

export default function WarehouseInventoryList({
	inventoryList,
	getInventory,
}) {
	return (
		<>
			<WarehouseInventoryRibbon />
			<ul className="warehouseInventory__list">
				{inventoryList.map((inventory) => (
					<li key={inventory.id} className="warehouseInventory__item">
						<WarehouseInventoryRow
							inventory={inventory}
							getInventory={getInventory}
						/>
					</li>
				))}
			</ul>
		</>
	);
}
