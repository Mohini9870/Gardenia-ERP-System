import { Button, Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Field, getFormMeta, getFormSyncErrors, reduxForm } from "redux-form";
import { getIsUpdatingMasterList } from "../../reducers/master";

const formName = "reject";
const RejectForm = ({ onCancel, handleSubmit }) => {
	const isUpdatingMaster = useSelector(getIsUpdatingMasterList);
	const errors = useSelector(getFormSyncErrors(formName));
	const meta = useSelector(getFormMeta(formName));

	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>
					<span style={{ textTransform: "capitalize" }}>Reject Reason</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row className="mb-3">
					<Col>
						<Field
							component="textarea"
							maxLength={250}
							className="form-control"
							rows="4"
							label="Reject Reason"
							name="rejectReason"
							placeholder="Enter Reject Reason"
						/>
						{meta?.rejectReason?.touched && errors?.rejectReason && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.rejectReason}
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
					disabled={isUpdatingMaster}
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
		if (!values?.rejectReason || values?.rejectReason?.length === 0) {
			errors.rejectReason = "Required";
		}
		return errors;
	},
})(RejectForm);
