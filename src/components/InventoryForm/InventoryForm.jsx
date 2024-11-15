const URL = import.meta.env.VITE_API_URL;

import { useParams, Link, useNavigate } from "react-router-dom";
import "./InventoryForm.scss";
import { useEffect, useState } from "react";
import axios from "axios";

function InventoryForm() {
  //Define an isEditMode Variable to check if the id parameter is present
  const { id } = useParams();
  const isEditMode = Boolean(id);
  useEffect(() => {
    if (isEditMode) {
      axios
        //   Change endpoint from warehouses -> inventories
        .get(`${URL}/inventories/${id}`)
        .then((response) => setFormData(response.data))
        .catch((error) =>
          console.error("Error fetching inventory item data:", error)
        );
    }
  }, [isEditMode, id]);

  //to redirect user to warehouse list after submission
  const navigate = useNavigate();

  // Logic for edit from Betty ^
  // -=-=--=-=-=-==-=--=--=-==-=-=-=-==-=-=-=-=-=-=-=-==-=-=-=-=-

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

  // -=-=--=-=-=-==-=--=--=-==-MW CHANGE ==-=-=-=-=-=-=-=-==-=-=-=-=-
  // Fields for Inventory Item Details
  // Fields for Inventory Item Details
  const itemFields = [
    { label: "Item Name", name: "item_name" },
    { label: "Description", name: "description" },
    {
      label: "Category",
      name: "category",
      options: ["Electronics", "Gear", "Apparel", "Health", "Accessories"],
    },
  ];

  // Fields for Item Availability
  const availabilityFields = [
    { label: "Status", name: "status", options: ["in stock", "out of stock"] },
    { label: "Quantity", name: "quantity", type: "number" },
    // Request needs warehouse_id, hardcode to 2 for now
    // it should take warehouse_name, do i need to find the id from warehouse name?? or do i get list of warehouses, list them, but when auser selectes it, we convert it to id for the request?
    { label: "Warehouse", name: "warehouse", options: ["nj", "new york"] },
  ];

  // Form data state
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "in stock", // Default status to "in stock"
    quantity: "",
    warehouse: "",
  });

  // -=-=--=-=-=-==-=--=--=-==-MW CHANGE ==-=-=-=-=-=-=-=-==-=-=-=-=-

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
    if (!formData.item_name.trim()) {
      newErrors.item_name = "Item name is required.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (!formData.category) {
      newErrors.category = "Category is required.";
    }
    if (!formData.status) {
      newErrors.status = "Status is required.";
    }
    if (formData.status === "in stock" && !formData.quantity) {
      newErrors.quantity = "Quantity is required when in stock.";
    }
    if (!formData.warehouse) {
      newErrors.warehouse = "Warehouse is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateFields()) {
      try {
        const response = isEditMode
          ? // If edit mode, make put/edit request
            await axios.put(`${URL}/inventories/${id}`, formData)
          : // If NOT edit mode, make POST request (new item)
            await axios.post(`${URL}/inventories`, formData);
        if (response.status === 201) {
          // Clear form input
          setFormData({
            // warehouse_name: "",
            // address: "",
            // city: "",
            // country: "",
            // contact_name: "",
            // contact_position: "",
            // contact_phone: "",
            // contact_email: "",
            warehouse_id: "",
            warehouse: "",
            item_name: "",
            description: "",
            category: "",
            status: "",
            quantity: 0,
          });
          navigate("/inventories");
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
            <Link to="/inventories" className="warehouse-form__icon">
              <img
                src="/assets/icons/arrow_back-24px.svg"
                alt="arrow back icon"
                className="warehouse-form__icon"
              />
            </Link>
            <h1 className="warehouse-form__title">
              {isEditMode ? "Edit Inventory Item" : "Add New Inventory Item"}
            </h1>
          </legend>

          <hr className="warehouse-form__divider" />

          <div className="warehouse-form__sections">
            {/* Item Details inputs */}
            <section className="warehouse-form__warehouse-details">
              <h2 className="warehouse-form__section-title">Item Details</h2>
              {/* warehouseFields -> itemFields */}
              {itemFields.map((field) => (
                <div className="warehouse-form__input-field" key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="warehouse-form__input-label"
                  >
                    {field.label}
                  </label>
                  {/* Where it diverges */}
                  {/* <input
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
                    placeholder={`${field.label}`}
                  />
                  {errors[field.name] && (
                    <span className="warehouse-form__error-message">
                      <img
                        src="/assets/icons/error-24px.svg"
                        alt="error icon"
                        className="warehouse-form__error-icon"
                      />
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))} */}
                  {field.options ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className={`input-control ${
                        errors[field.name]
                          ? "warehouse-form__input-control--error"
                          : ""
                      }`}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
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
                      placeholder={field.label}
                    />
                  )}
                  {errors[field.name] && (
                    <span className="warehouse-form__error-message">
                      <img
                        src="/assets/icons/error-24px.svg"
                        alt="error icon"
                        className="warehouse-form__error-icon"
                      />
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))}
            </section>

            <hr className="warehouse-form__divider warehouse-form__divider--tablet" />

            {/* contact details inputs */}
            <section className="warehouse-form__contact-details">
              <h2 className="warehouse-form__section-title">
                Item Availability
              </h2>
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
                    placeholder={`${field.label}`}
                  />
                  {errors[field.name] && (
                    <span className="warehouse-form__error-message">
                      <img
                        src="/assets/icons/error-24px.svg"
                        alt="error icon"
                        className="warehouse-form__error-icon"
                      />
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
              {isEditMode ? "Save" : "+ Add Item"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default InventoryForm;
