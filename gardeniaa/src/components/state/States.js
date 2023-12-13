import React, { useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import { getMasterList } from "../../actions/masters";
import useMasterLogic from "../../customHooks/useMasterLogic";
import { getStateMasterList, getStatePagination } from "../../reducers/master";
import CustomPagination from "../CustomPagination";
// import Navbar from "../Navbar";
import TableBody from "../TableBody";
import TableOptions from "../TableOptions";
import StateModal, { stateModalName } from "./StateModal";
import Navebar from "../Navbar/Navebar";
import "./state.css";

const masterName = "state";
const tableHeaders = [
  { label: "State Code", value: "stateCode" },
  { label: "State Name", value: "stateName" },
  { label: "Country", value: "countryName" },
];

const States = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const stateList = useSelector(getStateMasterList);
  const { totalPages, pageSize, totalElements, currentPage } =
    useSelector(getStatePagination);

  const getStateData = useCallback(
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
  } = useMasterLogic(getStateData, stateModalName);

  const renderTableBody = () => {
    if (stateList?.length)
      return stateList?.map((state) => (
        <tr key={state?.id}>
          <td>{state?.stateCode}</td>
          <td>{state?.stateName}</td>
          <td>{state?.country?.countryName}</td>
          <td>
            {/* <button
							className="btn btn-link p-0 m-0"
							type="button"
							onClick={() => handleMasterEdit(state)}
							style={{ textDecoration: "none" }}
						>
							Edit
						</button> */}
            <Dropdown autoClose="true">
              <Dropdown.Toggle variant="success" className="actionDropdown">
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleViewMaster(state)}>
                  View
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleMasterEdit(state)}>
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
          style={{ marginRight: "11rem" }}
        >
          <TableOptions masterName={masterName} modalName={stateModalName} />
          <form onSubmit={handleSubmit(handleSearchSubmit)}>
            <TableBody
              tableHeaders={tableHeaders}
              renderTableBody={renderTableBody}
            />
          </form>
          {/* <Table
				dataSource={stateList}
				columns={columns}
				rowKey={stateList => stateList?.id}
				pagination={false}
				loading={isFetchingMasterList}
				bordered
				/> */}
          {stateList?.length ? (
            <CustomPagination
              totalPages={totalPages}
              itemsPerPage={pageSize}
              totalItems={totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          ) : null}
        </div>
        <StateModal />
      </div>
    </>
  );
};

export default reduxForm({
  form: "masterSearch",
})(States);
