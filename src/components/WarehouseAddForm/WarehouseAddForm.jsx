import "./WarehouseAddForm.scss";
import { useState } from "react";

function WarehouseAddForm() {
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

  const [formData, setFormData] = useState({
    warehouseName: "",
    streetAddress: "",
    city: "",
    country: "",
    contactName: "",
    position: "",
    phoneNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  // Handles field changes and removes error message on input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validates the form fields
  const validateFields = () => {
    const newErrors = {};
    const phoneRegex = /^\d{11}$/;
    const emailRegex = /@/;

    //mirroring the validation on the server side for phone and email
    Object.keys(formData).forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required.";
      } else if (
        field === "phoneNumber" &&
        !phoneRegex.test(formData[field].replace(/\D/g, ""))
      ) {
        newErrors[field] = "Phone number must be 11 digits.";
      } else if (field === "email" && !emailRegex.test(formData[field])) {
        newErrors[field] = "Invalid email format.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateFields()) {
      console.log("Success!");
    }
  };

  return (
    <main className="warehouse-management">
      <div className="warehouse-form">
        <form onSubmit={handleSubmit}>
          <legend className="form-header">
            <img
              src="/assets/icons/arrow_back-24px.svg"
              alt=""
              className="form-icon"
            />
            <h1 className="form-title">Add New Warehouse</h1>
          </legend>
          <hr className="form-divider" />
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
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`input-control ${
                    errors[field.name] ? "error" : ""
                  }`}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
                {errors[field.name] && (
                  <span className="error-message">{errors[field.name]}</span>
                )}
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
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`input-control ${
                    errors[field.name] ? "error" : ""
                  }`}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
                {errors[field.name] && (
                  <span className="error-message">{errors[field.name]}</span>
                )}
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
      </div>
    </main>
  );
}

export default WarehouseAddForm;
