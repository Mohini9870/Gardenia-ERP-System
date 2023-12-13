import React, { useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	Field,
	formValueSelector,
	getFormMeta,
	getFormSyncErrors,
	reduxForm,
} from "redux-form";
import { getDropdownList } from "../../actions/masters";
import {
	getBrandDropdownList,
	getCategoryDropdownList,
	getFamilyDropdownList,
	getIsFetchingDropdownList,
	getStatusDropdownList,
	getUomDropdownList,
} from "../../reducers/master";
import { ReduxFormSelectField } from "../../utils/ReduxFormSelectField";
import { ReduxFormTextField } from "../../utils/ReduxFormTextField";

const formName = "product";
const formSelector = formValueSelector(formName);

const ProductForm = ({ title, onCancel, handleSubmit, isViewOnly, initialValues }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDropdownList("brand"));
		dispatch(getDropdownList("uom"));
		dispatch(getDropdownList("status"));
	}, [dispatch]);

	const brandId = useSelector(state => formSelector(state, "brandId"));
	const categoryId = useSelector(state => formSelector(state, "categoryId"));

	const brandOptions = useSelector(getBrandDropdownList);
	const categoryOptions = useSelector(getCategoryDropdownList);
	const familyOptions = useSelector(getFamilyDropdownList);
	const uomOptions = useSelector(getUomDropdownList);
	const statusOptions = useSelector(getStatusDropdownList);
	const isFetchingDropdown = useSelector(getIsFetchingDropdownList);
	const meta = useSelector(getFormMeta(formName));
	const errors = useSelector(getFormSyncErrors(formName));

	useEffect(() => {
		if (brandId) dispatch(getDropdownList("category", { brandId }));
	}, [brandId, dispatch]);

	useEffect(() => {
		if (categoryId) dispatch(getDropdownList("family", { categoryId }));
	}, [categoryId, dispatch]);

	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					{initialValues?.code && (<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Product Code"
							name="code"
							placeholder="Enter Product Code"
							disabled
						/>
					</Col>
					)}
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Product Name"
							name="pname"
							placeholder="Enter Product Name"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<label className="form-label">Brand</label>
						<Field
							className="form-select"
							component={ReduxFormSelectField}
							name="brandId"
							options={brandOptions}
							disabled={isFetchingDropdown || isViewOnly}
							placeholder="Select Brand"
						/>
						{meta?.brandId?.touched && errors?.brandId && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.brandId}
							</span>
						)}
					</Col>
					<Col className="mb-3">
						<label className="form-label">Category</label>
						<Field
							className="form-select"
							component={ReduxFormSelectField}
							name="categoryId"
							options={categoryOptions}
							disabled={isFetchingDropdown || isViewOnly}
							placeholder="Select Category"
						/>
						{meta?.categoryId?.touched && errors?.categoryId && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.categoryId}
							</span>
						)}
					</Col>
				</Row>

				<Row>
					<Col className="mb-3">
						<label className="form-label">Family</label>
						<Field
							className="form-select"
							component={ReduxFormSelectField}
							name="familyId"
							options={familyOptions}
							disabled={isFetchingDropdown || isViewOnly}
							placeholder="Select Family"
						/>
						{meta?.familyId?.touched && errors?.familyId && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.familyId}
							</span>
						)}
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Variant"
							name="variant"
							placeholder="Enter Variant"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Group Name"
							name="group_name"
							placeholder="Enter Group Name"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<label className="form-label">UOM</label>
						<Field
							className="form-select"
							component="select"
							name="uom"
							disabled={isFetchingDropdown || isViewOnly}
						>
							<option value="" hidden>
								Select UOM
							</option>
							{uomOptions?.map(i => (
								<option key={i?.value} value={i?.value}>
									{i?.label}
								</option>
							))}
						</Field>
						{meta?.uom?.touched && errors?.uom && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.uom}
							</span>
						)}
					</Col>
				</Row>

				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="PTD"
							name="ptd"
							type="number"
							placeholder="Enter PTD"
							step=".01"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="PTR"
							name="ptr"
							type="number"
							placeholder="Enter PTR"
							step=".01"
							disabled={isViewOnly}
						/>
					</Col>
					{initialValues?.status && (
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
					)}
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Description"
							name="description"
							placeholder="Enter Description"
							disabled={isViewOnly}
						/>
					</Col>
				</Row>

				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Sales Diary Code"
							name="salesDiaryCode"
							placeholder="Enter Sales Diary Code"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="number"
							label="MRP"
							name="mrp"
							placeholder="Enter MRP"
							step=".01"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="number"
							label="Scheme Qty"
							name="schemeQty"
							placeholder="Enter Scheme Qty"
							disabled={isViewOnly}
						/>
					</Col>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="number"
							label="GST Rate"
							name="gstRate"
							placeholder="Enter GST Rate"
							disabled={isViewOnly}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							type="number"
							label="Min. Qty"
							name="minQty"
							placeholder="Enter Min. Qty"
							disabled={isViewOnly}
						/>
					</Col>
					{/* <Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="HSN Code"
							name="HSNCode"
							placeholder="Enter HSN Code"
							disabled={isViewOnly}
						/>
					</Col> */}
					<Col />
					<Col />
					<Col />
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
		"pname",
		"brandId",
		"categoryId",
		"familyId",
		"variant",
		"group_name",
		"uom",
		"ptd",
		"ptr",
		"status",
		"description",
		"salesDiaryCode",
		"mrp",
		"schemeQty",
		"gstRate",
		"minQty",
		"HSNCode",
	],
	validate: values => {
		const errors = {};
		if (!values?.pname || values?.pname?.length === 0) {
			errors.pname = "Required";
		}
		if (!values?.brandId || values?.brandId?.length === 0) {
			errors.brandId = "Required";
		}
		if (!values?.categoryId || values?.categoryId?.length === 0) {
			errors.categoryId = "Required";
		}
		if (!values?.familyId || values?.familyId?.length === 0) {
			errors.familyId = "Required";
		}
		if (!values?.variant || values?.variant?.length === 0) {
			errors.variant = "Required";
		}
		// if (!values?.group_name || values?.group_name?.length === 0) {
		// 	errors.group_name = "Required";
		// }
		if (!values?.uom || values?.uom?.length === 0) {
			errors.uom = "Required";
		}
		// if (!values?.ptd || values?.ptd < 0) {
		// 	errors.ptd = "Required";
		// }
		// if (!values?.ptr || values?.ptr < 0) {
		// 	errors.ptr = "Required";
		// }
		// if (!values?.status || values?.status?.length === 0) {
		// 	errors.status = "Required";
		// }
		// if (!values?.description || values?.description?.length === 0) {
		// 	errors.description = "Required";
		// }
		// if (!values?.salesDiaryCode || values?.salesDiaryCode?.length === 0) {
		// 	errors.salesDiaryCode = "Required";
		// }
		// if (!values?.mrp || values?.mrp < 0) {
		// 	errors.mrp = "Required";
		// }
		return errors;
	},
})(ProductForm);
