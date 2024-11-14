import { Link } from "react-router-dom";
import "./WarehouseAddForm.scss";
import { useState } from "react";

function WarehouseAddForm() {
  const warehouseFields = [
    { label: "Warehouse Name", name: "warehouse_name" },
    { label: "Street Address", name: "address" },
    { label: "City", name: "city" },
    { label: "Country", name: "country" },
  ];

  const contactFields = [
    { label: "Contact Name", name: "contact_name" },
    { label: "Position", name: "contact_position" },
    { label: "Phone Number", name: "contact_phone" },
    { label: "Email", name: "contact_email" },
  ];

  const [formData, setFormData] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

  const [errors, setErrors] = useState({});

  // Handles field changes and removes error message on input
  const handleChange = (event) => {
    const { name, value } = event.target;
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
        //notes this field name must match the actual keys in formData
        field === "contact_phone" &&
        !phoneRegex.test(formData[field].replace(/\D/g, ""))
      ) {
        newErrors[field] =
          "Phone number must include country and area code, e.g. +1 (123) 555-6789";
      } else if (
        //notes this field name must match the actual keys in formData
        field === "contact_email" &&
        !emailRegex.test(formData[field])
      ) {
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
      try {
        const response = await fetch("http://localhost:5050/warehouses/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Warehouse added successfully!");
          setFormData({
            warehouse_name: "",
            address: "",
            city: "",
            country: "",
            contact_name: "",
            contact_position: "",
            contact_phone: "",
            contact_email: "",
          });
        } else {
          console.log("Failed to add warehouse. Please try again.");
        }
      } catch (error) {
        console.error(
          "Error connecting to the server. Please try again later."
        );
      }
    }
  };

  return (
    <main className="warehouse-management">
      <div className="warehouse-form">
        <form onSubmit={handleSubmit}>
          <legend className="form-header">
            <Link to="/warehouses" className="form-icon">
              <img
                src="/assets/icons/arrow_back-24px.svg"
                alt="arrow back icon"
                className="form-icon"
              />
            </Link>
            <h1 className="form-title">Add New Warehouse</h1>
          </legend>
          <hr className="form-divider" />
          <div className="form-sections">
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

            <hr className="form-divider form-divider--tablet" />

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
          </div>
          <div className="form-actions">
            <Link to="/warehouses" className="button button--secondary">
              Cancel
            </Link>

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
