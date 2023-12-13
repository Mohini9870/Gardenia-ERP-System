import React, { useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import { getMasterList } from "../../actions/masters";
import useMasterLogic from "../../customHooks/useMasterLogic";
import {
  getHqmasterMasterList,
  getHqmasterPagination,
} from "../../reducers/master";
import CustomPagination from "../CustomPagination";
// import Navbar from "../Navbar";
import TableBody from "../TableBody";
import TableOptions from "../TableOptions";
import HqModal, { hqModalName } from "./HqModal";
import Navebar from "../Navbar/Navebar";
import "./hq.css";

const masterName = "hqmaster";
const tableHeaders = [
  { label: "Hq Code", value: "hqCode" },
  { label: "Hq Name", value: "hqName" },
  { label: "Designation", value: "designation" },
  { label: "Region", value: "regionName" },
];

const Hqs = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const hqList = useSelector(getHqmasterMasterList);
  const { totalPages, pageSize, totalElements, currentPage } = useSelector(
    getHqmasterPagination
  );

  const getHqData = useCallback(
    (pageNum = 1, itemsPerPage = 10, searchValues) => {
      dispatch(
        getMasterList(masterName, {
          page: pageNum,
          pageSize: itemsPerPage,
          ...searchValues,
        })
      );
    },
    [dispatch]
  );

  const {
    handleSearchSubmit,
    handleMasterEdit,
    handlePageChange,
    handleViewMaster,
  } = useMasterLogic(getHqData, hqModalName);

  const renderTableBody = () => {
    if (hqList?.length)
      return hqList?.map((hq) => (
        <tr key={hq?.id}>
          <td>{hq?.hqCode}</td>
          <td>{hq?.hqName}</td>
          <td>{hq?.hqDesignation}</td>
          <td>{hq?.regionList?.map((region) => `${region?.label} `)}</td>
          <td>
            {/* <button
							className="btn btn-link p-0 m-0"
							type="button"
							onClick={() => handleMasterEdit(hq)}
							style={{ textDecoration: "none" }}
						>
							Edit
						</button> */}
            <Dropdown autoClose="true">
              <Dropdown.Toggle variant="success" className="actionDropdown">
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleViewMaster(hq)}>
                  View
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleMasterEdit(hq)}>
                  Edit
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      ));
    return (
      <tr>
        <td colSpan={4} className="text-center">
          No Data Available
        </td>
      </tr>
    );
  };

  return (
    <>
      <Navebar />
      <div className="container_data">
        <div className="container justify-content-center mt-5">
          <TableOptions masterName={masterName} modalName={hqModalName} />
          <form onSubmit={handleSubmit(handleSearchSubmit)}>
            <TableBody
              tableHeaders={tableHeaders}
              renderTableBody={renderTableBody}
            />
          </form>
          {hqList?.length ? (
            <CustomPagination
              totalPages={totalPages}
              itemsPerPage={pageSize}
              totalItems={totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          ) : null}
        </div>
        <HqModal />
      </div>
    </>
  );
};

export default reduxForm({
  form: "masterSearch",
})(Hqs);
