import React, { useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Field, getFormMeta, getFormSyncErrors, reduxForm } from "redux-form";
import { getDropdownList } from "../actions/masters";
import {
  getHqDesignationDropdownList,
  getIsFetchingDropdownList,
  getIsUpdatingMasterList,
  getRegionDropdownList,
} from "../reducers/master";
import { ReduxFormSelectField } from "../utils/ReduxFormSelectField";
import { ReduxFormTextField } from "../utils/ReduxFormTextField";

const Hqform = ({ title, onCancel, handleSubmit, isViewOnly }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDropdownList("hqdesignation"));
    dispatch(getDropdownList("region"));
    dispatch(getDropdownList("parentHq"));
  }, [dispatch]);

  const isUpdatingMaster = useSelector(getIsUpdatingMasterList);
  const isFetchingDropdown = useSelector(getIsFetchingDropdownList);
  const hqDesignationOptions = useSelector(getHqDesignationDropdownList);
  const regionOptions = useSelector(getRegionDropdownList);
  const meta = useSelector(getFormMeta("hq"));
  const errors = useSelector(getFormSyncErrors("hq"));

  return (
    <form onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs lg="3" className="mb-3">
            <label className="form-label">Designation</label>
            <Field
              className="form-select"
              component="select"
              name="hqDesignation"
              disabled={isFetchingDropdown || isViewOnly}
            >
              <option value="" hidden>
                Select Designation
              </option>
              {hqDesignationOptions?.map((i) => (
                <option key={i?.value} value={i?.value}>
                  {i?.label}
                </option>
              ))}
            </Field>
            {meta?.hqDesignation?.touched && errors?.hqDesignation && (
              <span style={{ color: "red", marginLeft: "4px" }}>
                {errors?.hqDesignation}
              </span>
            )}
          </Col>
          <Col xs lg="2" className="mb-3">
            <Field
              component={ReduxFormTextField}
              label="Hq Code"
              name="hqCode"
              placeholder="Enter Hq Code"
              disabled={isViewOnly}
            />
          </Col>
          <Col xs lg="2" className="mb-3">
            <Field
              component={ReduxFormTextField}
              label="Hq Name"
              name="hqName"
              placeholder="Enter Hq Name"
              disabled={isViewOnly}
            />
          </Col>
          <Col className="mb-3">
            <label className="form-label">Region List</label>
            <Field
              component={ReduxFormSelectField}
              name="regionList"
              disabled={isFetchingDropdown || isViewOnly}
              options={regionOptions}
              isMulti
            />
            {meta?.regionList?.touched && errors?.regionList && (
              <span style={{ color: "red", marginLeft: "4px" }}>
                {errors?.regionList}
              </span>
            )}
          </Col>
          {/* <Col className="mb-3">
						<label className="form-label">Parent HQ</label>
						<Field
							className="form-select"
							component={ReduxFormSelectField}
							name="parentHqId"
							options={parentHqOptions}
							disabled={isFetchingDropdown || !hqDesignation}
							placeholder="Select Parent HQ"
						/>
						{meta?.parentHqId?.touched && errors?.parentHqId && (
							<span style={{ color: "red", marginLeft: "4px" }}>
								{errors?.parentHqId}
							</span>
						)}
					</Col> */}
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
  form: "hq",
  fields: ["hqName", "hqCode", "hqDesignation", "regionId"],
  validate: (values) => {
    const errors = {};
    if (!values?.hqName || values?.hqName?.length === 0) {
      errors.hqName = "Required";
    }
    if (!values?.hqCode || values?.hqCode?.length === 0) {
      errors.hqCode = "Required";
    }
    if (values?.hqDesignation?.length === 0) {
      errors.hqDesignation = "Required";
    }
    if (values?.regionList?.length === 0) {
      errors.regionList = "Required";
    }
    return errors;
  },
})(Hqform);
