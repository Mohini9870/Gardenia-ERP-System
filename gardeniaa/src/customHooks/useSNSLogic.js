import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFormValues } from "redux-form";
import { openModal } from "../actions/modal";

const useSNSLogic = (getSNSData, snsModalName) => {
  const dispatch = useDispatch();
  const formValues = useSelector((state) => getFormValues("snsSearch")(state));

  useEffect(() => {
    getSNSData(1, 10, {});
  }, [getSNSData]);

  const handleSearchSubmit = () => {
    getSNSData(1, 10, formValues);
  };

  const handleViewSNS = (sns) => {
    dispatch(openModal(snsModalName, { ...sns, isViewOnly: true }));
  };

  const handleSNSEdit = (sns) => {
    dispatch(openModal(snsModalName, sns));
  };

  const handlePageChange = (pageNum, itemsPerPage) => {
    getSNSData(pageNum, itemsPerPage, formValues);
  };

  return { handleSearchSubmit, handleSNSEdit, handleViewSNS, handlePageChange };
};

export default useSNSLogic;
