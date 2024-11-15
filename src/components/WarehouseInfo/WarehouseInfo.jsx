import DetailsHeader from "../DetailsHeader/DetailsHeader";
import "./WarehouseInfo.scss";

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
			<DetailsHeader
				title={warehouse_name}
				pathBack="/"
				pathEdit={`/warehouses/${id}`}
			/>
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
