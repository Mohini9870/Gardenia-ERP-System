import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addMasterList, editMasterList } from "../../actions/masters";
import { closeModal } from "../../actions/modal";
import { getActiveModal } from "../../reducers/modals";
import FamilyForm from "./FamilyForm";

const masterName = "family";
export const familyModalName = "familyModal";

const FamilyModal = () => {
	const dispatch = useDispatch();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === familyModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		if (data?.id) {
			dispatch(editMasterList(masterName, formData, data?.id));
		} else {
			dispatch(addMasterList(masterName, formData));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(familyModalName));
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
			<FamilyForm
				title={!!data?.isViewOnly ? data?.name : `${data?.id ? "Edit" : "Add"} Family`}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				initialValues={{
					familyName: data?.familyName || "",
					categoryId: data?.category?.id || "",
				}}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default FamilyModal;
