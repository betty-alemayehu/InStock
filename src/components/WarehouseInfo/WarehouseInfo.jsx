import "./WarehouseInfo.scss";
import arrowBack from "/assets/icons/arrow_back-24px.svg";
import editIcon from "/assets/icons/edit-white-24px.svg";
import { Link } from "react-router-dom";

export default function WarehouseInfo({ currentWarehouse }) {
	const {
		address,
		city,
		contact_email,
		contact_name,
		contact_phone,
		contact_position,
		country,
		warehouse_name,
		id,
	} = currentWarehouse;

	return (
		<div className="warehouse">
			<section className="warehouse__title-card">
				<div className="warehouse__title-wrapper">
					<Link to="/" className="warehouse__link">
						<img
							src={arrowBack}
							alt="Back Arrow Icon"
							className="warehouse__icon--back"
						/>
					</Link>
					<h1 className="warehouse__title">{warehouse_name}</h1>
				</div>
				<Link to={`/warehouses/${id}/edit`} className="warehouse__link">
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
						<span>{`${address}, `}</span>
						<span>{`${city}, ${country}`}</span>
					</p>
				</div>
				<div className="warehouse-card__contactInfo">
					<div className="warehouse-card__contact">
						<h2 className="warehouse-card__title">contact name:</h2>
						<span className="warehouse-card__info">{contact_name}</span>
						<span className="warehouse-card__info">{contact_position}</span>
					</div>
					<div className="warehouse-card__contact">
						<h2 className="warehouse-card__title">contact information:</h2>
						<span className="warehouse-card__info">{contact_phone}</span>
						<span className="warehouse-card__info">{contact_email}</span>
					</div>
				</div>
			</section>
		</div>
	);
}
