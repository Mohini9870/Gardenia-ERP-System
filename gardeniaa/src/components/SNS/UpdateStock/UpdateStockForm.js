import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Navebar from "../../Navbar/Navebar";
import UpdateStock from "./UpdateStock";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./us.css";
import Accordian from "./Accordian";

const data = [
  {
    brand: "TIGER",
    category: "Balm",
    family: "TBO-09ML",
    variant: "Red",
  },
  {
    brand: "TIGER",
    category: "Balm",
    family: "TBO-09ML",
    variant: "White",
  },
  {
    brand: "TIGER",
    category: "Balm",
    family: "TBO-21ML",
    variant: "Red",
  },
  {
    brand: "TIGER",
    category: "Balm",
    family: "TBO-21ML",
    variant: "White",
  },
  {
    brand: "ARIS",
    category: "DPS",
    family: "ARDPS-200ML",
    variant: "Eclips Female",
  },
  {
    brand: "ARIS",
    category: "DPS",
    family: "ARDPS-200ML",
    variant: "Extreme Male",
  },
  {
    brand: "ARIS",
    category: "DPS",
    family: "AREDP-15ML",
    variant: "Extreme Male",
  },
  {
    brand: "ARIS",
    category: "DPS",
    family: "AREDP-15ML",
    variant: "Technique Gold",
  },
  {
    brand: "ARIS",
    category: "DPS",
    family: "AREDP-15ML",
    variant: "Extreme Male",
  },
  {
    brand: "GATSBY",
    category: "BEARD GROOMING",
    family: "BO-50ML",
    variant: "Pure & Natural",
  },
  {
    brand: "GATSBY",
    category: "Air Freshner",
    family: "FNF-300ML",
    variant: "Bakhour",
  },
];

const UpdateStockForm = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("");
  //   };
  // }, []);
  return (
    <>
      <Navebar />{" "}
      <div className="container_data">
        <Button
          className="mt-5"
          variant="success"
          onClick={handleShow}
          style={{ alignContent: "center", marginLeft: "10rem", width: "5rem" }}
        >
          Add
        </Button>{" "}
        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Update Stock</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Distributor </Form.Label>

                    <Form.Select
                      aria-label="Default select example"
                      className="mb-3"
                    >
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Month </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter month"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Year </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter year"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Region </Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              {data.map(({ brand, category, family, variant }) => {
                return (
                  <>
                    <Row className="row">
                      <Col className="col">
                        <Accordian
                          brand={brand}
                          category={category}
                          family={family}
                          variant={variant}
                        />
                        {/* <Accordion flush className="brand">
                          <Accordion.Item eventKey="1">
                            <Accordion.Header
                              style={{
                                backgroundColor: "#fff",
                                border: "none",
                              }}
                            >
                              {data.brand}
                            </Accordion.Header>
                            <Accordion.Body style={{ backgroundColor: "#fff" }}>
                              <Accordion.Item eventKey="2">
                                <Accordion.Header>
                                  {data.category}
                                </Accordion.Header>
                                <Accordion.Body>
                                  <Accordion flush>
                                    <Accordion.Item eventKey="3">
                                      <Accordion.Header>
                                        {data.family}
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        {data.variant}{" "}
                                        <input type="number"></input>
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  </Accordion>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion> */}
                      </Col>
                    </Row>
                  </>
                );
              })}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={handleClose}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {/* <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Update Stock</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Distributor </Form.Label>

                    <Form.Select
                      aria-label="Default select example"
                      className="mb-3"
                    >
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Month </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter month"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Year </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter year"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Region </Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Accordion defaultActiveKey="1" flush>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>{data.brand}</Accordion.Header>
                      <Accordion.Body>
                        <Accordion defaultActiveKey="2">
                          <Accordion.Item eventKey="2">
                            <Accordion.Header>{data.category}</Accordion.Header>
                            <Accordion.Body>
                              <Accordion defaultActiveKey="3">
                                <Accordion.Item eventKey="3">
                                  <Accordion.Header>
                                    {data.family}
                                  </Accordion.Header>
                                  <Accordion.Body>
                                    {data.variant} <input type="number"></input>
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Accordion>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Tiger</Accordion.Header>
                      <Accordion.Body>
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>Category 1</Accordion.Header>
                            <Accordion.Body>
                              <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                  <Accordion.Header>Family</Accordion.Header>
                                  <Accordion.Body>
                                    <input type="number"></input>
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Accordion>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={handleClose}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal> */}
        <UpdateStock />
      </div>
    </>
  );
};

