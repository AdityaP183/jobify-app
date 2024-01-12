import React from "react";

export default function FormRowSelect({
	name,
	labelTest,
	list,
	defaultValue = "",
	onChange
}) {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelTest || name}
			</label>
			<select
				name={name}
				id={name}
				className="form-select"
				defaultValue={defaultValue}
				onChange={onChange}
			>
				{list.map((item) => {
					return (
						<option key={item} value={item}>
							{item}
						</option>
					);
				})}
			</select>
		</div>
	);
}
