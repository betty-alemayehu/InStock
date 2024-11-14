import { Link, useNavigate } from "react-router-dom";
import "./WarehouseAddForm.scss";
import { useState } from "react";

function WarehouseAddForm() {
  //to redirect user to warehouse list after submission
  const navigate = useNavigate();

  // Field configurations for warehouse and contact information sections
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

  // Form data and error state management
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

    // Validates required fields and checks formats for phone and email fields
    Object.keys(formData).forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required.";
      } else if (
        field === "contact_phone" &&
        !phoneRegex.test(formData[field].replace(/\D/g, ""))
      ) {
        newErrors[field] =
          "Phone number must include country and area code, e.g. +1 (123) 555-6789";
      } else if (
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
          //uncomment below for testing
          // console.log("Warehouse added successfully!");
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

          navigate("/warehouses"); // Redirect to /warehouses page
        } else {
          //uncomment below for testing
          // console.log("Failed to add warehouse. Please try again.");
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
        {/* form header */}
        <form onSubmit={handleSubmit}>
          <legend className="warehouse-form__header">
            <Link to="/warehouses" className="warehouse-form__icon">
              <img
                src="/assets/icons/arrow_back-24px.svg"
                alt="arrow back icon"
                className="warehouse-form__icon"
              />
            </Link>
            <h1 className="warehouse-form__title">Add New Warehouse</h1>
          </legend>
          <hr className="warehouse-form__divider" />
          <div className="warehouse-form__sections">
            {/* warehouse details inputs */}
            <section className="warehouse-form__warehouse-details">
              <h2 className="warehouse-form__section-title">
                Warehouse Details
              </h2>
              {warehouseFields.map((field) => (
                <div className="warehouse-form__input-field" key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="warehouse-form__input-label"
                  >
                    {field.label}
                  </label>
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={`input-control ${
                      errors[field.name]
                        ? "warehouse-form__input-control--error"
                        : ""
                    }`}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                  {errors[field.name] && (
                    <span className="warehouse-form__error-message">
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))}
            </section>

            <hr className="warehouse-form__divider warehouse-form__divider--tablet" />

            {/* contact details inputs */}
            <section className="warehouse-form__contact-details">
              <h2 className="warehouse-form__section-title">Contact Details</h2>
              {contactFields.map((field) => (
                <div className="warehouse-form__input-field" key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="warehouse-form__input-label"
                  >
                    {field.label}
                  </label>
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={`input-control ${
                      errors[field.name]
                        ? "warehouse-form__input-control--error"
                        : ""
                    }`}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                  {errors[field.name] && (
                    <span className="warehouse-form__error-message">
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))}
            </section>
          </div>
          {/* form actions/buttons */}
          <div className="warehouse-form__actions">
            <Link
              to="/warehouses"
              className="button button--secondary warehouse-form__button--link"
            >
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
