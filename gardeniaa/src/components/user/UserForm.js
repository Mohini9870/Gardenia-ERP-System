import React, { useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	Field,
	FieldArray,
	formValueSelector,
	getFormMeta,
	getFormSyncErrors,
	reduxForm,
} from "redux-form";
import { getDropdownList } from "../../actions/masters";
import {
	getAreaDropdownList,
	getBranchDropdownList,
	getCityDropdownList,
	getDistrictDropdownList,
	getEmployeeNameDropdownList,
	getGenderDropdownList,
	getHqDropdownList,
	getIsFetchingDropdownList,
	getMaritalStatusDropdownList,
	getPaymentModeDropdownList,
	getRegionDropdownList,
	getRoleDropdownList,
	getStateDropdownList,
	getStatusDropdownList,
	getTitleDropdownList,
} from "../../reducers/master";
import { getUserDetails } from "../../reducers/user";
import { ReduxFormFileField } from "../../utils/ReduxFormFileField";
import { ReduxFormSelectField } from "../../utils/ReduxFormSelectField";
import { ReduxFormTextField } from "../../utils/ReduxFormTextField";

const formName = "user";
const formSelector = formValueSelector(formName);

const renderUserTargetsList = ({ fields,isViewOnly }) => {
	return (
		<div className="d-flex align-items-center justify-content-center flex-column">
			<div className="d-flex flex-row align-items-center justify-content-around w-100 mb-3">
				<h4 className="text-align-start">User Targets</h4>
				<button
					className="me-2 btn btn-primary"
					type="button"
					onClick={() => fields.push({})}
					disabled={isViewOnly}
				>
					Add Target
				</button>
			</div>
			{fields?.length === 0 && (
				<h6 className="m-3">
					No user targets added. Click on Add Target button to add one.
				</h6>
			)}
			{fields.map((userTargetDetails, index) => {
				return (
					<Row key={index} className="mb-3">
						<Col className="mb-3">
							<Field
								name={`${userTargetDetails}.hq`}
								component={ReduxFormTextField}
								placeholder="Enter HQ"
								disabled={isViewOnly}
							/>
						</Col>
						<Col className="mb-3">
							<Field
								name={`${userTargetDetails}.present`}
								type="number"
								component={ReduxFormTextField}
								placeholder="Enter Present"
								disabled={isViewOnly}
							/>
						</Col>
						<Col className="mb-3">
							<Field
								name={`${userTargetDetails}.goal`}
								type="number"
								component={ReduxFormTextField}
								placeholder="Enter Goal"
								disabled={isViewOnly}
							/>
						</Col>
						<Col xs={1}>
							<button
								className="me-2 btn btn-danger"
								type="button"
								onClick={() => fields.remove(index)}
								disabled={isViewOnly}
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

const renderUserTeam = ({
	fields,
	meta,
	employeeDisabled,
	employeeOptions,
	errors,
	userTeam,
	isViewOnly,
}) => {
	const employeeOptionsForDropdown = employeeOptions?.map(emp => {
		return { label: emp?.employeeName, value: emp?.employee };
	});
	return (
		<div
			className="d-flex justify-content-center flex-column w-75"
			style={{ margin: "auto" }}
		>
			<div className="d-flex flex-row justify-content-around w-100 mb-3">
				<h4 className="text-align-start">User Team</h4>
				<button
					className="me-2 btn btn-primary"
					type="button"
					onClick={() => fields.push({ id: null })}
					disabled={isViewOnly}
				>
					Add Employee
				</button>
			</div>
			{fields?.length === 0 && (
				<h6 className="m-3">
					No employees added. Click on Add Employee button to add one.
				</h6>
			)}
			{fields.map((team, index) => {
				const selectedEmp = employeeOptions?.find(
					e => e?.employee === +userTeam?.[index]?.employeeName
				);
				return (
					<Row key={index} className="mb-3">
						<Col className="mb-3">
							<Field
								className="form-select"
								component={ReduxFormSelectField}
								name={`${team}.employeeName`}
								options={employeeOptionsForDropdown}
								disabled={employeeDisabled || isViewOnly}
								placeholder="Select Employee"
							/>
							{meta?.team?.[index]?.employeeName?.touched &&
								errors?.team?.[index]?.employeeName && (
									<span style={{ color: "red", marginLeft: "4px" }}>
										{errors?.team?.[index]?.employeeName}
									</span>
								)}
						</Col>
						<Col className="mb-3">
							<Field
								name={`${team}.hq`}
								component={ReduxFormTextField}
								input={{ value: selectedEmp?.hqName || "" }}
								disabled
							/>
						</Col>
						<Col className="mb-3">
							<Field
								name={`${team}.designation`}
								component={ReduxFormTextField}
								input={{ value: selectedEmp?.designation || "" }}
								disabled
							/>
						</Col>
						<Col xs={1}>
							<button
								className="me-2 btn btn-danger"
								type="button"
								onClick={() => fields.remove(index)}
								disabled={isViewOnly}
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

const UserForm = ({ title, onCancel, handleSubmit, initialValues, isViewOnly }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDropdownList("title"));
		dispatch(getDropdownList("gender"));
		dispatch(getDropdownList("maritalStatus"));
		dispatch(getDropdownList("paymentMode"));
		dispatch(getDropdownList("status"));
		dispatch(getDropdownList("state"));
		dispatch(getDropdownList("role"));
		dispatch(getDropdownList("branch"));
	}, [dispatch]);

	const { isRoleRsm } = useSelector(getUserDetails);
	const stateId = useSelector(state => formSelector(state, "stateId"));
	const regionId = useSelector(state => formSelector(state, "regionId"));
	const districtId = useSelector(state => formSelector(state, "districtId"));
	const cityId = useSelector(state => formSelector(state, "cityId"));
	const role = useSelector(state => formSelector(state, "role"));
	const hqId = useSelector(state => formSelector(state, "hqId"));
	const userTeam = useSelector(state => formSelector(state, "userTeam"));
	const titleOptions = useSelector(getTitleDropdownList);
	const genderOptions = useSelector(getGenderDropdownList);
	const maritalStatusOptions = useSelector(getMaritalStatusDropdownList);
	const paymentModeOptions = useSelector(getPaymentModeDropdownList);
	const statusOptions = useSelector(getStatusDropdownList);
	const stateOptions = useSelector(getStateDropdownList);
	const regionOptions = useSelector(getRegionDropdownList);
	const districtOptions = useSelector(getDistrictDropdownList);
	const cityOptions = useSelector(getCityDropdownList);
	const areaOptions = useSelector(getAreaDropdownList);
	const hqOptions = useSelector(getHqDropdownList);
	const roleOptions = useSelector(getRoleDropdownList);
	const isFetchingDropdown = useSelector(getIsFetchingDropdownList);
	const employeeDropdownList = useSelector(getEmployeeNameDropdownList);
	const branchOptions =useSelector(getBranchDropdownList);
	const meta = useSelector(getFormMeta(formName));
	const errors = useSelector(getFormSyncErrors(formName));

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
		if (cityId) dispatch(getDropdownList("area", { cityId }));
	}, [cityId, dispatch]);

	useEffect(() => {
		if (regionId && role) dispatch(getDropdownList("hq", { regionId, role }));
	}, [regionId, role, dispatch]);

	useEffect(() => {
		if (regionId && role && hqId)
			dispatch(getDropdownList("employeeName", { hqId, regionId, role }));
	}, [regionId, role, hqId, dispatch]);

	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<div className="mb-3" style={{ width: 150 }}>
						<label className="form-label">Title</label>
						<Field
							className="form-select"
							component="select"
							name="title"
							disabled={isFetchingDropdown || isViewOnly}
						>
							<option value="" hidden>
								Select Title
							</option>
							{titleOptions?.map(i => (
								<option key={i?.value} value={i?.value}>
									{i?.label}
								</option>
							))}
						</Field>
						{meta?.title?.touched && errors?.title && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.title}
							</span>
						)}
					</div>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="First Name"
							name="firstName"
							placeholder="Enter First Name"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Middle Name"
							name="middleName"
							placeholder="Enter Middle Name"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Last Name"
							name="lastName"
							placeholder="Enter Last Name"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Full Name"
							name="fullName"
							placeholder="Enter Full Name"
							disabled={isViewOnly}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Aadhar No."
							name="aadharNo"
							placeholder="Enter Aadhar No."
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Sales Diary Login"
							name="login"
							placeholder="Enter Login"
							disabled={isRoleRsm || isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<label className="form-label">Gender</label>
						<Field
							className="form-select"
							component="select"
							name="gender"
							disabled={isFetchingDropdown || isViewOnly}
						>
							<option value="" hidden>
								Select Gender
							</option>
							{genderOptions?.map(i => (
								<option key={i?.value} value={i?.value}>
									{i?.label}
								</option>
							))}
						</Field>
						{meta?.gender?.touched && errors?.gender && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.gender}
							</span>
						)}
					</Col>
					<Col className="mb-3">
						<label className="form-label">Marital Status</label>
						<Field
							className="form-select"
							component="select"
							name="maritalStatus"
							disabled={isFetchingDropdown || isViewOnly}
						>
							<option value="" hidden>
								Select Marital Status
							</option>
							{maritalStatusOptions?.map(i => (
								<option key={i?.value} value={i?.value}>
									{i?.label}
								</option>
							))}
						</Field>
						{meta?.maritalStatus?.touched && errors?.maritalStatus && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.maritalStatus}
							</span>
						)}
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
						<Field
							component={ReduxFormTextField}
							label="Date of Birth"
							name="birthDate"
							type="date"
							placeholder="Enter DOB"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Employee Code"
							name="empCode"
							placeholder="Enter Employee Code"
							disabled={isRoleRsm || isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Reporting To"
							name="reportingTo"
							placeholder="Enter Reporting To"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Company Code"
							name="companyCode"
							placeholder="Enter Company Code"
							disabled={isRoleRsm || isViewOnly}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Grade"
							name="grade"
							placeholder="Enter Grade"
							disabled={isRoleRsm || isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<label className="form-label">Branch</label>
						<Field
							className="form-select"
							component={ReduxFormSelectField}
							name="branch"
							options={branchOptions}
							disabled={isFetchingDropdown || isViewOnly}
							placeholder="Select Branch"
						/>
						{meta?.branch?.touched && errors?.branch && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.branch}
							</span>
						)}
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Department"
							name="department"
							placeholder="Enter Department"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Process Start Date"
							name="processStartDate"
							type="date"
							placeholder="Enter Process Start Date"
							disabled={isRoleRsm || isViewOnly}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<label className="form-label">Payment Mode</label>
						<Field
							className="form-select"
							component="select"
							name="paymentMode"
							disabled={isFetchingDropdown || isRoleRsm || isViewOnly}
						>
							<option value="" hidden>
								Select Payment Mode
							</option>
							{paymentModeOptions?.map(i => (
								<option key={i?.value} value={i?.value}>
									{i?.label}
								</option>
							))}
						</Field>
						{meta?.paymentMode?.touched && errors?.paymentMode && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.paymentMode}
							</span>
						)}
					</Col>
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
						<label className="form-label">Area</label>
						<Field
							className="form-select"
							component={ReduxFormSelectField}
							name="areaId"
							options={areaOptions}
							disabled={isFetchingDropdown || !cityId || isViewOnly}
							placeholder="Select Area"
						/>
						{meta?.areaId?.touched && errors?.areaId && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.areaId}
							</span>
						)}
					</Col>
					<Col className="mb-3">
						<label className="form-label">Role</label>
						<Field
							className="form-select"
							component="select"
							name="role"
							disabled={isFetchingDropdown || isViewOnly}
						>
							<option value="" hidden>
								Select Role
							</option>
							{roleOptions?.map(i => (
								<option key={i?.value} value={i?.value}>
									{i?.label}
								</option>
							))}
						</Field>
						{meta?.role?.touched && errors?.role && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.role}
							</span>
						)}
					</Col>
				</Row>
				<Row className="mb-3">
					<Col className="mb-3">
						<label className="form-label">HQ</label>
						<Field
							className="form-select"
							component={ReduxFormSelectField}
							name="hqId"
							options={hqOptions}
							disabled={isFetchingDropdown || !role || !regionId || isViewOnly}
							placeholder="Select HQ"
						/>
						{meta?.hqId?.touched && errors?.hqId && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.hqId}
							</span>
						)}
					</Col>
					<Col>
						<Field
							name="aadharFile"
							type="file"
							component={ReduxFormFileField}
							label="AADHAAR File"
							file={initialValues?.aadharFile}
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
							name="beatPlanFile"
							type="file"
							component={ReduxFormFileField}
							label="Beat Plan File"
							file={initialValues?.beatPlanFile}
							isViewOnly={isViewOnly}
						/>
					</Col>
				</Row>
				<Row className="mb-4">
					<Col>
						<Field
							name="resumeFile"
							type="file"
							component={ReduxFormFileField}
							label="Resume File"
							file={initialValues?.resumeFile}
							isViewOnly={isViewOnly}
						/>
					</Col>
					<Col>
						<Field
							name="paySlipFile"
							type="file"
							component={ReduxFormFileField}
							label="Pay Slip File"
							file={initialValues?.paySlipFile}
							isViewOnly={isViewOnly}
						/>
					</Col>
					<Col>
						<Field
							name="bankStatementFile"
							type="file"
							component={ReduxFormFileField}
							label="Bank Statement File"
							file={initialValues?.bankStatementFile}
							isViewOnly={isViewOnly}
						/>
					</Col>
				</Row>
				<h5 className="mt-3">Last/Current Organisation Details:</h5>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Name"
							name="lcOrgName"
							placeholder="Name"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="date"
							label="Joining Date"
							name="lcJoiningDate"
							placeholder="Enter Joining Date"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="date"
							label="Last date"
							name="lcLastDate"
							placeholder="Enter Last Date"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Designation"
							name="lcOrgDesignation"
							placeholder="Enter Designation"
							disabled={isViewOnly}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="number"
							label="Salary(Net Salary)"
							name="lcOrgSalary"
							placeholder="Enter Salary"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="number"
							label="Manager Mobile Number"
							name="lcOrgManagerMobile"
							placeholder="Enter Manager Mobile Number"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="email"
							label="Manager Email ID"
							name="lcOrgManagerEmailID"
							placeholder="Enter Manager Email ID"
							disabled={isViewOnly}
						/>
					</Col>

					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="email"
							label="HR Email ID"
							name="lcOrgHREmailID"
							placeholder="Enter HR Email ID"
							disabled={isViewOnly}
						/>
					</Col>
				</Row>
				<h5 className="mt-3">Recommendations:</h5>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="date"
							label="Date of Joining"
							name="dateOfJoining"
							placeholder="Enter Date of Joining"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Designation"
							name="designationRecommended"
							placeholder="Enter Designation"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="number"
							label="Gardenia Offer Salary"
							name="goSalary"
							placeholder="Enter Gardenia Offer Salary"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="number"
							label="Growth %age"
							name="growthPercentage"
							placeholder="Enter Growth %age"
							disabled={isViewOnly}
						/>
					</Col>
				</Row>
				<Row className="mt-3">
					<FieldArray
						name="userTargetDetails"
						component={renderUserTargetsList}
						isViewOnly={isViewOnly}
					/>
				</Row>
				<Row className="mt-3">
					<FieldArray
						name="userTeam"
						component={renderUserTeam}
						employeeOptions={employeeDropdownList}
						employeeDisabled={isFetchingDropdown || !role || !regionId || !hqId}
						userTeam={userTeam}
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
		"title",
		"firstName",
		"middleName",
		"lastName",
		"fullName",
		"aadharNo",
		"login",
		"gender",
		"maritalStatus",
		"birthDate",
		"email",
		"empCode",
		"team",
		"companyCode",
		"grade",
		"branch",
		"department",
		"processStartDate",
		"paymentMode",
		"status",
		"stateId",
		"regionId",
		"districtId",
		"cityId",
		"areaId",
		"hqId",
		"role",
		"aadharFile",
		"panFile",
		"resumeFile",
		"beatPlanFile",
		"paySlipFile",
		"bankStatementFile",
		"lcOrgName",
		"lcJoiningDate",
		"lcLastDate",
		"lcOrgDesignation",
		"lcOrgSalary",
		"lcOrgManagerMobile",
		"lcOrgManagerEmailID",
		"lcOrgHREmailID",
		"dateOfJoining",
		"designationRecommended",
		"goSalary",
		"growthPercentage",
		"userTargetDetails",
		"userTeam",
	],
	validate: values => {
		const errors = {};
		if (!values?.title || values?.title?.length === 0) {
			errors.title = "Required";
		}
		if (!values?.firstName || values?.firstName?.length === 0) {
			errors.firstName = "Required";
		}
		// if (!values?.lastName || values?.lastName?.length === 0) {
		// 	errors.lastName = "Required";
		// }
		if (!values?.gender || values?.gender?.length === 0) {
			errors.gender = "Required";
		}
		if (!values?.maritalStatus || values?.maritalStatus?.length === 0) {
			errors.maritalStatus = "Required";
		}
		if (!values?.birthDate || values?.birthDate?.length === 0) {
			errors.birthDate = "Required";
		}
		if (!values?.email || values?.email?.length === 0) {
			errors.email = "Required";
		}
		if (!values?.status || values?.status?.length === 0) {
			errors.status = "Required";
		}
		if (!values?.stateId || values?.stateId?.length === 0) {
			errors.stateId = "Required";
		}
		if (!values?.regionId || values?.regionId?.length === 0) {
			errors.regionId = "Required";
		}
		// if (!values?.districtId || values?.districtId?.length === 0) {
		// 	errors.districtId = "Required";
		// }
		// if (!values?.cityId || values?.cityId?.length === 0) {
		// 	errors.cityId = "Required";
		// }
		// if (!values?.areaId || values?.areaId?.length === 0) {
		// 	errors.areaId = "Required";
		// }
		if (!values?.hqId || values?.hqId?.length === 0) {
			errors.hqId = "Required";
		}
		if (!values?.role || values?.role?.length === 0) {
			errors.role = "Required";
		}
		if (values?.lcOrgManagerMobile && values?.lcOrgManagerMobile?.length > 10) {
			errors.lcOrgManagerMobile =
				"Mobile Number should not contain more than 10 characters";
		}
		const userTargetArrayErrors = [];
		values?.userTargetDetails?.forEach((userTarget, targetIndex) => {
			const userTargetErrors = {};
			if (!userTarget.hq || userTarget?.hq?.length === 0) {
				userTargetErrors.hq = "Required";
				userTargetArrayErrors[targetIndex] = userTargetErrors;
			}
			if (!userTarget.present || userTarget?.present?.length === 0) {
				userTargetErrors.present = "Required";
				userTargetArrayErrors[targetIndex] = userTargetErrors;
			}
			if (!userTarget.goal || userTarget?.goal?.length === 0) {
				userTargetErrors.goal = "Required";
				userTargetArrayErrors[targetIndex] = userTargetErrors;
			}
			if (userTarget?.present < 0 || userTarget?.present % 1 !== 0) {
				userTargetErrors.present = "Enter a valid present value";
				userTargetArrayErrors[targetIndex] = userTargetErrors;
			}
			if (userTarget?.goal < 0 || userTarget?.goal % 1 !== 0) {
				userTargetErrors.goal = "Enter a valid goal value";
				userTargetArrayErrors[targetIndex] = userTargetErrors;
			}
		});
		if (userTargetArrayErrors.length) {
			errors.userTargetDetails = userTargetArrayErrors;
		}
		return errors;
	},
})(UserForm);
