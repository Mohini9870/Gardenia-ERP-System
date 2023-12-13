import React, { useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { reduxForm } from "redux-form";
import { approveMaster, getMasterList } from "../../actions/masters";
import { openModal } from "../../actions/modal";
import useMasterLogic from "../../customHooks/useMasterLogic";
import { getUserMasterList, getUserPagination } from "../../reducers/master";
import { getUserDetails } from "../../reducers/user";
import {
  APPROVED,
  EDIT,
  PENDING,
  REAPPROVE,
  REJECTED,
} from "../../utils/masterActions";
import CustomPagination from "../CustomPagination";
// import Navbar from "../Navbar";
import { rejectModalName } from "../rejectModal/RejectModal";
import Statuses from "../Statuses";
import TableBody from "../TableBody";
import TableOptions from "../TableOptions";
import UserModal, { userModalName } from "./UserModal";
import Navebar from "../Navbar/Navebar";
import "./users.css";

const masterName = "user";

const Users = ({ handleSubmit }) => {
  const { userStatus } = useParams();
  const dispatch = useDispatch();

  const tableHeaders = [
    { label: "Full Name", value: "userName" },
    { label: "Employee Code", value: "employeeCode" },
    { label: "Reporting To", value: "reportingTo" },
    { label: "Region", value: "regionName" },
    { label: "City", value: "cityName" },
    { label: "HQ", value: "hqName" },
    { label: "Role", value: "role" },
  ];

  if (userStatus === REJECTED) {
    tableHeaders.push({ label: "Reject Reason", value: "rejectReason" });
  }

  const userList = useSelector(getUserMasterList);
  const { isRoleUser, isRoleRsm } = useSelector(getUserDetails);
  const { totalPages, pageSize, totalElements, currentPage } =
    useSelector(getUserPagination);

  const getUsersData = useCallback(
    (pageNum = 1, itemsPerPage = 10, searchValues) => {
      dispatch(
        getMasterList(masterName, {
          page: pageNum,
          pageSize: itemsPerPage,
          userStatus,
          ...searchValues,
        })
      );
    },
    [dispatch, userStatus]
  );

  const {
    handleSearchSubmit,
    handleMasterEdit,
    handlePageChange,
    handleViewMaster,
  } = useMasterLogic(getUsersData, userModalName);

  const renderActions = (user) => {
    if (userStatus === APPROVED) {
      return isRoleUser ? (
        // <button
        // 	className="btn btn-link p-0 m-0"
        // 	type="button"
        // 	onClick={() =>
        // 		handleMasterEdit({ userStatus, action: EDIT, ...user })
        // 	}
        // 	style={{ textDecoration: "none" }}
        // >
        // 	Edit
        // </button>
        <Dropdown autoClose="true">
          <Dropdown.Toggle variant="success" className="actionDropdown">
            Actions
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => handleViewMaster({ userStatus, ...user })}
            >
              View
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                handleMasterEdit({
                  userStatus,
                  action: EDIT,
                  ...user,
                })
              }
            >
              Edit
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : isRoleRsm ? (
        <Dropdown autoClose="true">
          <Dropdown.Toggle variant="success" className="actionDropdown">
            Actions
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => handleViewMaster({ userStatus, ...user })}
            >
              View
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : null;
    } else if (userStatus === PENDING) {
      return isRoleUser ? (
        // {isRoleUser && (
        // 			<button
        // 				className="btn btn-link p-0 m-0"
        // 				type="button"
        // 				onClick={() => dispatch(approveMaster(masterName, user?.id))}
        // 				style={{ textDecoration: "none", color: "green" }}
        // 			>
        // 				Approve
        // 			</button>
        // 		)}
        // 		{isRoleUser && (
        // 			<button
        // 				className="btn btn-link p-0 m-0 ms-3"
        // 				type="button"
        // 				onClick={() =>
        // 					dispatch(
        // 						openModal(rejectModalName, { masterName, masterId: user?.id })
        // 					)
        // 				}
        // 				style={{ textDecoration: "none", color: "red" }}
        // 			>
        // 				Reject
        // 			</button>
        // 		)}
        // 		{(isRoleUser || isRoleRsm) && (
        // 			<button
        // 				className="btn btn-link p-0 m-0 ms-3"
        // 				type="button"
        // 				onClick={() =>
        // 					handleMasterEdit({ userStatus, action: EDIT, ...user })
        // 				}
        // 				style={{ textDecoration: "none" }}
        // 			>
        // 				Edit
        // 			</button>
        // 		)}
        <Dropdown autoClose="true">
          <Dropdown.Toggle variant="success" className="actionDropdown">
            Actions
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => handleViewMaster({ userStatus, ...user })}
            >
              View
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                handleMasterEdit({
                  userStatus,
                  action: EDIT,
                  ...user,
                })
              }
            >
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              style={{ textDecoration: "none", color: "green" }}
              onClick={() => dispatch(approveMaster(masterName, user?.id))}
            >
              Approve
            </Dropdown.Item>
            <Dropdown.Item
              style={{ textDecoration: "none", color: "red" }}
              onClick={() =>
                dispatch(
                  openModal(rejectModalName, {
                    masterName,
                    masterId: user?.id,
                  })
                )
              }
            >
              Reject
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : isRoleRsm ? (
        <Dropdown autoClose="true">
          <Dropdown.Toggle variant="success" className="actionDropdown">
            Actions
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => handleViewMaster({ userStatus, ...user })}
            >
              View
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                handleMasterEdit({
                  userStatus,
                  action: EDIT,
                  ...user,
                })
              }
            >
              Edit
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : null;
    }
    return isRoleRsm || isRoleUser ? (
      <Dropdown autoClose="true">
        <Dropdown.Toggle variant="success" className="actionDropdown">
          Actions
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => handleViewMaster({ userStatus, ...user })}
          >
            View
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() =>
              handleMasterEdit({
                userStatus,
                ...user,
                action: REAPPROVE,
              })
            }
          >
            Re-Submit
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ) : null;
    // {/* <button
    // 	className="btn btn-link p-0 m-0"
    // 	type="button"
    // 	onClick={() =>
    // 		handleMasterEdit({
    // 			userStatus,
    // 			...user,
    // 			action: REAPPROVE,
    // 		})
    // 	}
    // 	style={{ textDecoration: "none", color: "green" }}
    // >
    // 	Re-approve
    // </button> */}
  };

  const renderTableBody = () => {
    if (userList?.length)
      return userList?.map((user) => (
        <tr key={user?.id}>
          <td>{user?.fullName}</td>
          <td>{user?.empCode}</td>
          <td>{user?.reportingTo}</td>
          <td>{user?.region?.regionName}</td>
          <td>{user?.city?.cityName}</td>
          <td>{user?.hq?.hqName}</td>
          <td>{user?.role}</td>
          {userStatus === REJECTED && <td>{user?.rejectReason}</td>}
          <td style={{ width: 230 }}>{renderActions(user)}</td>
        </tr>
      ));

    return (
      <tr>
        <td colSpan={tableHeaders?.length + 1} className="text-center">
          No Data Available
        </td>
      </tr>
    );
  };

  const addUser = () => {
    dispatch(openModal(userModalName, { userStatus }));
  };

  return (
    <>
      <Navebar />
      <div className="container_data">
        <div className="container  justify-content-center mt-5  ms-2">
          <TableOptions
            masterName={masterName}
            modalName={userModalName}
            addMaster={addUser}
            showAdd={isRoleUser || isRoleRsm}
            showImport={isRoleUser}
            showExport={isRoleUser}
          />
          <Statuses masterName={masterName} status={userStatus} />
          <form onSubmit={handleSubmit(handleSearchSubmit)}>
            <TableBody
              tableHeaders={tableHeaders}
              renderTableBody={renderTableBody}
            />
          </form>
          {userList?.length ? (
            <CustomPagination
              totalPages={totalPages}
              itemsPerPage={pageSize}
              totalItems={totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          ) : null}
        </div>
        <UserModal />
      </div>
    </>
  );
};

export default reduxForm({
  form: "masterSearch",
})(Users);
