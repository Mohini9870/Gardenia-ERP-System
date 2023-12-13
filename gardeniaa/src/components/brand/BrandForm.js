import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getIsUpdatingMasterList } from "../../reducers/master";
import { ReduxFormTextField } from "../../utils/ReduxFormTextField";

const BrandForm = ({ title, onCancel, handleSubmit, isViewOnly }) => {
	const isUpdatingMaster = useSelector(getIsUpdatingMasterList);

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
							label="Brand Name"
							name="brandName"
							placeholder="Enter Brand Name"
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
	form: "brand",
	validate: values => {
		const errors = {};
		if (!values?.brandName || values?.brandName?.length === 0) {
			errors.brandName = "Required";
		}
		return errors;
	},
})(BrandForm);
