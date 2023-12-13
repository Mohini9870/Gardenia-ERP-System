import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addMasterList, editMasterList } from "../../actions/masters";
import { closeModal } from "../../actions/modal";
import { getActiveModal } from "../../reducers/modals";
import RegionForm from "./RegionForm";

const masterName = "region";
export const regionModalName = "regionModal";

const RegionModal = () => {
	const dispatch = useDispatch();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === regionModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		if (data?.id) {
			dispatch(editMasterList(masterName, formData, data?.id));
		} else {
			dispatch(addMasterList(masterName, formData));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(regionModalName));
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
			<RegionForm
				title={
					!!data?.isViewOnly
						? data?.name
						: `${data?.id ? "Edit" : "Add"} Region`
				}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				initialValues={{
					regionName: data?.regionName,
					regionCode: data?.regionCode,
					stateList: data?.stateList?.map(state => state?.value),
				}}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default RegionModal;
