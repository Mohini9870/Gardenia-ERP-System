import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addMasterList, editMasterList } from "../../actions/masters";
import { closeModal } from "../../actions/modal";
import { getActiveModal } from "../../reducers/modals";
import CityForm from "./CityForm";

const masterName = "city";
export const cityModalName = "cityModal";

const CityModal = () => {
	const dispatch = useDispatch();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === cityModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		if (data?.id) {
			dispatch(editMasterList(masterName, formData, data?.id));
		} else {
			dispatch(addMasterList(masterName, formData));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(cityModalName));
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
			<CityForm
				title={!!data?.isViewOnly ? data?.name : `${data?.id ? "Edit" : "Add"} City`}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				initialValues={{
					cityName: data?.cityName || "",
					cityCode: data?.cityCode || "",
					districtId: data?.district?.id || "",
				}}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default CityModal;
