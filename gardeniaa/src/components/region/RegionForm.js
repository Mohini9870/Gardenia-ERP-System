import React, { useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Field, getFormMeta, getFormSyncErrors, reduxForm } from "redux-form";
import { getDropdownList } from "../../actions/masters";
import {
	getIsFetchingDropdownList,
	getIsUpdatingMasterList,
	getStateDropdownList,
} from "../../reducers/master";
import { ReduxFormSelectField } from "../../utils/ReduxFormSelectField";
import { ReduxFormTextField } from "../../utils/ReduxFormTextField";

const RegionForm = ({ title, onCancel, handleSubmit, isViewOnly }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDropdownList("state"));
	}, [dispatch]);

	const isUpdatingMaster = useSelector(getIsUpdatingMasterList);
	const isFetchingDropdown = useSelector(getIsFetchingDropdownList);
	const stateOptions = useSelector(getStateDropdownList);
	const meta = useSelector(getFormMeta("region"));
	const errors = useSelector(getFormSyncErrors("region"));

	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<Col className="mb-3">
						<label className="form-label">State List</label>
						<Field
							component={ReduxFormSelectField}
							name="stateList"
							disabled={isFetchingDropdown || isViewOnly}
							options={stateOptions}
							isMulti
						/>
						{meta?.stateList?.touched && errors?.stateList && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.stateList}
							</span>
						)}
					</Col>
					<Col xs lg="3" className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Region Code"
							name="regionCode"
							placeholder="Enter Region Code"
							disabled={isViewOnly}
						/>
					</Col>
					<Col xs lg="3" className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Region Name"
							name="regionName"
							placeholder="Enter Region Name"
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
	form: "region",
	fields: ["regionName", "regionCode", "stateList"],
	validate: values => {
		const errors = {};
		if (!values?.regionName || values?.regionName?.length === 0) {
			errors.regionName = "Required";
		}
		if (!values?.regionCode || values?.regionCode?.length === 0) {
			errors.regionCode = "Required";
		}
		if (values?.stateList?.length === 0) {
			errors.stateList = "Required";
		}
		return errors;
	},
})(RegionForm);
