import { MdDownload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { downloadFile } from "../actions/masters";

const handleChange = async (event, input) => {
	event.preventDefault();
	let file = event.target.files[0];
	input.onChange(file);
};

export const ReduxFormFileField = ({ input, type, label, file, meta,isViewOnly }) => {
	const dispatch = useDispatch();
	return (
		<>
			<label className="form-label">
				{file?.name ? (
					<>
						{label}: {file?.name}
						
						<MdDownload
							style={{
								height: 20,
								width: 20,
								color: "black",
								marginLeft: 5,
								cursor: "pointer",
							}}
							onClick={() => dispatch(downloadFile(file))}
						/>
					</>
				) : (
					label
				)}
			</label>
			<div>
				<input
					className="form-control"
					name={input.name}
					type={type}
					onChange={event => handleChange(event, input)}
					disabled={isViewOnly}
				/>
			</div>
		</>
	);
};
