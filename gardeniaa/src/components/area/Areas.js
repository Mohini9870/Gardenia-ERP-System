import React, { useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import { getMasterList } from "../../actions/masters";
import useMasterLogic from "../../customHooks/useMasterLogic";
import { getAreaMasterList, getAreaPagination } from "../../reducers/master";
import CustomPagination from "../CustomPagination";
import TableBody from "../TableBody";
import TableOptions from "../TableOptions";
import AreaModal, { areaModalName } from "./AreaModal";
import Navebar from "../Navbar/Navebar";
import "./area.css";

const masterName = "area";
const tableHeaders = [
  { label: "Area Code", value: "areaCode" },
  { label: "Area Name", value: "areaName" },
  { label: "City", value: "cityName" },
];

const Areas = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const areaList = useSelector(getAreaMasterList);
  const { totalPages, pageSize, totalElements, currentPage } =
    useSelector(getAreaPagination);

  const getAreaData = useCallback(
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
  } = useMasterLogic(getAreaData, areaModalName);

  const renderTableBody = () => {
    if (areaList?.length)
      return areaList?.map((area) => (
        <tr key={area?.id}>
          <td>{area?.areaCode}</td>
          <td>{area?.areaName}</td>
          <td>{area?.city?.cityName}</td>
          <td>
            {/* <button
							className="btn btn-link p-0 m-0"
							type="button"
							onClick={() => handleMasterEdit(area)}
							style={{ textDecoration: "none" }}
						>
							Edit
						</button> */}
            <Dropdown autoClose="true">
              <Dropdown.Toggle variant="success" className="actionDropdown">
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleViewMaster(area)}>
                  View
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleMasterEdit(area)}>
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
        <div
          className="container justify-content-center mt-5"
          style={{ marginRight: "10rem" }}
        >
          <TableOptions masterName={masterName} modalName={areaModalName} />
          <form onSubmit={handleSubmit(handleSearchSubmit)}>
            <TableBody
              tableHeaders={tableHeaders}
              renderTableBody={renderTableBody}
            />
          </form>
          {areaList?.length ? (
            <CustomPagination
              totalPages={totalPages}
              itemsPerPage={pageSize}
              totalItems={totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          ) : null}
        </div>
        <AreaModal />
      </div>
    </>
  );
};

export default reduxForm({
  form: "masterSearch",
})(Areas);
