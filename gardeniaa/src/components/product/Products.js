import React, { useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { reduxForm } from "redux-form";
import { approveMaster, getMasterList } from "../../actions/masters";
import { openModal } from "../../actions/modal";
import useMasterLogic from "../../customHooks/useMasterLogic";
import {
  getProductMasterList,
  getProductPagination,
} from "../../reducers/master";
import { getUserDetails } from "../../reducers/user";
import { APPROVED, PENDING, REJECTED } from "../../utils/masterActions";
import CustomPagination from "../CustomPagination";
// import Navbar from "../Navbar";
import { rejectModalName } from "../rejectModal/RejectModal";
import Statuses from "../Statuses";
import TableBody from "../TableBody";
import TableOptions from "../TableOptions";
import "./product.css";
import ProductModal, { productModalName } from "./ProductModal";
import Navebar from "../Navbar/Navebar";

const masterName = "product";

const Products = ({ handleSubmit }) => {
  const { productStatus } = useParams();
  const dispatch = useDispatch();

  const tableHeaders = [
    { label: "Product Code", value: "productCode" },
    { label: "Product Name", value: "productName" },
    { label: "Brand", value: "brandName" },
    { label: "Category", value: "categoryName" },
    { label: "Family", value: "familyName" },
    { label: "Variant", value: "variant" },
    { label: "Sales Diary Code", value: "salesDiaryCode" },
    { label: "MRP", value: "mrp" },
  ];

  if (productStatus === REJECTED) {
    tableHeaders.push({ label: "Reject Reason", value: "rejectReason" });
  }

  const productList = useSelector(getProductMasterList);
  const { isRoleMis, isRoleProductApprover, isRoleProduct } =
    useSelector(getUserDetails);
  const { totalPages, pageSize, totalElements, currentPage } =
    useSelector(getProductPagination);

  const getProductsData = useCallback(
    (pageNum = 1, itemsPerPage = 10, searchValues) => {
      dispatch(
        getMasterList(masterName, {
          page: pageNum,
          pageSize: itemsPerPage,
          productStatus,
          ...searchValues,
        })
      );
    },
    [dispatch, productStatus]
  );

  const {
    handleSearchSubmit,
    handleMasterEdit,
    handlePageChange,
    handleViewMaster,
  } = useMasterLogic(getProductsData, productModalName);

  const renderActions = (product) => {
    if (productStatus === APPROVED) {
      return (
        <>
          {(isRoleMis || isRoleProductApprover) && (
            <>
              <Dropdown autoClose="true">
                <Dropdown.Toggle variant="success" className="actionDropdown">
                  Actions
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      handleViewMaster({ productStatus, ...product })
                    }
                  >
                    View
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      handleMasterEdit({ productStatus, ...product })
                    }
                  >
                    Edit
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}
          {isRoleProduct && (
            <>
              <Dropdown autoClose="true">
                <Dropdown.Toggle variant="success" className="actionDropdown">
                  Actions
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      handleViewMaster({ productStatus, ...product })
                    }
                  >
                    View
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}
        </>
      );
    } else if (productStatus === PENDING) {
      return (
        <>
          {(isRoleMis || isRoleProductApprover) && (
            <>
              <Dropdown autoClose="true">
                <Dropdown.Toggle variant="success" className="actionDropdown">
                  Actions
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      handleViewMaster({ productStatus, ...product })
                    }
                  >
                    View
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      handleMasterEdit({ productStatus, ...product })
                    }
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(approveMaster(masterName, product?.id))
                    }
                  >
                    Approve
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(
                        openModal(rejectModalName, {
                          masterName,
                          masterId: product?.id,
                        })
                      )
                    }
                  >
                    Reject
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}
          {isRoleProduct && (
            <>
              <Dropdown autoClose="true">
                <Dropdown.Toggle variant="success" className="actionDropdown">
                  Actions
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      handleViewMaster({ productStatus, ...product })
                    }
                  >
                    View
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      handleMasterEdit({ productStatus, ...product })
                    }
                  >
                    Edit
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}
        </>
      );
    } else if (productStatus === REJECTED) {
      return (
        <>
          <Dropdown autoClose="true">
            <Dropdown.Toggle variant="success" className="actionDropdown">
              Actions
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => handleViewMaster({ productStatus, ...product })}
              >
                View
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleMasterEdit({ productStatus, ...product })}
              >
                Edit
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      );
    }
    return <></>;
  };

  const renderTableBody = () => {
    if (productList?.length)
      return productList?.map((product) => (
        <tr key={product?.id}>
          <td>{product?.code}</td>
          <td>{product?.pname}</td>
          <td>{product?.brand?.brandName}</td>
          <td>{product?.category?.categoryName}</td>
          <td>{product?.family?.familyName}</td>
          <td>{product?.variant}</td>
          <td>{product?.salesDiaryCode}</td>
          <td>{product?.mrp}</td>
          {productStatus === REJECTED && <td>{product?.rejectReason}</td>}
          <td>{renderActions(product)}</td>
        </tr>
      ));

    return (
      <tr>
        <td colSpan={tableHeaders?.length + 1} className="text-center">
          No Data Available
        </td>
      </tr>
    );
  };

  const addProduct = () => {
    dispatch(openModal(productModalName, { productStatus }));
  };

  return (
    <>
      <Navebar />
      <div className="container_data">
        <div
          className="container justify-content-center mt-5 ms-2"
          // style={{ marginRight: "10rem" }}
        >
          <TableOptions
            masterName={masterName}
            modalName={productModalName}
            addMaster={addProduct}
          />
          <Statuses masterName={masterName} status={productStatus} />
          <form onSubmit={handleSubmit(handleSearchSubmit)}>
            <TableBody
              tableHeaders={tableHeaders}
              renderTableBody={renderTableBody}
            />
          </form>
          {productList?.length ? (
            <CustomPagination
              totalPages={totalPages}
              itemsPerPage={pageSize}
              totalItems={totalElements}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          ) : null}
        </div>
        <ProductModal />
      </div>
    </>
  );
};

export default reduxForm({
  form: "masterSearch",
})(Products);
