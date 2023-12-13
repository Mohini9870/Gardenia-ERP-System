import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navebar.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../actions/user";
import { getUserDetails } from "../../reducers/user";
import { APPROVED } from "../../utils/masterActions";
import RejectModal from ".././rejectModal/RejectModal";
import { MdLogout } from "react-icons/md";
const Navebar = () => {
  const dispatch = useDispatch();
  const [isExpand, setIsExpand] = useState(false);
  const [isShowMenu1, setIsShowMenu1] = useState(false);
  const [show, setShow] = useState(true);

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
      <div className={isExpand ? "sidebar" : "sidebar close"}>
        <div className="logo-details">
          {/* <i className="bx bxl-c-plus-plus"></i> */}
          {show ? (
            <img
              // src="/images/gardeniaLogo.png"
              src={"/images/gardeniaLogo.png"}
              alt="hi"
              style={{
                height: "75px",
                // marginLeft: "62px",
                marginTop: "1rem",
              }}
            />
          ) : (
            ""
          )}
          <span className="logo_name">
            {" "}
            <img
              // src="/images/gardeniaLogo.png"
              src={"/images/gardeniaLogo.png"}
              alt="hi"
              style={{
                height: "75px",
                marginLeft: "62px",
                marginTop: "1rem",
              }}
            />
          </span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">
              {/* <FaBalanceScale
                className="bx bx-grid-alt"
                style={{ color: "#669999", marginLeft: "22px" }}
              /> */}
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/">
                  Dashboard
                </Link>
              </li>
            </ul>
          </li>
          <li className={isShowMenu1 ? "showMenu" : ""}>
            <div className="iocn-link">
              <Link to="/">
                <i class="bx bxs-buildings"></i>
                <span className="link_name">Master</span>
              </Link>
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() => setIsShowMenu1(!isShowMenu1)}
              ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="/">
                  Master
                </Link>
              </li>
              {isRoleMis && (
                <>
                  <li>
                    <Link to="/countries">Country Master</Link>
                  </li>
                  <li>
                    <Link to="/states">State Master</Link>
                  </li>
                  <li>
                    <Link to="/regions">Region Master </Link>
                  </li>
                  <li>
                    <Link to="/districts">District Master</Link>
                  </li>
                  <li>
                    <Link to="/cities">City Master</Link>
                  </li>
                  <li>
                    <Link to="/areas">Area Master</Link>
                  </li>
                  <li>
                    <Link to="/hqs">HQ Master</Link>
                  </li>
                </>
              )}
              {(isRoleMis || isRoleProduct || isRoleProductApprover) && (
                <>
                  <li>
                    <Link to="/brands">Brand Master</Link>
                  </li>
                  <li>
                    <Link to="/categories">Category Master</Link>
                  </li>
                  <li>
                    <Link to="/families">Family Master</Link>
                  </li>
                  <li>
                    <Link to={`/products/${APPROVED}`}>Product Master</Link>
                  </li>
                </>
              )}
              {(isRoleRsm || isRoleMis) && (
                <>
                  <li>
                    <Link to={`/distributors/${APPROVED}`}>
                      Distributor Master
                    </Link>
                  </li>
                  <li>
                    <Link to={`/users/${APPROVED}`}>User Master</Link>
                  </li>
                </>
              )}
              {isRoleDistApprover && (
                <li>
                  <Link to={`/distributors/${APPROVED}`}>
                    Distributor Master
                  </Link>
                </li>
              )}
              {isRoleUser && (
                <li>
                  <Link to={`/users/${APPROVED}`}> User Master</Link>
                </li>
              )}
            </ul>
          </li>
          <li className={isShowMenu1 ? "showMenu" : ""}>
            <div className="iocn-link">
              <Link to="/">
                <i class="bx bxs-briefcase-alt-2"></i>{" "}
                <span className="link_name">SNS</span>
              </Link>

              <i
                className="bx bxs-chevron-down arrow"
                onClick={() => setIsShowMenu1(!isShowMenu1)}
              ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="/">
                  SNS{" "}
                </Link>
              </li>
              {isRoleMis && (
                <>
                  <li>
                    <Link to="/updatestockform">Update Stock</Link>
                  </li>
                  <li>
                    <Link to="/updatestockinvoiceform">
                      Update Stock Invoice Status
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </li>
        </ul>
      </div>
      <RejectModal />
      <section className="home-section">
        <div className="home-content">
          <i
            className="bx bx-menu"
            onClick={() => {
              setIsExpand(!isExpand);
              setShow(!show);
            }}
          ></i>
          <div className="me-5">
            <button
              className="btn btn-link "
              onClick={() => dispatch(userLogout())}
              style={{ marginLeft: "65rem" }}
            >
              <MdLogout style={{ height: 30, width: 30, color: "black" }} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navebar;
