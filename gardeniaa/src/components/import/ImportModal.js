import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { importMaster } from "../../actions/masters";
import { closeModal } from "../../actions/modal";
import { getActiveModal } from "../../reducers/modals";
import ImportForm from "./ImportForm";

export const importModalName = "importModal";

const ImportModal = () => {
	const dispatch = useDispatch();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === importModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		const form = new FormData();
		form.append("file", formData?.file || null);
		if (data) {
			dispatch(importMaster(data?.masterName, formData));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(importModalName));
	};

	return (
		<Modal
			show={open}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			centered
			size="sm"
		>
			<ImportForm
				title={`Import ${data?.masterName}`}
				onSubmit={handleSubmit}
				onCancel={handleClose}
			/>
		</Modal>
	);
};

export default ImportModal;
