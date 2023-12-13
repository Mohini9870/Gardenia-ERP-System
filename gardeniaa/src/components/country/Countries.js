import React, { useCallback } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import { getMasterList } from "../../actions/masters";
import useMasterLogic from "../../customHooks/useMasterLogic";
import {
  getCountryMasterList,
  getCountryPagination,
} from "../../reducers/master";
import CustomPagination from "../CustomPagination";
// import Navbar from "../Navbar";
import TableBody from "../TableBody";
import TableOptions from "../TableOptions";
import CountryModal, { countryModalName } from "./CountryModal";
import "../../App.css";
import Navebar from "../Navbar/Navebar";
import "./country.css";

const masterName = "country";
const tableHeaders = [
  { label: "Country Code", value: "countryCode" },
  { label: "Country Name", value: "countryName" },
];

const Countries = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const countryList = useSelector(getCountryMasterList);
  const { totalPages, pageSize, totalElements, currentPage } =
    useSelector(getCountryPagination);

  const getCountryData = useCallback(
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
  } = useMasterLogic(getCountryData, countryModalName);

  // const columns = [
  // 	{
  // 		title: "Country Code",
  // 		dataIndex: "countryCode",
  // 		key: "countryCode",
  // 	},
  // 	{
  // 		title: "Country Name",
  // 		dataIndex: "countryName",
  // 		key: "countryName",
  // 	},
  // 	{
  // 		title: "Actions",
  // 		key: "Actions",
  // 		dataIndex: "action",
  // 		render: (_, data) => {
  // 			const items = [
  // 				{
  // 					label: "View",
  // 					onClick: () => handleViewMaster(data),
  // 				},
  // 				{
  // 					label: "Edit",
  // 					onClick: () => handleMasterEdit(data),
  // 				}
  // 			];
  // 			return renderActions(items);
  // 		},
  // 	},
  // ];

  const renderTableBody = () => {
    if (countryList?.length)
      return countryList?.map((country) => (
        <tr key={country?.id}>
          <td>{country?.countryCode}</td>
          <td>{country?.countryName}</td>
          <td>
            <Dropdown autoClose="true">
              <Dropdown.Toggle variant="success" className="actionDropdown">
                Actions
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleViewMaster(country)}>
                  View
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleMasterEdit(country)}>
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
          // style={{ marginRight: "10rem" }}
        >
          <TableOptions masterName={masterName} modalName={countryModalName} />
          <form onSubmit={handleSubmit(handleSearchSubmit)}>
            <TableBody
              tableHeaders={tableHeaders}
              renderTableBody={renderTableBody}
            />
            {/* <Table
						dataSource={countryList}
						columns={columns}
						rowKey={countryList => countryList?.id}
						pagination={false}
						loading={isFetchingMasterList}
						bordered
						searchable
					/> */}
          </form>

          {countryList?.length ? (
            <CustomPagination
              totalPages={totalPages}
              itemsPerPage={pageSize}
              totalItems={totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          ) : null}
        </div>
        <CountryModal />
      </div>
    </>
  );
};

export default reduxForm({
  form: "masterSearch",
})(Countries);
