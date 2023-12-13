import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Field, getFormMeta, getFormSyncErrors, reduxForm } from "redux-form";
import { getIsImportingMaster } from "../../reducers/master";
import { ReduxFormFileField } from "../../utils/ReduxFormFileField";

const formName = "import";
const ImportForm = ({ title, onCancel, handleSubmit }) => {
	const isImportingMaster = useSelector(getIsImportingMaster);
	const meta = useSelector(getFormMeta(formName));
	const errors = useSelector(getFormSyncErrors(formName));

	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row className="mb-3">
					<Col>
						<label className="form-label">Import File</label>
						<Field name="file" type="file" component={ReduxFormFileField} />
						{meta?.file?.touched && errors?.file && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.file}
							</span>
						)}
					</Col>
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onCancel}>
					Close
				</Button>
				<Button
					className="ms-2"
					disabled={isImportingMaster}
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
	form: formName,
	validate: values => {
		const errors = {};
		if (!values?.file || values?.file?.length === 0) {
			errors.file = "Required";
		}
		return errors;
	},
})(ImportForm);
