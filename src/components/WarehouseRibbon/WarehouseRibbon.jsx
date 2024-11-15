import "./WarehouseRibbon.scss";

function WarehouseRibbon() {
  return (
    <div className="inventory-ribbon">
      <div className="inventory-ribbon__col inventory-ribbon__col--1">
        Warehouse
        <button className="sort"></button>
      </div>
      <div className="inventory-ribbon__col inventory-ribbon__col--2">
        Address
        <button className="sort"></button>
      </div>
      <div className="inventory-ribbon__col inventory-ribbon__col--3">
        Contact Name
        <button className="sort"></button>
      </div>
      <div className="inventory-ribbon__col inventory-ribbon__col--4">
        Contact Information
        <button className="sort"></button>
      </div>
      <div className="inventory-ribbon__col inventory-ribbon__col--5">
        Actions
        <button className="sort"></button>
      </div>
    </div>
  );
}

export default WarehouseRibbon;
