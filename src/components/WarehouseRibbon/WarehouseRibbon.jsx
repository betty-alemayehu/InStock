import "./WarehouseRibbon.scss";

function WarehouseRibbon({ onSort, sortBy, orderBy }) {
  // Utility function to determine the appropriate sort class
  const getSortClass = (column) => {
    if (sortBy === column) {
      return `sort ${orderBy === "asc" ? "sort--asc" : "sort--desc"}`;
    }
    return "sort";
  };

  return (
    <div className="warehouse-ribbon">
      <div className="warehouse-ribbon__col warehouse-ribbon__col--1">
        Warehouse
        <button
          className={getSortClass("warehouse_name")}
          onClick={() => onSort("warehouse_name")}
        ></button>
      </div>
      <div className="warehouse-ribbon__col warehouse-ribbon__col--2">
        Address
        <button
          className={getSortClass("address")}
          onClick={() => onSort("address")}
        ></button>
      </div>
      <div className="warehouse-ribbon__col warehouse-ribbon__col--3">
        Contact Name
        <button
          className={getSortClass("contact_name")}
          onClick={() => onSort("contact_name")}
        ></button>
      </div>
      <div className="warehouse-ribbon__col warehouse-ribbon__col--4">
        Contact Information
        <button
          className={getSortClass("contact_information")}
          onClick={() => onSort("contact_information")}
        ></button>
      </div>
      <div className="warehouse-ribbon__col warehouse-ribbon__col--5">
        Actions
      </div>
    </div>
  );
}

export default WarehouseRibbon;
