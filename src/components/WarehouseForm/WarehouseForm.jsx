import { useParams, Link, useNavigate } from "react-router-dom";
import "./WarehouseForm.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

function WarehouseForm() {
	//to redirect user to warehouse list after submission
	const navigate = useNavigate();

	//Define an isEditMode Variable to check if the id parameter is present
	const { id } = useParams();
	const isEditMode = Boolean(id);
	useEffect(() => {
		if (isEditMode) {
			axios
				.get(`${URL}/warehouses/${id}`)
				.then((response) => setFormData(response.data))
				.catch((error) => {
					if (error.response?.status === 404) {
						navigate("/");
					} else {
						console.error("Error fetching warehouse data:", error);
					}
				});
		}
	}, [isEditMode, id]);

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
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Checks for a valid email with "@" and "."

		// Validates required fields and checks formats for phone and email fields
		Object.keys(formData).forEach((field) => {
			const fieldValue = formData[field]
				? formData[field].toString().trim()
				: ""; // Safely convert to string and trim
			if (!fieldValue) {
				newErrors[field] = "This field is required.";
			} else if (
				field === "contact_phone" &&
				!phoneRegex.test(fieldValue.replace(/\D/g, ""))
			) {
				newErrors[field] =
					"Phone number must include country and area code, e.g. +1 (123) 555-6789";
			} else if (field === "contact_email" && !emailRegex.test(fieldValue)) {
				newErrors[field] = "Invalid email format.";
			}
		});

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (validateFields()) {
			try {
				const response = isEditMode
					? await axios.put(`${URL}/warehouses/${id}`, formData)
					: await axios.post(`${URL}/warehouses`, formData);
				if (response.status === 201 || response.status === 200) {
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

					navigate(`/warehouses/${id}`);
				}
			} catch (error) {
				console.error(
					"Error connecting to the server. Please try again later.",
					error
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
						<Link to={`/warehouses/${id}`} className="warehouse-form__icon">
							<img
								src="/assets/icons/arrow_back-24px.svg"
								alt="arrow back icon"
								className="warehouse-form__icon"
							/>
						</Link>
						<h1 className="warehouse-form__title">
							{isEditMode ? "Edit Warehouse" : "Add New Warehouse"}
						</h1>
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
							to={`/warehouses/${id}`}
							className="button button--secondary warehouse-form__button--link"
						>
							Cancel
						</Link>

						<button type="submit" className="button button--primary">
							{isEditMode ? "Save" : "+ Add Warehouse"}
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}

export default WarehouseForm;
