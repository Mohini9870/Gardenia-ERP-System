import Select from "react-select";

export const ReduxFormSelectField = props => {
	const { input, options, isMulti = false, placeholder, disabled } = props;

	return (
		<Select
			{...input}
			onChange={val =>
				isMulti
					? input?.onChange(val.map(c => c.value))
					: input?.onChange(val.value)
			}
			value={
				isMulti
					? options?.filter(c => input?.value?.includes(c?.value))
					: options?.find(c => c?.value === input?.value)
			}
			isDisabled={disabled}
			onBlur={() => input.onBlur(input.value)}
			options={options}
			isMulti={isMulti}
			placeholder={placeholder}
		/>
	);
};