export default UpdateStockForm;

// import React, { useEffect } from "react";
// import { Button, Col, Modal, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Field, getFormMeta, getFormSyncErrors, reduxForm } from "redux-form";
// import { getDropdownList } from "../../../actions/masters";
// import {
//   getUpdatestockDistributorDropdownList,
//   getIsFetchingDropdownList,
//   getIsUpdatingMasterList,
//   getRegionDropdownList,
// } from "../../../reducers/master";
// import { ReduxFormSelectField } from "../../../utils/ReduxFormSelectField";
// import { ReduxFormTextField } from "../../../utils/ReduxFormTextField";

// const UpdateStockForm = ({ title, onCancel, handleSubmit, isViewOnly }) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getDropdownList("distributor"));
//     dispatch(getDropdownList("region"));
//   }, [dispatch]);

//   const isUpdatingMaster = useSelector(getIsUpdatingMasterList);
//   const isFetchingDropdown = useSelector(getIsFetchingDropdownList);
//   const updatestockDistributorOptions = useSelector(
//     getUpdatestockDistributorDropdownList
//   );
//   const regionOptions = useSelector(getRegionDropdownList);
//   const meta = useSelector(getFormMeta("updatestock"));
//   const errors = useSelector(getFormSyncErrors("updatestock"));

//   return (
//     <form onSubmit={handleSubmit}>
//       <Modal.Header closeButton>
//         <Modal.Title>{title}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Row>
//           <Col xs lg="3" className="mb-3">
//             <label className="form-label">Distributor</label>
//             <Field
//               className="form-select"
//               component="select"
//               name="distributor"
//               disabled={isFetchingDropdown || isViewOnly}
//             >
//               <option value="" hidden>
//                 Select Distributor
//               </option>
//               {updatestockDistributorOptions?.map((i) => (
//                 <option key={i?.value} value={i?.value}>
//                   {i?.label}
//                 </option>
//               ))}
//             </Field>
//             {meta?.distributor?.touched && errors?.distributor && (
//               <span style={{ color: "red", marginLeft: "4px" }}>
//                 {errors?.distributor}
//               </span>
//             )}
//           </Col>
//           <Col xs lg="2" className="mb-3">
//             <Field
//               component={ReduxFormTextField}
//               label="Month"
//               name="month"
//               placeholder="Enter Month"
//               disabled={isViewOnly}
//             />
//           </Col>
//           <Col xs lg="2" className="mb-3">
//             <Field
//               component={ReduxFormTextField}
//               label="Year"
//               name="year"
//               placeholder="Enter Year"
//               disabled={isViewOnly}
//             />
//           </Col>
//           <Col className="mb-3">
//             <label className="form-label">Region List</label>
//             <Field
//               component={ReduxFormSelectField}
//               name="regionList"
//               disabled={isFetchingDropdown || isViewOnly}
//               options={regionOptions}
//               isMulti
//             />
//             {meta?.regionList?.touched && errors?.regionList && (
//               <span style={{ color: "red", marginLeft: "4px" }}>
//                 {errors?.regionList}
//               </span>
//             )}
//           </Col>
//         </Row>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onCancel}>
//           Close
//         </Button>
//         <Button
//           className="ms-2"
//           disabled={isUpdatingMaster || isViewOnly}
//           type="submit"
//           variant="success"
//         >
//           Submit
//         </Button>
//       </Modal.Footer>
//     </form>
//   );
// };

// export default reduxForm({
//   form: "updatestock",
//   fields: ["Distributor", "Month", "Year", "region"],
//   validate: (values) => {
//     const errors = {};
//     if (!values?.Distributor || values?.Distributor?.length === 0) {
//       errors.Distributor = "Required";
//     }
//     if (!values?.Month || values?.Month?.length === 0) {
//       errors.Month = "Required";
//     }
//     if (values?.Year?.length === 0) {
//       errors.Year = "Required";
//     }
//     if (values?.region?.length === 0) {
//       errors.region = "Required";
//     }
//     return errors;
//   },
// })(UpdateStockForm);

