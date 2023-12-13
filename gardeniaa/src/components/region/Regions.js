import React, { useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import { getMasterList } from "../../actions/masters";
import useMasterLogic from "../../customHooks/useMasterLogic";
import {
  getRegionMasterList,
  getRegionPagination,
} from "../../reducers/master";
import CustomPagination from "../CustomPagination";
// import Navbar from "../Navbar";
import TableBody from "../TableBody";
import TableOptions from "../TableOptions";
import RegionModal, { regionModalName } from "./RegionModal";
import Navebar from "../Navbar/Navebar";
import "./region.css";

const masterName = "region";
const tableHeaders = [
  { label: "Region Code", value: "regionCode" },
  { label: "Region Name", value: "regionName" },
  { label: "State", value: "stateName" },
];

const Regions = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const regionList = useSelector(getRegionMasterList);
  const { totalPages, pageSize, totalElements, currentPage } =
    useSelector(getRegionPagination);

  const getRegionData = useCallback(
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
  } = useMasterLogic(getRegionData, regionModalName);

  const renderTableBody = () => {
    if (regionList?.length)
      return regionList?.map((region) => (
        <tr key={region?.id}>
          <td>{region?.regionCode}</td>
          <td>{region?.regionName}</td>
          <td>{region?.stateList?.map((state) => `${state?.label} `)}</td>
          <td>
            {/* <button
							className="btn btn-link p-0 m-0"
							type="button"
							onClick={() => handleMasterEdit(region)}
							style={{ textDecoration: "none" }}
						>
							Edit
						</button> */}
            <Dropdown autoClose="true">
              <Dropdown.Toggle variant="success" className="actionDropdown">
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleViewMaster(region)}>
                  View
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleMasterEdit(region)}>
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
          <TableOptions masterName={masterName} modalName={regionModalName} />
          <form onSubmit={handleSubmit(handleSearchSubmit)}>
            <TableBody
              tableHeaders={tableHeaders}
              renderTableBody={renderTableBody}
            />
          </form>
          {regionList?.length ? (
            <CustomPagination
              totalPages={totalPages}
              itemsPerPage={pageSize}
              totalItems={totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          ) : null}
        </div>
        <RegionModal />
      </div>
    </>
  );
};

export default reduxForm({
  form: "masterSearch",
})(Regions);
