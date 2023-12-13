import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getIsUpdatingMasterList } from "../../reducers/master";
import { ReduxFormTextField } from "../../utils/ReduxFormTextField";

const CountryForm = ({ title, onCancel, handleSubmit, isViewOnly }) => {
	const isUpdatingMaster = useSelector(getIsUpdatingMasterList);

	// const [isSubmitting, setIsSubmitting] = useState(false);


	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Country Code"
							name="countryCode"
							placeholder="Enter Country Code"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Country Name"
							name="countryName"
							placeholder="Enter Country Name"
							disabled={isViewOnly}
						/>
					</Col>
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onCancel}>
					Close
				</Button>
				<Button
					className="ms-2"
					disabled={isUpdatingMaster || isViewOnly}
					type="submit"
					variant="success"
				>
					Submit
				</Button>


			</Modal.Footer>
		</form>
	);
};

export default reduxForm({
	form: "country",
	validate: values => {
		const errors = {};
		if (!values?.countryName || values?.countryName?.length === 0) {
			errors.countryName = "Required";
		}
		if (!values?.countryCode || values?.countryCode?.length === 0) {
			errors.countryCode = "Required";
		}
		return errors;
	},
})(CountryForm);
