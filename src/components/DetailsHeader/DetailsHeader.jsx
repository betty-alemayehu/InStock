import "./DetailsHeader.scss";
import arrowBack from "/assets/icons/arrow_back-24px.svg";
import editIcon from "/assets/icons/edit-white-24px.svg";
import { Link } from "react-router-dom";

export default function DetailsHeader({ title, pathBack, pathEdit }) {
	return (
		<section className="details__title-card">
			<div className="details__title-wrapper">
				<Link to={pathBack} className="details__link">
					<img
						src={arrowBack}
						alt="Back Arrow Icon"
						className="details__icon--back"
					/>
				</Link>
				<h1 className="details__title">{title}</h1>
			</div>
			<Link to={`${pathEdit}/edit`} className="details__link">
				<div className="details__icon-wrapper">
					<img
						src={editIcon}
						alt="Edit Icon"
						className="details__icon--edit-white"
					/>
					<span className="details__icon-name">Edit</span>
				</div>
			</Link>
		</section>
	);
}
