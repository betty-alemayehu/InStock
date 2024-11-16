import "./LabelContent.scss";
import chevronRight from "/assets/icons/chevron_right-24px.svg";

export default function LabelContent({
	label,
	content,
	className,
	clickable,
	path,
}) {
	const newClassName = className
		? `inventory-info ${className}`
		: "inventory-info";

	let contentClassName = `inventory-info__description`;
	if (label.includes("status")) {
		if (content.toLowerCase() === "in stock") {
			contentClassName += " inventory-info__description--success";
		} else {
			contentClassName += " inventory-info__description--failed";
		}
	}

	let titleClass = path
		? "inventory-info__title inventory-info__title--disappear"
		: "inventory-info__title";

	return (
		<div className={newClassName}>
			<h2 className={titleClass}>{label}</h2>

			<div className="inventory-info__container">
				<span className={contentClassName}>{content}</span>
				{clickable && (
					<img
						src={chevronRight}
						alt="Right Chevron"
						className="inventory-info__icon"
					/>
				)}
			</div>
		</div>
	);
}
