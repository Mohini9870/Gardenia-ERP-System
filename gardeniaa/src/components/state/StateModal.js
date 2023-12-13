import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addMasterList, editMasterList } from "../../actions/masters";
import { closeModal } from "../../actions/modal";
import { getActiveModal } from "../../reducers/modals";
import StateForm from "./StateForm";

const masterName = "state";
export const stateModalName = "stateModal";

const StateModal = () => {
	const dispatch = useDispatch();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === stateModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		if (data?.id) {
			dispatch(editMasterList(masterName, formData, data?.id));
		} else {
			dispatch(addMasterList(masterName, formData));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(stateModalName));
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
			<StateForm
				title={!!data?.isViewOnly ? data?.name : `${data?.id ? "Edit" : "Add"} State`}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				initialValues={{
					stateName: data?.stateName || "",
					stateCode: data?.stateCode || "",
					countryId: data?.country?.id || "",
				}}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default StateModal;
