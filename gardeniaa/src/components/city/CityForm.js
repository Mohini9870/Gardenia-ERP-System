import React, { useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Field, getFormMeta, getFormSyncErrors, reduxForm } from "redux-form";
import { getDropdownList } from "../../actions/masters";
import {
	getDistrictDropdownList,
	getIsFetchingDropdownList,
	getIsUpdatingMasterList,
} from "../../reducers/master";
import { ReduxFormSelectField } from "../../utils/ReduxFormSelectField";
import { ReduxFormTextField } from "../../utils/ReduxFormTextField";

const CityForm = ({ title, onCancel, handleSubmit, isViewOnly }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDropdownList("district"));
	}, [dispatch]);

	const isUpdatingMaster = useSelector(getIsUpdatingMasterList);
	const isFetchingDropdown = useSelector(getIsFetchingDropdownList);
	const districtOptions = useSelector(getDistrictDropdownList);
	const meta = useSelector(getFormMeta("city"));
	const errors = useSelector(getFormSyncErrors("city"));

	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<Col className="mb-3">
						<label className="form-label">District</label>
						<Field
							className="form-select"
							component={ReduxFormSelectField}
							name="districtId"
							options={districtOptions}
							disabled={isFetchingDropdown || isViewOnly}
							placeholder="Select District"
						/>
						{meta?.districtId?.touched && errors?.districtId && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.districtId}
							</span>
						)}
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="City Code"
							name="cityCode"
							placeholder="Enter City Code"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="City Name"
							name="cityName"
							placeholder="Enter City Name"
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
	form: "city",
	fields: ["cityName", "cityCode", "districtId"],
	validate: values => {
		const errors = {};
		if (!values?.cityName || values?.cityName?.length === 0) {
			errors.cityName = "Required";
		}
		if (!values?.cityCode || values?.cityCode?.length === 0) {
			errors.cityCode = "Required";
		}
		if (values?.districtId?.length === 0) {
			errors.districtId = "Required";
		}
		return errors;
	},
})(CityForm);
