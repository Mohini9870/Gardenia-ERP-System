import React, { useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import { getMasterList } from "../../actions/masters";
import useMasterLogic from "../../customHooks/useMasterLogic";
import {
  getFamilyMasterList,
  getFamilyPagination,
} from "../../reducers/master";
import CustomPagination from "../CustomPagination";
// import Navbar from "../Navbar";
import TableBody from "../TableBody";
import TableOptions from "../TableOptions";
import FamilyModal, { familyModalName } from "./FamilyModal";
import Navebar from "../Navbar/Navebar";
import "./family.css";

const masterName = "family";
const tableHeaders = [
  { label: "Family Name", value: "familyName" },
  { label: "Category", value: "categoryName" },
];

const Families = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const familyList = useSelector(getFamilyMasterList);
  const { totalPages, pageSize, totalElements, currentPage } =
    useSelector(getFamilyPagination);

  const getFamilyData = useCallback(
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
  } = useMasterLogic(getFamilyData, familyModalName);

  const renderTableBody = () => {
    if (familyList?.length)
      return familyList?.map((family) => (
        <tr key={family?.id}>
          <td>{family?.familyName}</td>
          <td>
            {family?.category?.brand?.brandName +
              " - " +
              family?.category?.categoryName}
          </td>
          <td>
            {/* <button
							className="btn btn-link p-0 m-0"
							type="button"
							onClick={() => handleMasterEdit(family)}
							style={{ textDecoration: "none" }}
						>
							Edit
						</button> */}
            <Dropdown autoClose="true">
              <Dropdown.Toggle variant="success" className="actionDropdown">
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleViewMaster(family)}>
                  View
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleMasterEdit(family)}>
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
          <TableOptions masterName={masterName} modalName={familyModalName} />
          <form onSubmit={handleSubmit(handleSearchSubmit)}>
            <TableBody
              tableHeaders={tableHeaders}
              renderTableBody={renderTableBody}
            />
          </form>
          {familyList?.length ? (
            <CustomPagination
              totalPages={totalPages}
              itemsPerPage={pageSize}
              totalItems={totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          ) : null}
        </div>
        <FamilyModal />
      </div>
    </>
  );
};

export default reduxForm({
  form: "masterSearch",
})(Families);
