import React, { useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	Field,
	FieldArray,
	formValueSelector,
	getFormMeta,
	getFormSyncErrors,
	hasSubmitFailed,
	reduxForm,
} from "redux-form";
import { getDropdownList } from "../../actions/masters";
import {
	getBrandDropdownList,
	getCityDropdownList,
	getDistrictDropdownList,
	getHqDropdownList,
	getIsFetchingDropdownList,
	getRegionDropdownList,
	getServiceStatusDropdown,
	getStateDropdownList,
	getStatusDropdownList,
	getTypeOfDistributorDropdownListDropdown,
} from "../../reducers/master";
import { ReduxFormFileField } from "../../utils/ReduxFormFileField";
import { ReduxFormSelectField } from "../../utils/ReduxFormSelectField";
import { ReduxFormTextField } from "../../utils/ReduxFormTextField";

const formName = "distributor";
const formSelector = formValueSelector(formName);

const distributorValidation = values => {
	const errors = {};
	if (!values?.distributorName || values?.distributorName?.length === 0) {
		errors.distributorName = "Required";
	}
	if (!values?.distributorType || values?.distributorType?.length === 0) {
		errors.distributorType = "Required";
	}
	if (!values?.stateId || values?.stateId?.length === 0) {
		errors.stateId = "Required";
	}
	if (!values?.regionId || values?.regionId?.length === 0) {
		errors.regionId = "Required";
	}
	if (!values?.districtId || values?.districtId?.length === 0) {
		errors.districtId = "Required";
	}
	if (!values?.cityId || values?.cityId?.length === 0) {
		errors.cityId = "Required";
	}
	if (!values?.billingAddress || values?.billingAddress?.length === 0) {
		errors.billingAddress = "Required";
	}
	if (!values?.deliveryAddress || values?.deliveryAddress?.length === 0) {
		errors.deliveryAddress = "Required";
	}
	if (!values?.status || values?.status?.length === 0) {
		errors.status = "Required";
	}
	if (!values?.serviceStatus || values?.serviceStatus?.length === 0) {
		errors.serviceStatus = "Required";
	}
	if (!values?.hqId || values?.hqId?.length === 0) {
		errors.hqId = "Required";
	}
	if (values?.mobile % 1 !== 0 || values?.mobile?.length !== 10) {
		errors.mobile = "Enter a valid mobile number";
	}
	if (!values?.pinCode || values?.pinCode?.length === 0) {
		errors.pinCode = "Required";
	}
	if (values?.pinCode % 1 !== 0 || values?.pinCode?.length !== 6) {
		errors.pinCode = "Enter a valid pincode";
	}
	if (
		!values.currentBusinessAssociation ||
		!values.currentBusinessAssociation.length
	) {
		errors.currentBusinessAssociation = {
			_error: "At least one business association must be entered",
		};
	} else {
		const currentBusinessAssociationArrayErrors = [];
		values?.currentBusinessAssociation?.forEach((cba, targetIndex) => {
			const currentBusinessAssociationErrors = {};
			if (!cba.companyName || cba?.companyName?.length === 0) {
				currentBusinessAssociationErrors.companyName = "Required";
				currentBusinessAssociationArrayErrors[targetIndex] =
					currentBusinessAssociationErrors;
			}
			if (!cba.distributorSince || cba?.distributorSince?.length === 0) {
				currentBusinessAssociationErrors.distributorSince = "Required";
				currentBusinessAssociationArrayErrors[targetIndex] =
					currentBusinessAssociationErrors;
			}
			if (cba?.distributorSince < 0 || cba?.distributorSince % 1 !== 0) {
				currentBusinessAssociationErrors.distributorSince =
					"Enter a valid value";
				currentBusinessAssociationArrayErrors[targetIndex] =
					currentBusinessAssociationErrors;
			}
			if (!cba.routesCovered || cba?.routesCovered?.length === 0) {
				currentBusinessAssociationErrors.routesCovered = "Required";
				currentBusinessAssociationArrayErrors[targetIndex] =
					currentBusinessAssociationErrors;
			}
			if (cba?.routesCovered < 0 || cba?.routesCovered % 1 !== 0) {
				currentBusinessAssociationErrors.routesCovered = "Enter a valid value";
				currentBusinessAssociationArrayErrors[targetIndex] =
					currentBusinessAssociationErrors;
			}
			if (!cba.annualTurnover || cba?.annualTurnover?.length === 0) {
				currentBusinessAssociationErrors.annualTurnover = "Required";
				currentBusinessAssociationArrayErrors[targetIndex] =
					currentBusinessAssociationErrors;
			}
			if (cba?.annualTurnover < 0 || cba?.annualTurnover % 1 !== 0) {
				currentBusinessAssociationErrors.annualTurnover = "Enter a valid value";
				currentBusinessAssociationArrayErrors[targetIndex] =
					currentBusinessAssociationErrors;
			}
			if (!cba.typeOfDistributor || cba?.typeOfDistributor?.length === 0) {
				currentBusinessAssociationErrors.typeOfDistributor = "Required";
				currentBusinessAssociationArrayErrors[targetIndex] =
					currentBusinessAssociationErrors;
			}
		});
		if (currentBusinessAssociationArrayErrors.length) {
			errors.currentBusinessAssociation = currentBusinessAssociationArrayErrors;
		}
	}
	return errors;
};

