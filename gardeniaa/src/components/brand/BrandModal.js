import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addMasterList, editMasterList } from "../../actions/masters";
import { closeModal } from "../../actions/modal";
import { getActiveModal } from "../../reducers/modals";
import BrandForm from "./BrandForm";

const masterName = "brand";
export const brandModalName = "brandModal";

const BrandModal = () => {
	const dispatch = useDispatch();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === brandModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		if (data?.id) {
			dispatch(editMasterList(masterName, formData, data?.id));
		} else {
			dispatch(addMasterList(masterName, formData));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(brandModalName));
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
			<BrandForm
				title={!!data?.isViewOnly ? data?.name : `${data?.id ? "Edit" : "Add"} Brand`}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				initialValues={{
					brandName: data?.brandName || "",
				}}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default BrandModal;