// // import React, { useEffect } from "react";
// // import { Button, Col, Modal, Row } from "react-bootstrap";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Field, getFormMeta, getFormSyncErrors, reduxForm } from "redux-form";
// // import { getDropdownList } from "../../../actions/masters";
// // import {
// //   getUpdateStockDesignationDropdownList,
// //   getIsFetchingDropdownList,
// //   getIsUpdatingSNSList,
// //   getRegionDropdownList,
// // } from "../../../reducers/master";
// // import { ReduxFormSelectField } from "../../../utils/ReduxFormSelectField";
// // import { ReduxFormTextField } from "../../../utils/ReduxFormTextField";

// // const UpdatestockForm = ({ title, onCancel, handleSubmit, isViewOnly }) => {
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     dispatch(getDropdownList("updatestockdistributor"));
// //     dispatch(getDropdownList("region"));
// //   }, [dispatch]);

// //   const isUpdatingSNS = useSelector(getIsUpdatingSNSList);
// //   const isFetchingDropdown = useSelector(getIsFetchingDropdownList);
// //   const updateStockDistributorOptions = useSelector(
// //     getUpdateStockDesignationDropdownList
// //   );
// //   const regionOptions = useSelector(getRegionDropdownList);
// //   const meta = useSelector(getFormMeta("updatestock"));
// //   const errors = useSelector(getFormSyncErrors("updatestock"));

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <Modal.Header closeButton>
// //         <Modal.Title>{title}</Modal.Title>
// //       </Modal.Header>
// //       <Modal.Body>
// //         <Row>
// //           <Col xs lg="3" className="mb-3">
// //             <label className="form-label">Distributor</label>
// //             <Field
// //               className="form-select"
// //               component="select"
// //               name="distributor"
// //               disabled={isFetchingDropdown || isViewOnly}
// //             >
// //               <option value="" hidden>
// //                 Select Distributor
// //               </option>
// //               {updateStockDistributorOptions?.map((i) => (
// //                 <option key={i?.value} value={i?.value}>
// //                   {i?.label}
// //                 </option>
// //               ))}
// //             </Field>
// //             {meta?.updateStockDistributor?.touched &&
// //               errors?.updateStockDistributor && (
// //                 <span style={{ color: "red", marginLeft: "4px" }}>
// //                   {errors?.updateStockDistributor}
// //                 </span>
// //               )}
// //           </Col>
// //           <Col xs lg="2" className="mb-3">
// //             <Field
// //               component={ReduxFormTextField}
// //               label="Month"
// //               name="month"
// //               placeholder="Enter update stock month"
// //               disabled={isViewOnly}
// //             />
// //           </Col>
// //           <Col xs lg="2" className="mb-3">
// //             <Field
// //               component={ReduxFormTextField}
// //               label="Year"
// //               name="year"
// //               placeholder="Enter update stock year"
// //               disabled={isViewOnly}
// //             />
// //           </Col>
// //           <Col className="mb-3">
// //             <label className="form-label">Region</label>
// //             <Field
// //               component={ReduxFormSelectField}
// //               name="region"
// //               disabled={isFetchingDropdown || isViewOnly}
// //               options={regionOptions}
// //               isMulti
// //             />
// //             {meta?.region?.touched && errors?.region && (
// //               <span style={{ color: "red", marginLeft: "4px" }}>
// //                 {errors?.region}
// //               </span>
// //             )}
// //           </Col>
// //         </Row>
// //       </Modal.Body>
// //       <Modal.Footer>
// //         <Button variant="secondary" onClick={onCancel}>
// //           Close
// //         </Button>
// //         <Button
// //           className="ms-2"
// //           disabled={isUpdatingSNS || isViewOnly}
// //           type="submit"
// //           variant="success"
// //         >
// //           Submit
// //         </Button>
// //       </Modal.Footer>
// //     </form>
// //   );
// // };

// // export default reduxForm({
// //   form: "updatestock",
// //   fields: [
// //     "updatestockDistributor",
// //     "updatestockMonth",
// //     "updatestockYear",
// //     "region",
// //   ],
// //   validate: (values) => {
// //     const errors = {};
// //     if (
// //       !values?.updatestockDistributor ||
// //       values?.updatestockDistributor?.length === 0
// //     ) {
// //       errors.updatestockDistributor = "Required";
// //     }
// //     if (!values?.updatestockMonth || values?.updatestockMonth?.length === 0) {
// //       errors.updatestockMonth = "Required";
// //     }
// //     if (values?.updatestockYear?.length === 0) {
// //       errors.updatestockYear = "Required";
// //     }
// //     if (values?.region?.length === 0) {
// //       errors.region = "Required";
// //     }
// //     return errors;
// //   },
// // })(UpdatestockForm);
