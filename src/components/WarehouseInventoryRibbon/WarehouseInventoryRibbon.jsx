import "./WarehouseInventoryRibbon.scss";

function WarehouseInventoryRibbon() {
	return (
		<div className="warehouseInventory-ribbon">
			<div className="warehouseInventory-ribbon__col warehouseInventory-ribbon__col--1">
				Inventory Item
				<button className="sort"></button>
			</div>
			<div className="warehouseInventory-ribbon__col warehouseInventory-ribbon__col--2">
				Category
				<button className="sort"></button>
			</div>
			<div className="warehouseInventory-ribbon__col warehouseInventory-ribbon__col--3">
				Status
				<button className="sort"></button>
			</div>
			<div className="warehouseInventory-ribbon__col warehouseInventory-ribbon__col--4">
				Quantity
				<button className="sort"></button>
			</div>
			<div className="warehouseInventory-ribbon__col warehouseInventory-ribbon__col--6">
				Actions
			</div>
		</div>
	);
}

export default WarehouseInventoryRibbon;
