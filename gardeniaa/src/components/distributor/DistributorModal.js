import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
	addMasterList,
	editMasterList,
	reApproveMasterList,
} from "../../actions/masters";
import { closeModal } from "../../actions/modal";
import { getActiveModal } from "../../reducers/modals";
import { EDIT, REAPPROVE } from "../../utils/masterActions";
import DistributorForm from "./DistributorForm";

export const distributorModalName = "distributorModal";

const DistributorModal = () => {
	const dispatch = useDispatch();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === distributorModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		const form = new FormData();
		form.append(
			"body",
			new Blob([JSON.stringify(formData)], {
				type: "application/json",
			})
		);
		form.append("gstFile", formData?.gstFile || null);
		form.append("panFile", formData?.panFile || null);
		form.append("scannedCopy", formData?.scannedCopy || null);
		if (data?.id && data?.action === EDIT) {
			dispatch(
				editMasterList(
					"distributor",
					form,
					data?.id,
					data?.distributorStatus,
					"multipart/form-data"
				)
			);
		} else if (data?.id && data?.action === REAPPROVE) {
			dispatch(
				reApproveMasterList(
					"distributor",
					form,
					data?.id,
					data?.distributorStatus,
					"multipart/form-data"
				)
			);
		} else {
			dispatch(
				addMasterList(
					"distributor",
					form,
					data?.distributorStatus,
					"multipart/form-data"
				)
			);
		}
	};

	const handleClose = () => {
		dispatch(closeModal(distributorModalName));
	};

	const initialValues = {
		distributorCode: data?.distributorCode || null,
		distributorName: data?.distributorName,
		distributorType: data?.distributorType,
		stateId: data?.state?.id,
		regionId: data?.region?.id,
		districtId: data?.district?.id,
		cityId: data?.city?.id,
		gstin: data?.gstin,
		pan: data?.pan,
		contact: data?.contact,
		mobile: data?.mobile,
		phone: data?.phone,
		email: data?.email,
		billingAddress: data?.billingAddress,
		deliveryAddress: data?.deliveryAddress,
		suppName: data?.suppName,
		suppCode: data?.suppCode,
		serviceStatus: data?.serviceStatus,
		status: data?.status,
		brandList: data?.brandList?.map(val => val?.value),
		hqId: data?.hq?.id,
		gstFile: data?.gstFile,
		panFile: data?.panFile,
		scannedCopy: data?.scannedCopy,
		pinCode: data?.pinCode,
		currentBusinessAssociation: data?.currentBusinessAssociation,
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
			<DistributorForm
				title={
					!!data?.isViewOnly
						? data?.name
						: `${data?.id ? "Edit" : "Add"} Distributor`
				}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				initialValues={initialValues}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default DistributorModal;
