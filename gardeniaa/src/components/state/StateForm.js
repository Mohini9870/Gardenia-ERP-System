import React, { useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Field, getFormMeta, getFormSyncErrors, reduxForm } from "redux-form";
import { getDropdownList } from "../../actions/masters";
import {
	getCountryDropdownList,
	getIsFetchingDropdownList,
	getIsUpdatingMasterList,
} from "../../reducers/master";
import { ReduxFormSelectField } from "../../utils/ReduxFormSelectField";
import { ReduxFormTextField } from "../../utils/ReduxFormTextField";

const StateForm = ({ title, onCancel, handleSubmit, isViewOnly }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDropdownList("country"));
	}, [dispatch]);

	const isUpdatingMaster = useSelector(getIsUpdatingMasterList);
	const isFetchingDropdown = useSelector(getIsFetchingDropdownList);
	const countryOptions = useSelector(getCountryDropdownList);
	const meta = useSelector(getFormMeta("state"));
	const errors = useSelector(getFormSyncErrors("state"));

	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<Col className="mb-3">
						<label className="form-label">Country</label>
						<Field
							className="form-select"
							component={ReduxFormSelectField}
							name="countryId"
							options={countryOptions}
							disabled={isFetchingDropdown || isViewOnly}
							placeholder="Select Country"
						/>
						{meta?.countryId?.touched && errors?.countryId && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.countryId}
							</span>
						)}
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="State Code"
							name="stateCode"
							placeholder="Enter State Code"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="State Name"
							name="stateName"
							placeholder="Enter State Name"
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
	form: "state",
	fields: ["stateName", "stateCode", "countryId"],
	validate: values => {
		const errors = {};
		if (!values?.stateName || values?.stateName?.length === 0) {
			errors.stateName = "Required";
		}
		if (!values?.stateCode || values?.stateCode?.length === 0) {
			errors.stateCode = "Required";
		}
		if (values?.countryId?.length === 0) {
			errors.countryId = "Required";
		}
		return errors;
	},
})(StateForm);
