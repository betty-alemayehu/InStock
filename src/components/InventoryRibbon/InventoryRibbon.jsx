import "./InventoryRibbon.scss";

function InventoryRibbon({ onSort, sortBy, orderBy }) {
  // Utility function to determine the appropriate sort class
  const getSortClass = (column) => {
    if (sortBy === column) {
      return `sort ${orderBy === "asc" ? "sort--asc" : "sort--desc"}`;
    }
    return "sort";
  };

  return (
    <div className="inventory-ribbon">
      <div className="inventory-ribbon__col inventory-ribbon__col--1">
        Inventory Item
        <button
          className={getSortClass("item_name")}
          onClick={() => onSort("item_name")}
        ></button>
      </div>
      <div className="inventory-ribbon__col inventory-ribbon__col--2">
        Category
        <button
          className={getSortClass("category")}
          onClick={() => onSort("category")}
        ></button>
      </div>
      <div className="inventory-ribbon__col inventory-ribbon__col--3">
        Status
        <button
          className={getSortClass("status")}
          onClick={() => onSort("status")}
        ></button>
      </div>
      <div className="inventory-ribbon__col inventory-ribbon__col--4">
        Qty
        <button
          className={getSortClass("quantity")}
          onClick={() => onSort("quantity")}
        ></button>
      </div>
      <div className="inventory-ribbon__col inventory-ribbon__col--5">
        Warehouse
        <button
          className={getSortClass("warehouse_name")}
          onClick={() => onSort("warehouse_name")}
        ></button>
      </div>
      <div className="inventory-ribbon__col inventory-ribbon__col--6">
        Actions
      </div>
    </div>
  );
}

export default InventoryRibbon;