const renderCurrentBusinessAssociation = ({
	fields,
	meta,
	isFetchingDropdown,
	distributorTypeOptions,
	errors,
	hasFormSubmitFailed,
	isViewOnly
}) => {
	return (
		<div className="d-flex align-items-center justify-content-center flex-column">
			<div className="d-flex flex-row align-items-center justify-content-around w-100 mb-3">
				<h4 className="text-align-start">Business Association</h4>
				<button
					className="me-2 btn btn-primary"
					type="button"
					onClick={() => fields.push({})}
					disabled={isViewOnly}
				>
					Add Association
				</button>
			</div>
			{fields?.length === 0 && (
				<h6 className="m-3">
					No business association added. Click on Add Association button to add
					one.
				</h6>
			)}
			{hasFormSubmitFailed && errors?.currentBusinessAssociation?._error && (
				<span style={{ color: "red", marginLeft: "4px" }}>
					{errors?.currentBusinessAssociation?._error}
				</span>
			)}
			{fields.map((cba, index) => {
				return (
					<Row key={index}>
						<Col xs lg="2" className="mb-3">
							<Field
								name={`${cba}.companyName`}
								component={ReduxFormTextField}
								placeholder="Company Name"
								disabled={isViewOnly}
							/>
						</Col>
						<Col xs lg="2" className="mb-3">
							<Field
								name={`${cba}.distributorSince`}
								type="number"
								component={ReduxFormTextField}
								placeholder="Distributor Since"
								disabled={isViewOnly}
							/>
						</Col>
						<Col xs lg="2" className="mb-3">
							<Field
								name={`${cba}.routesCovered`}
								type="number"
								component={ReduxFormTextField}
								placeholder="Routes Covered"
								disabled={isViewOnly}
							/>
						</Col>
						<Col xs lg="2" className="mb-3">
							<Field
								name={`${cba}.annualTurnover`}
								type="number"
								component={ReduxFormTextField}
								placeholder="Annual Turnover"
								disabled={isViewOnly}
							/>
						</Col>
						<Col className="mb-3">
							<Field
								className="form-select"
								component="select"
								name={`${cba}.typeOfDistributor`}
								disabled={isFetchingDropdown || isViewOnly}
							>
								<option value="" hidden>
									Select Distributor Type
								</option>
								{distributorTypeOptions?.map(i => (
									<option key={i?.value} value={i?.value}>
										{i?.label}
									</option>
								))}
							</Field>
							{meta?.currentBusinessAssociation?.[index]?.typeOfDistributor
								?.touched &&
								errors?.currentBusinessAssociation?.[index]
									?.typeOfDistributor && (
									<span style={{ color: "red", marginLeft: "4px" }}>
										{
											errors?.currentBusinessAssociation?.[index]
												?.typeOfDistributor
										}
									</span>
								)}
						</Col>
						<Col xs={1}>
							<button
								className="me-2 btn btn-danger"
								type="button"
								onClick={() => fields.remove(index)}
								disabled={!index || isViewOnly}
							>
								Remove
							</button>
						</Col>
					</Row>
				);
			})}
		</div>
	);
};

