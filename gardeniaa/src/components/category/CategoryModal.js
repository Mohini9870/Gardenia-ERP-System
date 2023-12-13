import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addMasterList, editMasterList } from "../../actions/masters";
import { closeModal } from "../../actions/modal";
import { getActiveModal } from "../../reducers/modals";
import CategoryForm from "./CategoryForm";

const masterName = "category";
export const categoryModalName = "categoryModal";

const CategoryModal = () => {
	const dispatch = useDispatch();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === categoryModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		if (data?.id) {
			dispatch(editMasterList(masterName, formData, data?.id));
		} else {

			dispatch(addMasterList(masterName, formData));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(categoryModalName));
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
			<CategoryForm
				title={!!data?.isViewOnly ? data?.name : `${data?.id ? "Edit" : "Add"} Category`}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				initialValues={{
					categoryName: data?.categoryName || "",
					brandId: data?.brand?.id || "",
				}}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default CategoryModal;
