import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { rejectMaster } from "../../actions/masters";
import { closeModal } from "../../actions/modal";

import { getActiveModal } from "../../reducers/modals";
import RejectForm from "./RejectForm";

export const rejectModalName = "rejectModal";

const RejectModal = () => {
	const dispatch = useDispatch();
	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === rejectModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		dispatch(rejectMaster(data?.masterName, data?.masterId, formData));
	};

	const initialValues = {
		rejectReason: data?.rejectReason || null,
	};

	const handleClose = () => {
		dispatch(closeModal(rejectModalName));
	};

	return (
		<Modal
			show={open}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			centered
		>
			<RejectForm
				initialValues={initialValues}
				onSubmit={handleSubmit}
				onCancel={handleClose}
			/>
		</Modal>
	);
};

export default RejectModal;
