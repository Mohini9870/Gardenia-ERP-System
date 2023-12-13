import React, { useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Field, getFormMeta, getFormSyncErrors, reduxForm } from "redux-form";
import { getDropdownList } from "../../actions/masters";
import {
	getBrandDropdownList,
	getIsFetchingDropdownList,
	getIsUpdatingMasterList,
} from "../../reducers/master";
import { ReduxFormSelectField } from "../../utils/ReduxFormSelectField";
import { ReduxFormTextField } from "../../utils/ReduxFormTextField";

const CategoryForm = ({ title, onCancel, handleSubmit, isViewOnly }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDropdownList("brand"));
	}, [dispatch]);

	const isUpdatingMaster = useSelector(getIsUpdatingMasterList);
	const isFetchingDropdown = useSelector(getIsFetchingDropdownList);
	const brandOptions = useSelector(getBrandDropdownList);
	const meta = useSelector(getFormMeta("category"));
	const errors = useSelector(getFormSyncErrors("category"));

	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
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
						<Field
							component={ReduxFormTextField}
							label="Category Name"
							name="categoryName"
							placeholder="Enter Category Name"
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
	form: "category",
	fields: ["categoryName", "brandId"],
	validate: values => {
		const errors = {};
		if (!values?.categoryName || values?.categoryName?.length === 0) {
			errors.categoryName = "Required";
		}
		if (values?.brandId?.length === 0) {
			errors.brandId = "Required";
		}
		return errors;
	},
})(CategoryForm);
