import React, { useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import { getMasterList } from "../../actions/masters";
import useMasterLogic from "../../customHooks/useMasterLogic";
import {
  getDistrictMasterList,
  getDistrictPagination,
} from "../../reducers/master";
import CustomPagination from "../CustomPagination";
// import Navbar from "../Navbar";
import TableBody from "../TableBody";
import TableOptions from "../TableOptions";
import DistrictModal, { districtModalName } from "./DistrictModal";
import Navebar from "../Navbar/Navebar";
import "./district.css";

const masterName = "district";
const tableHeaders = [
  { label: "District Code", value: "districtCode" },
  { label: "District Name", value: "districtName" },
  { label: "Region", value: "regionName" },
];

const Districts = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const districtList = useSelector(getDistrictMasterList);
  const { totalPages, pageSize, totalElements, currentPage } = useSelector(
    getDistrictPagination
  );

  const getDistrictData = useCallback(
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
  } = useMasterLogic(getDistrictData, districtModalName);

  const renderTableBody = () => {
    if (districtList?.length)
      return districtList?.map((district) => (
        <tr key={district?.id}>
          <td>{district?.districtCode}</td>
          <td>{district?.districtName}</td>
          <td>{district?.region?.regionName}</td>
          <td>
            {/* <button
							className="btn btn-link p-0 m-0"
							type="button"
							onClick={() => handleMasterEdit(district)}
							style={{ textDecoration: "none" }}
						>
							Edit
						</button> */}
            <Dropdown autoClose="true">
              <Dropdown.Toggle variant="success" className="actionDropdown">
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleViewMaster(district)}>
                  View
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleMasterEdit(district)}>
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
      <div className="container-data">
        <div className="container justify-content-center mt-5">
          <TableOptions masterName={masterName} modalName={districtModalName} />
          <form onSubmit={handleSubmit(handleSearchSubmit)}>
            <TableBody
              tableHeaders={tableHeaders}
              renderTableBody={renderTableBody}
            />
          </form>
          {districtList?.length ? (
            <CustomPagination
              totalPages={totalPages}
              itemsPerPage={pageSize}
              totalItems={totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          ) : null}
        </div>
        <DistrictModal />
      </div>
    </>
  );
};

export default reduxForm({
  form: "masterSearch",
})(Districts);
