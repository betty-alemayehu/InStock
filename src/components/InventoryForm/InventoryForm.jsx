const URL = import.meta.env.VITE_API_URL;
import { useParams, Link, useNavigate } from "react-router-dom";
import "./InventoryForm.scss";
import { useEffect, useState } from "react";
import axios from "axios";

function InventoryForm() {
  //Define an isEditMode Variable to check if the id parameter is present
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [warehouses, setWarehouses] = useState([]); // State to store warehouses list

  //to redirect user to inventory list after submission
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "In Stock", // Default status to "in stock"
    quantity: "",
    warehouse: "",
    warehouse_id: "", // Add warehouse_id here to store the ID from the name
  });

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
    { label: "Status", name: "status", options: ["In Stock", "Out of Stock"] },
    { label: "Quantity", name: "quantity", type: "number" },
    // Placeholder
    { label: "Warehouse", name: "warehouse", options: ["nj", "new york"] },
  ];

  useEffect(() => {
    if (isEditMode) {
      axios
        .get(`${URL}/inventories/${id}`)
        .then((response) => {
          const inventoryItem = response.data;

          // If warehouse_id is missing, try to find it using warehouse_name
          let warehouse_id = inventoryItem.warehouse_id;

          if (!warehouse_id && inventoryItem.warehouse_name) {
            // Find the warehouse_id by warehouse_name
            const selectedWarehouse = warehouses.find(
              (warehouse) =>
                warehouse.warehouse_name === inventoryItem.warehouse_name
            );
            warehouse_id = selectedWarehouse ? selectedWarehouse.id : "";
          }

          // Prepopulate the form data with the existing item details
          setFormData({
            item_name: inventoryItem.item_name,
            description: inventoryItem.description,
            category: inventoryItem.category,
            status: inventoryItem.status,
            quantity: inventoryItem.quantity, // Ensure quantity is a number from the API
            warehouse: inventoryItem.warehouse_name, // Prepopulate warehouse_name
            warehouse_id: warehouse_id, // Set warehouse_id from either response or lookup
          });

          console.log("inventoryItem.warehouse_id: ", warehouse_id);
        })
        .catch((error) =>
          console.error("Error fetching inventory item data:", error)
        );
    }
  }, [isEditMode, id, warehouses]); // Depend on `warehouses` in case they are updated.

  useEffect(() => {
    fetchWarehouses();
  }, []);
  const fetchWarehouses = async () => {
    try {
      const { data } = await axios.get(`${URL}/warehouses`);
      setWarehouses(data); // sets the inventory list as all inventory items
      // check warehouses are fetched in FE console
      console.log(data);
    } catch (error) {
      console.error("Error fetching warehouses data:", error);
    }
  };

  const [errors, setErrors] = useState({});

  // Handles field changes and removes error message on input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // If the 'warehouse' field changes, find the warehouse_id by warehouse name
    if (name === "warehouse") {
      const selectedWarehouse = warehouses.find(
        (warehouse) => warehouse.warehouse_name === value
      );

      // Ensure warehouse_id is set correctly
      setFormData((prev) => ({
        ...prev,
        warehouse_id: selectedWarehouse ? selectedWarehouse.id : "", // this should be a number
      }));
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
    if (formData.status === "In Stock" && !formData.quantity) {
      newErrors.quantity = "Quantity is required when In Stock.";
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

    // Continue with form submission if warehouse_id is already set
    if (validateFields()) {
      try {
        // Now create the requestData with updated formData
        const requestData = {
          ...formData,
          warehouse_id: formData.warehouse_id, // Ensure warehouse_id is set correctly
          quantity:
            formData.status === "Out of Stock" ? 0 : Number(formData.quantity),
        };

        // Log the requestData before sending to ensure it's correct
        console.log("Request Data being sent:", requestData);

        delete requestData.warehouse; // Remove warehouse name from request data

        const response = isEditMode
          ? await axios.put(`${URL}/inventories/${id}`, requestData)
          : await axios.post(`${URL}/inventories`, requestData);

        if (response.status === 201 || response.status === 200) {
          setFormData({
            item_name: "",
            description: "",
            category: "",
            status: "In Stock",
            quantity: "",
            warehouse: "",
            warehouse_id: "",
          });

          // Redirect to the item details page after saving the item in edit mode
          if (isEditMode) {
            navigate(`/inventory/${id}`); // Navigate to the details page of the edited item
          } else {
            navigate("/inventory"); // Navigate to inventory list if it's a new item
          }
        }
      } catch (error) {
        console.error(
          "Error connecting to the server. Please try again later."
        );
      }
    }
  };

  return (
    <main className="inventory-management">
      <div className="inventory-form">
        {/* form header */}
        <form onSubmit={handleSubmit}>
          <legend className="inventory-form__header">
            <Link
              to={isEditMode ? `/inventory/${id}` : "/inventory"} // Conditionally navigate based on edit mode
              className="inventory-form__icon"
            >
              <img
                src="/assets/icons/arrow_back-24px.svg"
                alt="arrow back icon"
                className="inventory-form__icon"
              />
            </Link>
            <h1 className="inventory-form__title">
              {isEditMode ? "Edit Inventory Item" : "Add New Inventory Item"}
            </h1>
          </legend>

          <hr className="inventory-form__divider" />

          <div className="inventory-form__sections">
            {/* Item Details inputs */}
            <section className="inventory-form__inventory-details">
              <h2 className="inventory-form__section-title">Item Details</h2>
              {/* itemFields */}
              {itemFields.map((field) => {
                let inputElement = null;

                // If field has options (dropdown for category selection)
                if (field.options) {
                  inputElement = (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className={`input-control ${
                        errors[field.name]
                          ? "inventory-form__input-control--error"
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
                  );
                }
                // If the field is for description, render a textarea
                else if (field.name === "description") {
                  inputElement = (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className={`input-control ${
                        errors[field.name]
                          ? "inventory-form__input-control--error"
                          : ""
                      }`}
                      placeholder={field.label}
                    />
                  );
                }
                // For other fields, render a normal text input
                else {
                  inputElement = (
                    <input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className={`input-control ${
                        errors[field.name]
                          ? "inventory-form__input-control--error"
                          : ""
                      }`}
                      placeholder={field.label}
                    />
                  );
                }

                return (
                  <div className="inventory-form__input-field" key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="inventory-form__input-label"
                    >
                      {field.label}
                    </label>
                    {inputElement}{" "}
                    {/* Render the corresponding input element based on conditions */}
                    {errors[field.name] && (
                      <span className="inventory-form__error-message">
                        <img
                          src="/assets/icons/error-24px.svg"
                          alt="error icon"
                          className="inventory-form__error-icon"
                        />
                        {errors[field.name]}
                      </span>
                    )}
                  </div>
                );
              })}
            </section>

            <hr className="inventory-form__divider inventory-form__divider--tablet" />

            {/* Item Availability Section */}
            <section className="inventory-form__contact-details">
              <h2 className="inventory-form__section-title">
                Item Availability
              </h2>

              {/* Status Field: Radio buttons for 'In Stock' and 'Out of Stock' */}
              <div className="inventory-form__input-field">
                <label className="inventory-form__input-label" htmlFor="status">
                  Status
                </label>
                <div className="inventory-form__radio-group">
                  {availabilityFields[0].options.map((statusOption) => (
                    <label
                      key={statusOption}
                      className={`inventory-form__radio-label ${
                        formData.status === statusOption
                          ? "inventory-form__radio-label--selected"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value={statusOption}
                        checked={formData.status === statusOption}
                        onChange={handleChange}
                        className="inventory-form__radio-input"
                      />
                      {statusOption}
                    </label>
                  ))}
                </div>
                {errors.status && (
                  <span className="inventory-form__error-message">
                    <img
                      src="/assets/icons/error-24px.svg"
                      alt="error icon"
                      className="inventory-form__error-icon"
                    />
                    {errors.status}
                  </span>
                )}
              </div>

              {/* Quantity Field: Only visible if 'In Stock' is selected */}
              {formData.status === "In Stock" && (
                <div className="inventory-form__input-field">
                  <label
                    htmlFor="quantity"
                    className="inventory-form__input-label"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className={`input-control ${
                      errors.quantity
                        ? "inventory-form__input-control--error"
                        : ""
                    }`}
                    placeholder="Enter quantity"
                  />
                  {errors.quantity && (
                    <span className="inventory-form__error-message">
                      <img
                        src="/assets/icons/error-24px.svg"
                        alt="error icon"
                        className="inventory-form__error-icon"
                      />
                      {errors.quantity}
                    </span>
                  )}
                </div>
              )}

              {/* Warehouse Dropdown */}
              <div className="inventory-form__input-field">
                <label
                  htmlFor="warehouse"
                  className="inventory-form__input-label"
                >
                  Warehouse
                </label>
                <select
                  id="warehouse"
                  name="warehouse"
                  value={formData.warehouse}
                  onChange={handleChange}
                  className={`input-control ${
                    errors.warehouse
                      ? "inventory-form__input-control--error"
                      : ""
                  }`}
                >
                  <option value="">Select Warehouse</option>
                  {warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.warehouse_name}>
                      {warehouse.warehouse_name}
                    </option>
                  ))}
                </select>
                {errors.warehouse && (
                  <span className="inventory-form__error-message">
                    <img
                      src="/assets/icons/error-24px.svg"
                      alt="error icon"
                      className="inventory-form__error-icon"
                    />
                    {errors.warehouse}
                  </span>
                )}
              </div>
            </section>
          </div>

          {/* Inventory form actions/buttons */}
          <div className="inventory-form__actions">
            <Link
              to={isEditMode ? `/inventory/${id}` : "/inventory"} // Conditionally navigate
              className="button button--secondary inventory-form__button--link"
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
