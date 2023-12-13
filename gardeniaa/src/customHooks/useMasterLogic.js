import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFormValues } from "redux-form";
import { openModal } from "../actions/modal";

const useMasterLogic = (getMasterData, masterModalName) => {
	const dispatch = useDispatch();
	const formValues = useSelector(state => getFormValues("masterSearch")(state));

	useEffect(() => {
		getMasterData(1, 10, {});
	}, [getMasterData]);

	const handleSearchSubmit = () => {
		getMasterData(1, 10, formValues);
	};

	const handleViewMaster = master => {
		dispatch(openModal(masterModalName, { ...master, isViewOnly: true }));
	};

	const handleMasterEdit = master => {
		dispatch(openModal(masterModalName, master));
	};

	const handlePageChange = (pageNum, itemsPerPage) => {
		getMasterData(pageNum, itemsPerPage, formValues);
	};

	return { handleSearchSubmit, handleMasterEdit, handlePageChange, handleViewMaster };
};

export default useMasterLogic;
