import { getFormValues } from "redux-form";
import { put, select, takeLatest } from "redux-saga/effects";
import { getMasterList } from "../actions/masters";
import { closeModal } from "../actions/modal";
import { addNotification } from "../actions/notifications";
import { clearUserDetails } from "../actions/user";
import { rejectModalName } from "../components/rejectModal/RejectModal";
import {
	ADD_MASTER_LIST,
	APPROVE_MASTER,
	EDIT_MASTER_LIST,
	REAPPROVE_MASTER,
	REJECT_MASTER,
} from "../constants/master";

function* fetchMasterList({ payload }) {
	const formValues = yield select(getFormValues("masterSearch"));
	yield put(
		getMasterList(payload?.masterName, {
			page: 1,
			pageSize: 10,
			[`${payload?.masterName}Status`]: payload?.status,
			...formValues,
		})
	);
}

function* closeMasterModal({ payload }) {
	yield put(closeModal(`${payload?.masterName}Modal`));
}

export function* watchMasterListChanges() {
	yield takeLatest(
		[
			ADD_MASTER_LIST.SUCCESS,
			EDIT_MASTER_LIST.SUCCESS,
			APPROVE_MASTER.SUCCESS,
			REJECT_MASTER.SUCCESS,
			REAPPROVE_MASTER.SUCCESS,
		],
		fetchMasterList
	);
}

export function* watchRejectMasterSuccess() {
	yield takeLatest(REJECT_MASTER.SUCCESS, function* closeRejectModal() {
		yield put(closeModal(rejectModalName));
	});
}

export function* watchCloseModalChanges() {
	yield takeLatest(
		[
			ADD_MASTER_LIST.SUCCESS,
			EDIT_MASTER_LIST.SUCCESS,
			REAPPROVE_MASTER.SUCCESS,
		],
		closeMasterModal
	);
}

function* errorHandler({ payload }) {
	if (payload?.response?.data?.status === 401) yield put(clearUserDetails());
	yield put(addNotification({ error: payload?.response?.data, type: "error" }));
}

function* successHandler({ payload }) {
	yield put(
		addNotification({
			error: { message: payload?.data?.message },
			type: "success",
		})
	);
}

export function* watchApiError() {
	yield takeLatest(function (action) {
		if (action?.type?.includes("FAILURE")) return action;
	}, errorHandler);
}

export function* watchApiSuccess() {
	yield takeLatest(
		[
			ADD_MASTER_LIST.SUCCESS,
			EDIT_MASTER_LIST.SUCCESS,
			APPROVE_MASTER.SUCCESS,
			REJECT_MASTER.SUCCESS,
			REAPPROVE_MASTER.SUCCESS,
		],
		successHandler
	);
}
