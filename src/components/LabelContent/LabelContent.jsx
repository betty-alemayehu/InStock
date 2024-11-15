import "./LabelContent.scss";

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
	if (clickable) {
		contentClassName += " inventory-info__description--clickable";
	}

	let titleClass = path
		? "inventory-info__title inventory-info__title--disappear"
		: "inventory-info__title";

	return (
		<div className={newClassName}>
			<h2 className={titleClass}>{label}</h2>
			<span className={contentClassName}>{content}</span>
		</div>
	);
}
