import React, { useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Field, getFormMeta, getFormSyncErrors, reduxForm } from "redux-form";
import { getDropdownList } from "../../actions/masters";
import {
	getCategoryBrandDropdownList,
	getIsFetchingDropdownList,
	getIsUpdatingMasterList,
} from "../../reducers/master";
import { ReduxFormSelectField } from "../../utils/ReduxFormSelectField";
import { ReduxFormTextField } from "../../utils/ReduxFormTextField";

const FamilyForm = ({ title, onCancel, handleSubmit, isViewOnly }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDropdownList("categoryBrand"));
	}, [dispatch]);

	const isUpdatingMaster = useSelector(getIsUpdatingMasterList);
	const isFetchingDropdown = useSelector(getIsFetchingDropdownList);
	const categoryOptions = useSelector(getCategoryBrandDropdownList);
	const meta = useSelector(getFormMeta("family"));
	const errors = useSelector(getFormSyncErrors("family"));

	return (
		<form onSubmit={handleSubmit}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
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
					<Col className="mb-3">
						<Field
							component={ReduxFormTextField}
							label="Family Name"
							name="familyName"
							placeholder="Enter Family Name"
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
	form: "family",
	fields: ["familyName", "categoryId"],
	validate: values => {
		const errors = {};
		if (!values?.familyName || values?.familyName?.length === 0) {
			errors.familyName = "Required";
		}
		if (values?.categoryId?.length === 0) {
			errors.categoryId = "Required";
		}
		return errors;
	},
})(FamilyForm);
