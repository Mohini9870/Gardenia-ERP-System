import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Navebar from "../../Navbar/Navebar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../UpdateStock/us.css";
import UpdateStockIvoice from "./UpdateStockInvoice";

const UpdateStockInvoiceForm = () => {
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
            <Modal.Title>Update Stock Invoice Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Invoice Number </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter invoice number"
                      autoFocus
                    />
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
              {/* {data.map(({ brand, category, family, variant }) => {
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
                      </Col>
                    </Row>
                  </>
                );
              })} */}
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
        <UpdateStockIvoice />
      </div>
    </>
  );
};

export default UpdateStockInvoiceForm;
