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
import UserForm from "./UserForm";

export const userModalName = "userModal";

const UserModal = () => {
	const dispatch = useDispatch();

	const activeModal = useSelector(getActiveModal);
	const open = activeModal?.name === userModalName;
	const data = activeModal?.data || {};

	const handleSubmit = formData => {
		const form = new FormData();
		form.append(
			"body",
			new Blob([JSON.stringify(formData)], {
				type: "application/json",
			})
		);
		form.append("aadharFile", formData?.aadharFile || null);
		form.append("panFile", formData?.panFile || null);
		form.append("resumeFile", formData?.resumeFile || null);
		form.append("beatPlanFile", formData?.beatPlanFile || null);
		if (data?.id && data?.action === EDIT) {
			dispatch(
				editMasterList(
					"user",
					form,
					data?.id,
					data?.userStatus,
					"multipart/form-data"
				)
			);
		} else if (data?.id && data?.action === REAPPROVE) {
			dispatch(
				reApproveMasterList(
					"user",
					form,
					data?.id,
					data?.userStatus,
					"multipart/form-data"
				)
			);
		} else {
			dispatch(
				addMasterList("user", form, data?.userStatus, "multipart/form-data")
			);
		}
	};

	const handleClose = () => {
		dispatch(closeModal(userModalName));
	};

	const initialValues = {
		title: data?.title,
		firstName: data?.firstName,
		middleName: data?.middleName,
		lastName: data?.lastName,
		fullName: data?.fullName,
		aadharNo:data?.aadharNo,
		login: data?.login,
		gender: data?.gender,
		maritalStatus: data?.maritalStatus,
		birthDate: data?.birthDate,
		email: data?.email,
		empCode: data?.empCode,
		reportingTo: data?.reportingTo,
		companyCode: data?.companyCode,
		grade: data?.grade,
		branch: data?.branch,
		department: data?.department,
		processStartDate: data?.processStartDate,
		paymentMode: data?.paymentMode,
		status: data?.status,
		regionId: data?.region?.id,
		stateId: data?.state?.id,
		districtId: data?.district?.id,
		areaId: data?.area?.id,
		cityId: data?.city?.id,
		hqId: data?.hq?.id,
		role: data?.role,
		aadharFile: data?.aadharFile,
		panFile: data?.panFile,
		resumeFile: data?.resumeFile,
		paySlipFile: data?.paySlipFile,
		bankStatementFile: data?.bankStatementFile,
		beatPlanFile: data?.beatPlanFile,
		lcOrgName: data?.lcOrgName,
		lcJoiningDate: data?.lcJoiningDate,
		lcLastDate: data?.lcLastDate,
		lcOrgDesignation: data?.lcOrgDesignation,
		lcOrgSalary: data?.lcOrgSalary,
		lcOrgManagerMobile: data?.lcOrgManagerMobile,
		lcOrgManagerEmailID: data?.lcOrgManagerEmailID,
		lcOrgHREmailID: data?.lcOrgHREmailID,
		dateOfJoining: data?.dateOfJoining,
		designationRecommended: data?.designationRecommended,
		goSalary: data?.goSalary,
		growthPercentage: data?.growthPercentage,
		userTargetDetails: data?.userTargetDetails,
		userTeam: data?.userTeam,
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
			<UserForm
				title={!!data?.isViewOnly ? data?.name : `${data?.id ? "Edit" : "Add"} User`}
				onSubmit={handleSubmit}
				onCancel={handleClose}
				initialValues={initialValues}
				isViewOnly={!!data?.isViewOnly}
			/>
		</Modal>
	);
};

export default UserModal;
