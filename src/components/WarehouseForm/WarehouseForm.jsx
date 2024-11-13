import "./WarehouseForm.scss";

function WarehouseForm() {
  //todo add logic for rending title at top for edits vs add or consider routing to different pages for different server requests

  const warehouseFields = [
    { label: "Warehouse Name", name: "warehouseName" },
    { label: "Street Address", name: "streetAddress" },
    { label: "City", name: "city" },
    { label: "Country", name: "country" },
  ];

  const contactFields = [
    { label: "Contact Name", name: "contactName" },
    { label: "Position", name: "position" },
    { label: "Phone Number", name: "phoneNumber" },
    { label: "Email", name: "email" },
  ];

  return (
    <>
      <div className="warehouse-management">
        <main className="warehouse-form">
          <section className="form-header">
            <img
              src="../../public/assets/icons/arrow_back-24px.svg"
              alt=""
              className="form-icon"
            />
            <h1 className="form-title">Add New Warehouse</h1>
          </section>
          <hr className="form-divider" />

          <form>
            <section className="warehouse-details">
              <h2 className="section-title">Warehouse Details</h2>
              {warehouseFields.map((field) => (
                <div className="input-field" key={field.name}>
                  <label htmlFor={field.name} className="input-label">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    className="input-control"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </section>
            <hr className="form-divider" />
            <section className="contact-details">
              <h2 className="section-title">Contact Details</h2>
              {contactFields.map((field) => (
                <div className="input-field" key={field.name}>
                  <label htmlFor={field.name} className="input-label">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    className="input-control"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </section>
            <div className="form-actions">
              <button type="button" className="button button--secondary">
                Cancel
              </button>
              <button type="submit" className="button button--primary">
                + Add Warehouse
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default WarehouseForm;
