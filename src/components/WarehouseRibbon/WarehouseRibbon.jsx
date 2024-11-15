import "./WarehouseRibbon.scss";

function WarehouseRibbon() {
  return (
    <div className="warehouse-ribbon">
      <div className="warehouse-ribbon__col warehouse-ribbon__col--1">
        Warehouse
        <button className="sort"></button>
      </div>
      <div className="warehouse-ribbon__col warehouse-ribbon__col--2">
        Address
        <button className="sort"></button>
      </div>
      <div className="warehouse-ribbon__col warehouse-ribbon__col--3">
        Contact Name
        <button className="sort"></button>
      </div>
      <div className="warehouse-ribbon__col warehouse-ribbon__col--4">
        Contact Information
        <button className="sort"></button>
      </div>
      <div className="warehouse-ribbon__col warehouse-ribbon__col--5">
        Actions
      </div>
    </div>
  );
}

export default WarehouseRibbon;
