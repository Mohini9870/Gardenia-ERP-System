import { default as React, useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdLogout,
  MdMenu,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../actions/user";
import { getUserDetails } from "../reducers/user";
import { APPROVED } from "../utils/masterActions";
import RejectModal from "./rejectModal/RejectModal";

const linkStyle = {
  display: "flex",
  flex: 1,
  textDecoration: "none",
};

const OffCanvas = () => {
  const [show, setShow] = useState(false); //offcanvas state
  const [open, setOpen] = useState(true); //dropdown state
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const {
    isRoleMis,
    isRoleRsm,
    isRoleDistApprover,
    isRoleUser,
    isRoleProductApprover,
    isRoleProduct,
  } = useSelector(getUserDetails);

  return (
    <>
      <button onClick={toggleShow} className="me-2 btn btn-link">
        <MdMenu style={{ height: 35, width: 35, color: "black" }} />
      </button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={true}
        backdrop={false}
        className="nav-offcanvas"
      >
        <div className="flex-grow-1 bg-secondary bg-opacity-25">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <img
                src="/images/gardeniaLogo.png"
                alt="hi"
                style={{ height: "135px", marginLeft: "80px  " }}
              ></img>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <ul className="flex-grow-1 list-group list-group-flush mt-3 ">
              <li
                className="pt-3 pb-3 list-group-item list-group-item-secondary ps-5"
                style={{
                  borderTop: "1px solid #D3D3D3",
                  borderBottom: "1px solid #D3D3D3",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              >
                <Link
                  to="/dashboard"
                  className="pt-2 pb-2 list-group-item-secondary"
                  style={linkStyle}
                >
                  Dashboard
                </Link>
              </li>
              <button
                className="pt-3 pb-3 list-group-item list-group-item-secondary ps-5"
                style={{
                  border: "none",
                  textAlign: "left",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                Masters
                {open ? (
                  <MdArrowDropUp
                    style={{
                      height: 25,
                      width: 25,
                      color: "black",
                      marginBottom: "2px",
                      marginLeft: "10px",
                    }}
                  />
                ) : (
                  <MdArrowDropDown
                    style={{
                      height: 25,
                      width: 25,
                      color: "black",
                      marginBottom: "4px",
                      marginLeft: "10px",
                    }}
                  />
                )}
              </button>
              <Collapse in={open}>
                <div id="example-collapse-text">
                  {isRoleMis && (
                    <>
                      <Link
                        to="/countries"
                        className="pt-2 pb-2 list-group-item-secondary ps-5"
                        style={linkStyle}
                      >
                        Country Master
                      </Link>
                      <Link
                        to="/states"
                        className="pt-3 pb-2 list-group-item-secondary ps-5"
                        style={linkStyle}
                      >
                        State Master
                      </Link>
                      <Link
                        to="/regions"
                        className="pt-3 pb-2 list-group-item-secondary ps-5"
                        style={linkStyle}
                      >
                        Region Master
                      </Link>
                      <Link
                        to="/districts"
                        className="pt-3 pb-2 list-group-item-secondary ps-5"
                        style={linkStyle}
                      >
                        District Master
                      </Link>
                      <Link
                        to="/cities"
                        className="pt-3 pb-2 list-group-item-secondary ps-5"
                        style={linkStyle}
                      >
                        City Master
                      </Link>
                      <Link
                        to="/areas"
                        className="pt-3 pb-2 list-group-item-secondary ps-5"
                        style={linkStyle}
                      >
                        Area Master
                      </Link>

                      <Link
                        to="/hqs"
                        className="pt-3 pb-3 list-group-item-secondary ps-5"
                        style={linkStyle}
                      >
                        HQ Master
                      </Link>
                    </>
                  )}
                  {(isRoleMis || isRoleProduct || isRoleProductApprover) && (
                    <>
                      <Link
                        to="/brands"
                        className="pt-3 pb-2 list-group-item-secondary ps-5"
                        style={linkStyle}
                      >
                        Brand Master
                      </Link>
                      <Link
                        to="/categories"
                        className="pt-3 pb-2 list-group-item-secondary ps-5"
                        style={linkStyle}
                      >
                        Category Master
                      </Link>
                      <Link
                        to="/families"
                        className="pt-3 pb-2 list-group-item-secondary ps-5"
                        style={linkStyle}
                      >
                        Family Master
                      </Link>
                      <Link
                        to={`/products/${APPROVED}`}
                        className="pt-3 pb-2 list-group-item-secondary ps-5"
                        style={linkStyle}
                      >
                        Product Master
                      </Link>
                    </>
                  )}
                  {(isRoleRsm || isRoleMis) && (
                    <>
                      <Link
                        to={`/distributors/${APPROVED}`}
                        className="pt-3 pb-2 list-group-item-secondary ps-5"
                        style={linkStyle}
                      >
                        Distributor Master
                      </Link>
                      <Link
                        to={`/users/${APPROVED}`}
                        className="pt-3 pb-3 list-group-item-secondary ps-5"
                        style={linkStyle}
                      >
                        User Master
                      </Link>
                    </>
                  )}
                  {isRoleDistApprover && (
                    <Link
                      to={`/distributors/${APPROVED}`}
                      className="pt-3 pb-2 list-group-item-secondary ps-5"
                      style={linkStyle}
                    >
                      Distributor Master
                    </Link>
                  )}
                  {isRoleUser && (
                    <Link
                      to={`/users/${APPROVED}`}
                      className="pt-3 pb-3 list-group-item-secondary ps-5"
                      style={linkStyle}
                    >
                      User Master
                    </Link>
                  )}
                </div>
              </Collapse>
            </ul>
          </Offcanvas.Body>
        </div>
      </Offcanvas>
      <RejectModal />
    </>
  );
};

function Navbar() {
  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary bg-opacity-25">
      <div className="container-fluid">
        <OffCanvas />
      </div>
      <div className="me-5">
        <button className="btn btn-link" onClick={() => dispatch(userLogout())}>
          <MdLogout style={{ height: 30, width: 30, color: "black" }} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
