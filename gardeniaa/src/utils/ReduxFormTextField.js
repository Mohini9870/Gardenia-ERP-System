export const ReduxFormTextField = ({
	input,
	label,
	type = "text",
	placeholder,
	meta: { touched, error, warning },
	...inputProps
}) => {
	return (
		<div>
			{label && <label className="form-label">{label}</label>}
			<div className="d-flex flex-column">
				<input
					{...input}
					className="form-control"
					placeholder={placeholder}
					type={type}
					{...inputProps}
				/>
				{touched &&
					((error && (
						<span style={{ color: "red", marginLeft: "4px" }}>{error}</span>
					)) ||
						(warning && <span>{warning}</span>))}
			</div>
		</div>
	);
};
