import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addMasterList, editMasterList } from "../../actions/masters";
import { closeModal } from "../../actions/modal";
import { getActiveModal } from "../../reducers/modals";
import AreaForm from "./AreaForm";

const masterName = "area";
export const areaModalName = "areaModal";

const AreaModal = () => {
	const dispatch = useDispatch();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === areaModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		if (data?.id) {
			dispatch(editMasterList(masterName, formData, data?.id));
		} else {
			dispatch(addMasterList(masterName, formData));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(areaModalName));
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
			<AreaForm
				title={!!data?.isViewOnly ? data?.name : `${data?.id ? "Edit" : "Add"} City`}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				initialValues={{
					areaName: data?.areaName || "",
					areaCode: data?.areaCode || "",
					cityId: data?.city?.id || "",
				}}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default AreaModal;
