import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addMasterList, editMasterList } from "../../actions/masters";
import { closeModal } from "../../actions/modal";
import { getActiveModal } from "../../reducers/modals";
import ProductForm from "./ProductForm";

export const productModalName = "productModal";

const ProductModal = () => {
	const dispatch = useDispatch();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === productModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		const form = new FormData();
		form.append(
			"body",
			new Blob([JSON.stringify(formData)], {
				type: "application/json",
			})
		);
		if (data?.id) {
			dispatch(
				editMasterList("product", form, data?.id, data?.productStatus,"multipart/form-data")
			);
		} else {
			dispatch(addMasterList("product", form, data?.productStatus,"multipart/form-data"));
		}
	};

	const handleClose = () => {
		dispatch(closeModal(productModalName));
	};

	const initialValues = {
		code: data?.code || null,
		pname: data?.pname,
		brandId: data?.brand?.id,
		categoryId: data?.category?.id,
		familyId: data?.family?.id,
		variant: data?.variant,
		group_name: data?.group_name,
		uom: data?.uom,
		ptd: data?.ptd,
		ptr: data?.ptr,
		status: data?.status || null,
		description: data?.description,
		salesDiaryCode: data?.salesDiaryCode,
		mrp: data?.mrp,
		schemeQty:data?.schemeQty,
		gstRate:data?.gstRate,
		minQty:data?.minQty,
		HSNCode:data?.HSNCode,
	};

	return (
		<Modal
			show={open}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			centered
			size="xl"
		>
			<ProductForm
				title={!!data?.isViewOnly ? data?.name : `${data?.id ? "Edit" : "Add"} Product`}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				initialValues={initialValues}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default ProductModal;