const DistributorForm = ({ title, onCancel, handleSubmit, initialValues, isViewOnly }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDropdownList("brand"));
		dispatch(getDropdownList("status"));
		dispatch(getDropdownList("state"));
		dispatch(getDropdownList("serviceStatus"));
		dispatch(getDropdownList("hq"));
		dispatch(getDropdownList("typeOfDistributor"));
	}, [dispatch]);

	const stateId = useSelector(state => formSelector(state, "stateId"));
	const regionId = useSelector(state => formSelector(state, "regionId"));
	const districtId = useSelector(state => formSelector(state, "districtId"));
	const distributorTypeOptions = useSelector(
		getTypeOfDistributorDropdownListDropdown
	);
	const brandOptions = useSelector(getBrandDropdownList);
	const stateOptions = useSelector(getStateDropdownList);
	const regionOptions = useSelector(getRegionDropdownList);
	const districtOptions = useSelector(getDistrictDropdownList);
	const cityOptions = useSelector(getCityDropdownList);
	const statusOptions = useSelector(getStatusDropdownList);
	const serviceStatusOptions = useSelector(getServiceStatusDropdown);
	const hqOptions = useSelector(getHqDropdownList);
	const isFetchingDropdown = useSelector(getIsFetchingDropdownList);
	const meta = useSelector(getFormMeta(formName));
	const errors = useSelector(getFormSyncErrors(formName));
	const submitFailed = useSelector(hasSubmitFailed(formName));

	useEffect(() => {
		if (stateId) dispatch(getDropdownList("region", { stateId }));
	}, [stateId, dispatch]);

	useEffect(() => {
		if (regionId) dispatch(getDropdownList("district", { regionId }));
	}, [regionId, dispatch]);

	useEffect(() => {
		if (districtId) dispatch(getDropdownList("city", { districtId }));
	}, [districtId, dispatch]);

	useEffect(() => {
		if (regionId) dispatch(getDropdownList("hq", { regionId }));
	}, [regionId, dispatch]);

	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					{initialValues?.distributorCode && (
						<Col className="mb-3">
							<Field
								component={ReduxFormTextField}
								label="Distributor Code"
								name="distributorCode"
								placeholder="Enter Distributor Code"
								disabled
							/>
						</Col>
					)}
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Distributor Name"
							name="distributorName"
							placeholder="Enter Distributor Name"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<label className="form-label">Distributor Type</label>
						<Field
							className="form-select"
							component="select"
							name="distributorType"
							disabled={isFetchingDropdown || isViewOnly}
						>
							<option value="" hidden>
								Select Distributor Type
							</option>
							{distributorTypeOptions?.map(i => (
								<option key={i?.value} value={i?.value}>
									{i?.label}
								</option>
							))}
						</Field>
						{meta?.distributorType?.touched && errors?.distributorType && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.distributorType}
							</span>
						)}
					</Col>
					<Col className="mb-3">
						<label className="form-label">State</label>
						<Field
							className="form-select"
							component={ReduxFormSelectField}
							name="stateId"
							options={stateOptions}
							disabled={isFetchingDropdown || isViewOnly}
							placeholder="Select State"
						/>
						{meta?.stateId?.touched && errors?.stateId && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.stateId}
							</span>
						)}
					</Col>
					<Col className="mb-3">
						<label className="form-label">Region</label>
						<Field
							className="form-select"
							component={ReduxFormSelectField}
							name="regionId"
							options={regionOptions}
							disabled={isFetchingDropdown || !stateId || isViewOnly}
							placeholder="Select Region"
						/>
						{meta?.regionId?.touched && errors?.regionId && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.regionId}
							</span>
						)}
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<label className="form-label">District</label>
						<Field
							className="form-select"
							component={ReduxFormSelectField}
							name="districtId"
							options={districtOptions}
							disabled={isFetchingDropdown || !regionId || isViewOnly}
							placeholder="Select District"
						/>
						{meta?.districtId?.touched && errors?.districtId && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.districtId}
							</span>
						)}
					</Col>
					<Col className="mb-3">
						<label className="form-label">City</label>
						<Field
							className="form-select"
							component={ReduxFormSelectField}
							name="cityId"
							options={cityOptions}
							disabled={isFetchingDropdown || !districtId || isViewOnly}
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
							label="Pincode"
							name="pinCode"
							placeholder="Enter Pincode"
							type="number"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="GSTIN"
							name="gstin"
							placeholder="Enter GSTIN"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="PAN"
							name="pan"
							placeholder="Enter PAN"
							disabled={isViewOnly}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Contact Person"
							name="contact"
							placeholder="Enter Contact Person"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Mobile"
							name="mobile"
							placeholder="Enter Mobile"
							type="number"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Phone"
							name="phone"
							type="number"
							disabled={isViewOnly}
							placeholder="Enter Phone"
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Email"
							name="email"
							type="email"
							placeholder="Enter Email"
							disabled={isViewOnly}
						/>
					</Col>
				</Row>

				<Row>
					<Col className="mb-3">
						<label className="form-label">Status</label>
						<Field
							className="form-select"
							component="select"
							name="status"
							disabled={isFetchingDropdown || isViewOnly}
						>
							<option value="" hidden>
								Select Status
							</option>
							{statusOptions?.map(i => (
								<option key={i?.value} value={i?.value}>
									{i?.label}
								</option>
							))}
						</Field>
						{meta?.status?.touched && errors?.status && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.status}
							</span>
						)}
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Billing Address"
							name="billingAddress"
							placeholder="Enter Billing Address"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Delivery Address"
							name="deliveryAddress"
							placeholder="Enter Delivery Address"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Supplier Name"
							name="suppName"
							placeholder="Enter Supplier Name"
							disabled={isViewOnly}
						/>
					</Col>
				</Row>
				<Row>
					<Col xs lg="2" className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Supplier Code"
							name="suppCode"
							placeholder="Enter Supplier Code"
							disabled={isViewOnly}
						/>
					</Col>
					<Col xs lg="2" className="mb-3">
						<label className="form-label">Service Status</label>
						<Field
							className="form-select"
							component="select"
							name="serviceStatus"
							disabled={isFetchingDropdown || isViewOnly}
						>
							<option value="" hidden>
								Select Service Status
							</option>
							{serviceStatusOptions?.map(i => (
								<option key={i?.value} value={i?.value}>
									{i?.label}
								</option>
							))}
						</Field>
						{meta?.serviceStatus?.touched && errors?.serviceStatus && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.serviceStatus}
							</span>
						)}
					</Col>
					<Col xs lg="3" className="mb-3">
						<label className="form-label">HQ</label>
						<Field
							className="form-select"
							component={ReduxFormSelectField}
							name="hqId"
							options={hqOptions}
							disabled={isFetchingDropdown || !regionId || isViewOnly}
							placeholder="Select HQ"
						/>
						{meta?.hqId?.touched && errors?.hqId && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.hqId}
							</span>
						)}
					</Col>
					<Col className="mb-3">
						<label className="form-label">Brand List</label>
						<Field
							component={ReduxFormSelectField}
							name="brandList"
							disabled={isFetchingDropdown || isViewOnly}
							options={brandOptions}
							isMulti
						/>
						{meta?.brandList?.touched && errors?.brandList && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.brandList}
							</span>
						)}
					</Col>
				</Row>
				<Row className="mb-2">
					<Col>
						<Field
							name="gstFile"
							type="file"
							component={ReduxFormFileField}
							label="GST File"
							file={initialValues?.gstFile}
							isViewOnly={isViewOnly}
						/>
					</Col>
					<Col>
						<Field
							name="panFile"
							type="file"
							component={ReduxFormFileField}
							label="PAN File"
							file={initialValues?.panFile}
							isViewOnly={isViewOnly}
						/>
					</Col>
					<Col>
						<Field
							name="scannedCopy"
							type="file"
							component={ReduxFormFileField}
							label="Scanned Copy"
							file={initialValues?.scannedCopy}
							isViewOnly={isViewOnly}
						/>
					</Col>
				</Row>
				<Row className="m-3 mt-4">
					<FieldArray
						name="currentBusinessAssociation"
						component={renderCurrentBusinessAssociation}
						meta={meta}
						isFetchingDropdown={isFetchingDropdown}
						hasFormSubmitFailed={submitFailed}
						distributorTypeOptions={distributorTypeOptions}
						errors={errors}
						isViewOnly={isViewOnly}
					/>
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onCancel}>
					Close
				</Button>
				<Button className="ms-2" type="submit" variant="success" disabled={isViewOnly}>
					Submit
				</Button>
			</Modal.Footer>
		</form>
	);
};

export default reduxForm({
	form: formName,
	fields: [
		"distributorName",
		"distributorType",
		"stateId",
		"regionId",
		"districtId",
		"cityId",
		"gstin",
		"pan",
		"contact",
		"mobile",
		"phone",
		"email",
		"billingAddress",
		"deliveryAddress",
		"suppName",
		"suppCode",
		"serviceStatus",
		"status",
		"brandList",
		"hqId",
		"gstFile",
		"panFile",
		"scannedCopy",
		"currentBusinessAssociation",
		"pinCode",
	],
	validate: distributorValidation,
})(DistributorForm);
