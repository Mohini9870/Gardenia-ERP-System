import React, { useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Field, getFormMeta, getFormSyncErrors, reduxForm } from "redux-form";
import { getDropdownList } from "../../actions/masters";
import {
	getCityDropdownList,
	getIsFetchingDropdownList,
	getIsUpdatingMasterList,
} from "../../reducers/master";
import { ReduxFormSelectField } from "../../utils/ReduxFormSelectField";
import { ReduxFormTextField } from "../../utils/ReduxFormTextField";

const AreaForm = ({ title, onCancel, handleSubmit, isViewOnly }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDropdownList("city"));
	}, [dispatch]);

	const isUpdatingMaster = useSelector(getIsUpdatingMasterList);
	const isFetchingDropdown = useSelector(getIsFetchingDropdownList);
	const cityOptions = useSelector(getCityDropdownList);
	const meta = useSelector(getFormMeta("area"));
	const errors = useSelector(getFormSyncErrors("area"));

	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<Col className="mb-3">
						<label className="form-label">City</label>
						<Field
							className="form-select"
							component={ReduxFormSelectField}
							name="cityId"
							options={cityOptions}
							disabled={isFetchingDropdown || isViewOnly}
							placeholder="Select City"
						/>
						{meta?.cityId?.touched && errors?.cityId && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.cityId}
							</span>
						)}
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Area Code"
							name="areaCode"
							placeholder="Enter Area Code"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Area Name"
							name="areaName"
							placeholder="Enter Area Name"
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
	form: "area",
	fields: ["areaName", "areaCode", "cityId"],
	validate: values => {
		const errors = {};
		if (!values?.areaName || values?.areaName?.length === 0) {
			errors.areaName = "Required";
		}
		if (!values?.areaCode || values?.areaCode?.length === 0) {
			errors.areaCode = "Required";
		}
		if (values?.cityId?.length === 0) {
			errors.cityId = "Required";
		}
		return errors;
	},
})(AreaForm);
