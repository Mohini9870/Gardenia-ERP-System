import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addMasterList, editMasterList } from "../../actions/masters";
import { closeModal } from "../../actions/modal";
import { getActiveModal } from "../../reducers/modals";
import DistrictForm from "./DistrictForm";

const masterName = "district";
export const districtModalName = "districtModal";

const DistrictModal = () => {
	const dispatch = useDispatch();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === districtModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		if (data?.id) {
			dispatch(editMasterList(masterName, formData, data?.id));
		} else {
			dispatch(addMasterList(masterName, formData));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(districtModalName));
	};

	return (
		<Modal
			show={open}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			centered
			size="lg"
		>
			<DistrictForm
				title={!!data?.isViewOnly ? data?.name : `${data?.id ? "Edit" : "Add"} District`}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				initialValues={{
					districtName: data?.districtName || "",
					districtCode: data?.districtCode || "",
					regionId: data?.region?.id || "",
				}}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default DistrictModal;
