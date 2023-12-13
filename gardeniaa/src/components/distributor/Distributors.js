import React, { useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { reduxForm } from "redux-form";
import { approveMaster, getMasterList } from "../../actions/masters";
import { openModal } from "../../actions/modal";
import useMasterLogic from "../../customHooks/useMasterLogic";
import {
  getDistributorMasterList,
  getDistributorPagination,
} from "../../reducers/master";
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

import DistributorModal, { distributorModalName } from "./DistributorModal";
import Navebar from "../Navbar/Navebar";
import "./distributor.css";

const masterName = "distributor";

const Distributors = ({ handleSubmit }) => {
  const { distributorStatus } = useParams();
  const dispatch = useDispatch();

  const tableHeaders = [
    { label: "Distributor Code", value: "distributorCode" },
    { label: "Distributor Name", value: "distributorName" },
    { label: "Distributor Type", value: "distributorType" },
    { label: "State", value: "stateName" },
    { label: "Region", value: "regionName" },
    { label: "District", value: "districtName" },
    { label: "City", value: "cityName" },
    { label: "Brand", value: "brandName" },
  ];

  if (distributorStatus === REJECTED) {
    tableHeaders.push({ label: "Reject Reason", value: "rejectReason" });
  }

  const distributorList = useSelector(getDistributorMasterList);
  const { isRoleMis, isRoleDistApprover, isRoleRsm } =
    useSelector(getUserDetails);
  const { totalPages, pageSize, totalElements, currentPage } = useSelector(
    getDistributorPagination
  );

  const getDistributorsData = useCallback(
    (pageNum = 1, itemsPerPage = 10, searchValues) => {
      dispatch(
        getMasterList(masterName, {
          page: pageNum,
          pageSize: itemsPerPage,
          distributorStatus,
          ...searchValues,
        })
      );
    },
    [dispatch, distributorStatus]
  );

  const {
    handleSearchSubmit,
    handleMasterEdit,
    handlePageChange,
    handleViewMaster,
  } = useMasterLogic(getDistributorsData, distributorModalName);

  const renderActions = (distributor) => {
    if (distributorStatus === APPROVED) {
      return (
        <>
          {isRoleMis && (
            <Dropdown autoClose="true">
              <Dropdown.Toggle variant="success" className="actionDropdown">
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    handleViewMaster({ distributorStatus, ...distributor })
                  }
                >
                  View
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    handleMasterEdit({
                      distributorStatus,
                      action: EDIT,
                      ...distributor,
                    })
                  }
                >
                  Edit
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          {(isRoleDistApprover || isRoleRsm) && (
            <Dropdown autoClose="true">
              <Dropdown.Toggle variant="success" className="actionDropdown">
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    handleViewMaster({ distributorStatus, ...distributor })
                  }
                >
                  View
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </>
      );
    } else if (distributorStatus === PENDING) {
      return (
        <>
          {isRoleMis && (
            <>
              <Dropdown autoClose="true">
                <Dropdown.Toggle variant="success" className="actionDropdown">
                  Actions
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      handleViewMaster({ distributorStatus, ...distributor })
                    }
                  >
                    View
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      handleMasterEdit({
                        distributorStatus,
                        action: EDIT,
                        ...distributor,
                      })
                    }
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={{ textDecoration: "none", color: "green" }}
                    onClick={() =>
                      dispatch(approveMaster(masterName, distributor?.id))
                    }
                  >
                    Approve
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={{ textDecoration: "none", color: "red" }}
                    onClick={() =>
                      dispatch(
                        openModal(rejectModalName, {
                          masterName,
                          masterId: distributor?.id,
                        })
                      )
                    }
                  >
                    Reject
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}
          {isRoleDistApprover && (
            <Dropdown autoClose="true">
              <Dropdown.Toggle variant="success" className="actionDropdown">
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    handleViewMaster({ distributorStatus, ...distributor })
                  }
                >
                  View
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ textDecoration: "none", color: "green" }}
                  onClick={() =>
                    dispatch(approveMaster(masterName, distributor?.id))
                  }
                >
                  Approve
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ textDecoration: "none", color: "red" }}
                  onClick={() =>
                    dispatch(
                      openModal(rejectModalName, {
                        masterName,
                        masterId: distributor?.id,
                      })
                    )
                  }
                >
                  Reject
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          {isRoleRsm && (
            <Dropdown autoClose="true">
              <Dropdown.Toggle variant="success" className="actionDropdown">
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    handleViewMaster({ distributorStatus, ...distributor })
                  }
                >
                  View
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    handleMasterEdit({
                      distributorStatus,
                      action: EDIT,
                      ...distributor,
                    })
                  }
                >
                  Edit
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </>
      );
    }
    return (
      <>
        {isRoleRsm && (
          <Dropdown autoClose="true">
            <Dropdown.Toggle variant="success" className="actionDropdown">
              Actions
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() =>
                  handleViewMaster({ distributorStatus, ...distributor })
                }
              >
                View
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  handleMasterEdit({
                    distributorStatus,
                    ...distributor,
                    action: REAPPROVE,
                  })
                }
              >
                Re-Submit
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {(isRoleDistApprover || isRoleMis) && (
          <Dropdown autoClose="true">
            <Dropdown.Toggle variant="success" className="actionDropdown">
              Actions
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() =>
                  handleViewMaster({ distributorStatus, ...distributor })
                }
              >
                View
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </>
    );
  };

  const renderTableBody = () => {
    if (distributorList?.length)
      return distributorList?.map((distributor) => (
        <tr key={distributor?.id}>
          <td>{distributor?.distributorCode}</td>
          <td>{distributor?.distributorName}</td>
          <td>{distributor?.distributorType}</td>
          <td>{distributor?.state?.stateName}</td>
          <td>{distributor?.region?.regionName}</td>
          <td>{distributor?.district?.districtName}</td>
          <td>{distributor?.city?.cityName}</td>
          <td style={{ width: 230 }}>
            {distributor?.brandList?.map((brand) => `${brand?.label} `)}
          </td>
          {distributorStatus === REJECTED && (
            <td>{distributor?.rejectReason}</td>
          )}
          <td style={{ width: 230 }}>{renderActions(distributor)}</td>
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

  const addDistributor = () => {
    dispatch(openModal(distributorModalName, { distributorStatus }));
  };

  return (
    <>
      <Navebar />
      <div className="container_data">
        <div className="container justify-content-center mt-5">
          <TableOptions
            masterName={masterName}
            modalName={distributorModalName}
            addMaster={addDistributor}
            showImport={isRoleMis}
            showExport={isRoleMis}
          />
          <Statuses masterName={masterName} status={distributorStatus} />
          <form onSubmit={handleSubmit(handleSearchSubmit)}>
            <TableBody
              tableHeaders={tableHeaders}
              renderTableBody={renderTableBody}
            />
          </form>
          {distributorList?.length ? (
            <CustomPagination
              totalPages={totalPages}
              itemsPerPage={pageSize}
              totalItems={totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          ) : null}
        </div>
      </div>
      <DistributorModal />
    </>
  );
};

export default reduxForm({
  form: "masterSearch",
})(Distributors);
