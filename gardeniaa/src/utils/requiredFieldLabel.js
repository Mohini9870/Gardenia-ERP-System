export const requiredFieldLabel = label => {
	return (
		<p style={{ margin: 0 }}>
			{label} <span style={{ color: "red" }}>*</span>
		</p>
	);
};
