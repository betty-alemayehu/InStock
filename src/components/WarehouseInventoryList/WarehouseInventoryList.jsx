import InventoryRibbon from "../InventoryRibbon/InventoryRibbon";
import InventoryRow from "../InventoryRow/InventoryRow";
import "./WarehouseInventoryList.scss";

export default function WarehouseInventoryList({ inventoryList }) {
	console.log(inventoryList);
	return (
		<>
			<InventoryRibbon />
			<ul>
				{inventoryList.map((inventory) => (
					<li key={inventory.id}>
						<InventoryRow inventory={inventory} path="warehouse" />
					</li>
				))}
			</ul>
		</>
	);
}
