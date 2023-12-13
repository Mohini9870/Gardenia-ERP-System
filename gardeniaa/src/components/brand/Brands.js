import React, { useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import { getMasterList } from "../../actions/masters";
import useMasterLogic from "../../customHooks/useMasterLogic";
import { getBrandMasterList, getBrandPagination } from "../../reducers/master";
import CustomPagination from "../CustomPagination";
// import Navbar from "../Navbar";
import TableBody from "../TableBody";
import TableOptions from "../TableOptions";
import BrandModal, { brandModalName } from "./BrandModal";
import Navebar from "../Navbar/Navebar";

const masterName = "brand";
const tableHeaders = [{ label: "Brand Name", value: "brandName" }];

const Brands = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const brandList = useSelector(getBrandMasterList);
  const { totalPages, pageSize, totalElements, currentPage } =
    useSelector(getBrandPagination);

  const getBrandData = useCallback(
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
  } = useMasterLogic(getBrandData, brandModalName);

  const renderTableBody = () => {
    if (brandList?.length)
      return brandList?.map((brand) => (
        
        <tr key={brand?.id}>
          <td>{brand?.brandName}</td>
          <td>

            <Dropdown autoClose="true">
              <Dropdown.Toggle variant="success" className="actionDropdown">
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleViewMaster(brand)}>
                  View
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleMasterEdit(brand)}>
                  Edit
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      ));
    return (
      <tr>
        <td colSpan={3} className="text-center">
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
          <TableOptions masterName={masterName} modalName={brandModalName} />
          <form onSubmit={handleSubmit(handleSearchSubmit)}>
            <TableBody
              tableHeaders={tableHeaders}
              renderTableBody={renderTableBody}
            />
          </form>
          {brandList?.length ? (
            <CustomPagination
              totalPages={totalPages}
              itemsPerPage={pageSize}
              totalItems={totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          ) : null}
        </div>
        <BrandModal />
      </div>
    </>
  );
};

export default reduxForm({
  form: "masterSearch",
})(Brands);
