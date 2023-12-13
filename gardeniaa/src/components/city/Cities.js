import React, { useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import { getMasterList } from "../../actions/masters";
import useMasterLogic from "../../customHooks/useMasterLogic";
import { getCityMasterList, getCityPagination } from "../../reducers/master";
import CustomPagination from "../CustomPagination";
// import Navbar from "../Navbar";
import TableBody from "../TableBody";
import TableOptions from "../TableOptions";
import CityModal, { cityModalName } from "./CityModal";
import Navebar from "../Navbar/Navebar";
import "./city.css";

const masterName = "city";
const tableHeaders = [
  { label: "City Code", value: "cityCode" },
  { label: "City Name", value: "cityName" },
  { label: "District", value: "districtName" },
];

const Cities = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const cityList = useSelector(getCityMasterList);
  const { totalPages, pageSize, totalElements, currentPage } =
    useSelector(getCityPagination);

  const getCityData = useCallback(
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
  } = useMasterLogic(getCityData, cityModalName);

  const renderTableBody = () => {
    if (cityList?.length)
      return cityList?.map((city) => (
        <tr key={city?.id}>
          <td>{city?.cityCode}</td>
          <td>{city?.cityName}</td>
          <td>{city?.district?.districtName}</td>
          <td>
            {/* <button
							className="btn btn-link p-0 m-0"
							type="button"
							onClick={() => handleMasterEdit(city)}
							style={{ textDecoration: "none" }}
						>
							Edit
						</button> */}
            <Dropdown autoClose="true">
              <Dropdown.Toggle variant="success" className="actionDropdown">
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleViewMaster(city)}>
                  View
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleMasterEdit(city)}>
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
          <TableOptions masterName={masterName} modalName={cityModalName} />
          <form onSubmit={handleSubmit(handleSearchSubmit)}>
            <TableBody
              tableHeaders={tableHeaders}
              renderTableBody={renderTableBody}
            />
          </form>
          {cityList?.length ? (
            <CustomPagination
              totalPages={totalPages}
              itemsPerPage={pageSize}
              totalItems={totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          ) : null}
        </div>
        <CityModal />
      </div>
    </>
  );
};

export default reduxForm({
  form: "masterSearch",
})(Cities);
