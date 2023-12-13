import React, { useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Field, getFormMeta, getFormSyncErrors, reduxForm } from "redux-form";
import { getDropdownList } from "../../actions/masters";
import {
	getIsFetchingDropdownList,
	getIsUpdatingMasterList,
	getRegionDropdownList,
} from "../../reducers/master";
import { ReduxFormSelectField } from "../../utils/ReduxFormSelectField";
import { ReduxFormTextField } from "../../utils/ReduxFormTextField";

const DistrictForm = ({ title, onCancel, handleSubmit, isViewOnly }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDropdownList("region"));
	}, [dispatch]);

	const isUpdatingMaster = useSelector(getIsUpdatingMasterList);
	const isFetchingDropdown = useSelector(getIsFetchingDropdownList);
	const regionOptions = useSelector(getRegionDropdownList);
	const meta = useSelector(getFormMeta("district"));
	const errors = useSelector(getFormSyncErrors("district"));

	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<Col className="mb-3">
						<label className="form-label">Region</label>
						<Field
							className="form-select"
							component={ReduxFormSelectField}
							name="regionId"
							options={regionOptions}
							disabled={isFetchingDropdown || isViewOnly}
							placeholder="Select Region"
						/>
						{meta?.regionId?.touched && errors?.regionId && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.regionId}
							</span>
						)}
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="District Code"
							name="districtCode"
							placeholder="Enter Region Code"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="District Name"
							name="districtName"
							placeholder="Enter District Name"
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
	form: "district",
	fields: ["districtName", "districtCode", "regionId"],
	validate: values => {
		const errors = {};
		if (!values?.districtName || values?.districtName?.length === 0) {
			errors.districtName = "Required";
		}
		if (!values?.districtCode || values?.districtCode?.length === 0) {
			errors.districtCode = "Required";
		}
		if (values?.regionId?.length === 0) {
			errors.regionId = "Required";
		}
		return errors;
	},
})(DistrictForm);
