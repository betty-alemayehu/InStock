import "./WarehouseInfo.scss";
import arrowBack from "/assets/icons/arrow_back-24px.svg";
import editIcon from "/assets/icons/edit-white-24px.svg";
import { Link } from "react-router-dom";

export default function WarehouseInfo() {
	const data = {
		id: 2,
		warehouse_name: "Washington",
		address: "33 Pearl Street SW",
		city: "Washington",
		country: "USA",
		contact_name: "Greame Lyon",
		contact_position: "Warehouse Manager",
		contact_phone: "+1 (646) 123-1234",
		contact_email: "glyon@instock.com",
	};

	return (
		<div className="warehouse">
			<section className="warehouse__title-card">
				<div className="warehouse__title-wrapper">
					<Link to={`warehouses`} className="warehouse__link">
						<img
							src={arrowBack}
							alt="Back Arrow Icon"
							className="warehouse__icon--back"
						/>
					</Link>
					<h1 className="warehouse__title">{data.warehouse_name}</h1>
				</div>
				<Link to={`warehouses/${data.id}/edit`} className="warehouse__link">
					<div className="warehouse__icon-wrapper">
						<img
							src={editIcon}
							alt="Edit Icon"
							className="warehouse__icon--edit-white"
						/>
						<span className="warehouse__icon-name">Edit</span>
					</div>
				</Link>
			</section>
			<section className="warehouse-card">
				<div className="warehouse-card__addressInfo">
					<h2 className="warehouse-card__title">warehouse address:</h2>
					<p className="warehouse-card__info warehouse-card__info--address">
						<span>{`${data.address}, `}</span>
						<span>{`${data.city}, ${data.country}`}</span>
					</p>
				</div>
				<div className="warehouse-card__contactInfo">
					<div className="warehouse-card__contact">
						<h2 className="warehouse-card__title">contact name:</h2>
						<span className="warehouse-card__info">{data.contact_name}</span>
						<span className="warehouse-card__info">
							{data.contact_position}
						</span>
					</div>
					<div className="warehouse-card__contact">
						<h2 className="warehouse-card__title">contact information:</h2>
						<span className="warehouse-card__info">{data.contact_phone}</span>
						<span className="warehouse-card__info">{data.contact_email}</span>
					</div>
				</div>
			</section>
		</div>
	);
}
