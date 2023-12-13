import React from "react";
import Table from "react-bootstrap/Table";
const UpdateStock = () => {
  return (
    <>
      {" "}
      <Table
        striped
        bordered
        hover
        size="sm"
        className="w-75 mt-3"
        style={{ marginLeft: "8rem" }}
      >
        <thead>
          <tr>
            <th>Distributor</th>
            <th>Month</th>
            <th>Year</th>
            <th>Region</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default UpdateStock;

// import React, { useCallback } from "react";
// import { Dropdown } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { reduxForm } from "redux-form";
// import { getMasterList } from "../../../actions/masters";
// import useMasterLogic from "../../../customHooks/useMasterLogic";
// import {
//   getUpdatestockMasterList,
//   getUpdatestockPagination,
// } from "../../../reducers/master";
// import CustomPagination from "../../CustomPagination";
// // import Navbar from "../Navbar";
// import TableBody from "../../TableBody";
// import TableOptions from "../../TableOptions";
// import UpdatestockModal, { updatestockModalName } from "./UpdatestockModal";
// import Navebar from "../../Navbar/Navebar";
// import "./us.css";

// const masterName = "updatestock";
// const tableHeaders = [
//   { label: "Distributor", value: "distributor" },
//   { label: "Month", value: "month" },
//   { label: "Year", value: "year" },
//   { label: "Region", value: "regionName" },
// ];

// const UpdateStock = ({ handleSubmit }) => {
//   const dispatch = useDispatch();
//   const updatestockList = useSelector(getUpdatestockMasterList);
//   const { totalPages, pageSize, totalElements, currentPage } = useSelector(
//     getUpdatestockPagination
//   );

//   const getUpdateStockData = useCallback(
//     (pageNum = 1, itemsPerPage = 10, searchValues) => {
//       dispatch(
//         getMasterList(masterName, {
//           page: pageNum,
//           pageSize: itemsPerPage,
//           ...searchValues,
//         })
//       );
//     },
//     [dispatch]
//   );

//   const {
//     handleSearchSubmit,
//     handleMasterEdit,
//     handlePageChange,
//     handleViewMaster,
//   } = useMasterLogic(getUpdateStockData, updatestockModalName);

//   const renderTableBody = () => {
//     if (updatestockList?.length)
//       return updatestockList?.map((updatestock) => (
//         <tr key={updatestock?.id}>
//           <td>{updatestock?.distributor}</td>
//           <td>{updatestock?.month}</td>
//           <td>{updatestock?.year}</td>
//           <td>
//             {updatestock?.regionList?.map((region) => `${region?.label} `)}
//           </td>
//           <td>
//             {/* <button
// 							className="btn btn-link p-0 m-0"
// 							type="button"
// 							onClick={() => handleMasterEdit(hq)}
// 							style={{ textDecoration: "none" }}
// 						>
// 							Edit
// 						</button> */}
//             <Dropdown autoClose="true">
//               <Dropdown.Toggle variant="success" className="actionDropdown">
//                 Actions
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <Dropdown.Item onClick={() => handleViewMaster(updatestock)}>
//                   View
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => handleMasterEdit(updatestock)}>
//                   Edit
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </td>
//         </tr>
//       ));
//     return (
//       <tr>
//         <td colSpan={4} className="text-center">
//           No Data Available
//         </td>
//       </tr>
//     );
//   };

//   return (
//     <>
//       <Navebar />
//       <div className="container_data">
//         <div className="container justify-content-center mt-5">
//           <TableOptions
//             masterName={masterName}
//             modalName={updatestockModalName}
//           />
//           <form onSubmit={handleSubmit(handleSearchSubmit)}>
//             <TableBody
//               tableHeaders={tableHeaders}
//               renderTableBody={renderTableBody}
//             />
//           </form>
//           {updatestockList?.length ? (
//             <CustomPagination
//               totalPages={totalPages}
//               itemsPerPage={pageSize}
//               totalItems={totalElements}
//               currentPage={currentPage}
//               handlePageChange={handlePageChange}
//             />
//           ) : null}
//         </div>
//         <UpdatestockModal />
//       </div>
//     </>
//   );
// };

// export default reduxForm({
//   form: "masterSearch",
// })(UpdateStock);

// // import React, { useCallback } from "react";
// // import { Dropdown } from "react-bootstrap";
// // import { useDispatch, useSelector } from "react-redux";
// // import { reduxForm } from "redux-form";
// // import { getMasterList } from "../../../actions/masters";
// // import useMasterLogic from "../../../customHooks/useMasterLogic";
// // import {
// //   getUpdatestockMasterList,
// //   getUpdatestockPagination,
// // } from "../../../reducers/master";
// // import CustomPagination from "../../CustomPagination";
// // // import Navbar from "../Navbar";
// // import TableBody from "../../TableBody";
// // import TableOptions from "../../TableOptions";
// // import UpdatestockModal, { updatestockModalName } from "./UpdatestockModal";
// // import Navebar from "../../Navbar/Navebar";
// // import "./us.css";

// // const masterName = "updatestock";
// // const tableHeaders = [
// //   { label: "Distributor", value: "distributor" },
// //   { label: "Month", value: "month" },
// //   { label: "Year", value: "year" },
// //   { label: "Region", value: "regionName" },
// // ];

// // const UpdateStock = ({ handleSubmit }) => {
// //   const dispatch = useDispatch();
// //   const updateStockList = useSelector(getUpdatestockMasterList);
// //   const { totalPages, pageSize, totalElements, currentPage } = useSelector(
// //     getUpdatestockPagination
// //   );

// //   const getUpdatestockData = useCallback(
// //     (pageNum = 1, itemsPerPage = 10, searchValues) => {
// //       dispatch(
// //         getMasterList(masterName, {
// //           page: pageNum,
// //           pageSize: itemsPerPage,
// //           ...searchValues,
// //         })
// //       );
// //     },
// //     [dispatch]
// //   );

// //   const { handleSearchSubmit, handleSNSEdit, handleViewSNS, handlePageChange } =
// //     useMasterLogic(getUpdatestockData, updatestockModalName);

// //   const renderTableBody = () => {
// //     if (updateStockList?.length)
// //       return updateStockList?.map((updatestock) => (
// //         <tr key={updatestock?.id}>
// //           <td>{updatestock?.distributor}</td>
// //           <td>{updatestock?.month}</td>
// //           <td>{updatestock?.year}</td>
// //           <td>
// //             {updatestock?.regionList?.map((region) => `${region?.label} `)}
// //           </td>
// //           <td>
// //             {/* <button
// // 							className="btn btn-link p-0 m-0"
// // 							type="button"
// // 							onClick={() => handleMasterEdit(hq)}
// // 							style={{ textDecoration: "none" }}
// // 						>
// // 							Edit
// // 						</button> */}
// //             <Dropdown autoClose="true">
// //               <Dropdown.Toggle variant="success" className="actionDropdown">
// //                 Actions
// //               </Dropdown.Toggle>

// //               <Dropdown.Menu>
// //                 <Dropdown.Item onClick={() => handleViewSNS(updatestock)}>
// //                   View
// //                 </Dropdown.Item>
// //                 <Dropdown.Item onClick={() => handleSNSEdit(updatestock)}>
// //                   Edit
// //                 </Dropdown.Item>
// //               </Dropdown.Menu>
// //             </Dropdown>
// //           </td>
// //         </tr>
// //       ));
// //     return (
// //       <tr>
// //         <td colSpan={4} className="text-center">
// //           No Data Available
// //         </td>
// //       </tr>
// //     );
// //   };

// //   return (
// //     <>
// //       <Navebar />
// //       <div className="container_data">
// //         <div className="container justify-content-center mt-5">
// //           <TableOptions snsName={masterName} modalName={updatestockModalName} />
// //           <form onSubmit={handleSubmit(handleSearchSubmit)}>
// //             <TableBody
// //               tableHeaders={tableHeaders}
// //               renderTableBody={renderTableBody}
// //             />
// //           </form>
// //           {updateStockList?.length ? (
// //             <CustomPagination
// //               totalPages={totalPages}
// //               itemsPerPage={pageSize}
// //               totalItems={totalElements}
// //               currentPage={currentPage}
// //               handlePageChange={handlePageChange}
// //             />
// //           ) : null}
// //         </div>
// //         <UpdatestockModal />
// //       </div>
// //     </>
// //   );
// // };

// // export default reduxForm({
// //   form: "masterSearch",
// // })(UpdateStock);
