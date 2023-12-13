import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addMasterList, editMasterList } from "../../actions/masters";
import { closeModal } from "../../actions/modal";
import { getActiveModal } from "../../reducers/modals";
import CountryForm from "./CountryForm";

const masterName = "country";
export const countryModalName = "countryModal";

const CountryModal = () => {
	const dispatch = useDispatch();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === countryModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		if (data?.id) {
			dispatch(editMasterList(masterName, formData, data?.id));
		} else {
			dispatch(addMasterList(masterName, formData));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(countryModalName));
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
			<CountryForm
				title={
					!!data?.isViewOnly ? data?.name : `${data?.id ? "Edit" : "Add"} Country`
				}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				initialValues={{
					countryName: data?.countryName || "",
					countryCode: data?.countryCode || "",
				}}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default CountryModal;
