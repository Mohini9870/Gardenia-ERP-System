import React, { useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import { getMasterList } from "../../actions/masters";
import useMasterLogic from "../../customHooks/useMasterLogic";
import {
  getCategoryMasterList,
  getCategoryPagination,
} from "../../reducers/master";
import CustomPagination from "../CustomPagination";
// import Navbar from "../Navbar";
import TableBody from "../TableBody";
import TableOptions from "../TableOptions";
import CategoryModal, { categoryModalName } from "./CategoryModal";
import Navebar from "../Navbar/Navebar";

const masterName = "category";
const tableHeaders = [
  { label: "Category Name", value: "categoryName" },
  { label: "Brand", value: "brandName" },
];

const Categories = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const categoryList = useSelector(getCategoryMasterList);
  const { totalPages, pageSize, totalElements, currentPage } = useSelector(
    getCategoryPagination
  );

  const getCategoryData = useCallback(
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
  } = useMasterLogic(getCategoryData, categoryModalName);

  const renderTableBody = () => {
    if (categoryList?.length)
      return categoryList?.map((category) => (
        <tr key={category?.id}>
          <td>{category?.categoryName}</td>
          <td>{category?.brand?.brandName}</td>
          <td>
            {/* <button
							className="btn btn-link p-0 m-0"
							type="button"
							onClick={() => handleMasterEdit(category)}
							style={{ textDecoration: "none" }}
						>
							Edit
						</button> */}
            <Dropdown autoClose="true">
              <Dropdown.Toggle variant="success" className="actionDropdown">
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleViewMaster(category)}>
                  View
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleMasterEdit(category)}>
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
          <TableOptions masterName={masterName} modalName={categoryModalName} />
          <form onSubmit={handleSubmit(handleSearchSubmit)}>
            <TableBody
              tableHeaders={tableHeaders}
              renderTableBody={renderTableBody}
            />
          </form>
          {categoryList?.length ? (
            <CustomPagination
              totalPages={totalPages}
              itemsPerPage={pageSize}
              totalItems={totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          ) : null}
        </div>
        <CategoryModal />
      </div>
    </>
  );
};

export default reduxForm({
  form: "masterSearch",
})(Categories);
