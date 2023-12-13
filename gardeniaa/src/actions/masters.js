import axios from "axios";
import {
	ADD_MASTER_LIST,
	APPROVE_MASTER,
	DOWNLOAD_FILE,
	EDIT_MASTER_LIST,
	EXPORT_MASTER_LIST,
	GET_DROPDOWN_LIST,
	GET_MASTER_LIST,
	IMPORT_MASTER,
	REAPPROVE_MASTER,
	REJECT_MASTER,
} from "../constants/master";
import { PENDING } from "../utils/masterActions";
import stringifyQueryParams from "../utils/stringifyQueryParams";
import { base_url } from "./baseUrls";

export const getMasterList =
	(masterName, query = {}) =>
	async (dispatch, getState) => {
		try {
			const queryString = stringifyQueryParams(query);
			dispatch({ type: GET_MASTER_LIST.REQUEST });

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getState().userDetails?.token}`,
				},
			};

			const { data } = await axios.get(
				`${base_url}/${masterName}?${queryString}`,
				config
			);

			dispatch({
				type: GET_MASTER_LIST.SUCCESS,
				payload: {
					success: "success",
					data,
					masterName,
				},
			});
		} catch (error) {
			dispatch({ type: GET_MASTER_LIST.FAILURE, payload: error });
		}
	};

export const addMasterList =
	(masterName, masterData, status = null, configType = "application/json") =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ADD_MASTER_LIST.REQUEST });

			const config = {
				headers: {
					"Content-Type": configType,
					Authorization: `Bearer ${getState().userDetails?.token}`,
				},
			};

			const { data } = await axios.post(
				`${base_url}/${masterName}`,
				masterData,
				config
			);
			dispatch({
				type: ADD_MASTER_LIST.SUCCESS,
				payload: {
					success: "success",
					data,
					status,
					masterName,
				},
			});
		} catch (error) {
			dispatch({ type: ADD_MASTER_LIST.FAILURE, payload: error });
		}
	};

export const editMasterList =
	(masterName, masterData, id, status, configType = "application/json") =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: EDIT_MASTER_LIST.REQUEST });

			const config = {
				headers: {
					"Content-Type": configType,
					Authorization: `Bearer ${getState().userDetails?.token}`,
				},
			};

			const { data } = await axios.put(
				`${base_url}/${masterName}/${id}`,
				masterData,
				config
			);
			dispatch({
				type: EDIT_MASTER_LIST.SUCCESS,
				payload: {
					success: "success",
					data,
					status,
					masterName,
				},
			});
		} catch (error) {
			dispatch({ type: EDIT_MASTER_LIST.FAILURE, payload: error });
			
		}
	};

export const reApproveMasterList =
	(masterName, masterData, id, status, configType = "application/json") =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: REAPPROVE_MASTER.REQUEST });

			const config = {
				headers: {
					"Content-Type": configType,
					Authorization: `Bearer ${getState().userDetails?.token}`,
				},
			};

			const { data } = await axios.put(
				`${base_url}/${masterName}/${id}/reapproval`,
				masterData,
				config
			);

			dispatch({
				type: REAPPROVE_MASTER.SUCCESS,
				payload: {
					success: "success",
					data,
					status,
					masterName,
				},
			});
		} catch (error) {
			dispatch({ type: REAPPROVE_MASTER.FAILURE, payload: error });
		}
	};

export const exportMasterList = masterName => async (dispatch, getState) => {
	try {
		dispatch({ type: EXPORT_MASTER_LIST.REQUEST });

		const date = new Date();
		const fileName = `${masterName} ${date.getDate()}-${
			date.getMonth() + 1
		}-${date.getFullYear()}.xlsx`; //month + 1 because date returns months from 0 - 11

		axios
			.get(`${base_url}/${masterName}/export/excel`, {
				headers: {
					Authorization: `Bearer ${getState().userDetails?.token}`,
				},
				responseType: "blob",
			})
			.then(response => {
				let url = window.URL.createObjectURL(new Blob([response.data]));
				let a = document.createElement("a");
				a.href = url;
				a.download = fileName;
				a.click();
			});

		dispatch({
			type: EXPORT_MASTER_LIST.SUCCESS,
			payload: {
				success: "success",
				masterName,
			},
		});
	} catch (error) {
		dispatch({ type: EXPORT_MASTER_LIST.FAILURE, payload: error });
	}
};

export const getDropdownList =
	(masterName, query = {}) =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: GET_DROPDOWN_LIST.REQUEST });

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getState().userDetails?.token}`,
				},
			};

			const queryString = stringifyQueryParams(query);
			console.log(masterName);

			const { data } = await axios.get(
				`${base_url}/${masterName}/dropdown?${queryString}`,
				config
			);

			dispatch({
				type: GET_DROPDOWN_LIST.SUCCESS,
				payload: {
					success: "success",
					data,
					masterName,
				},
			});
		} catch (error) {
			dispatch({ type: GET_DROPDOWN_LIST.FAILURE, payload: error });
		}
	};

export const approveMaster = (masterName, id) => async (dispatch, getState) => {
	try {
		dispatch({ type: APPROVE_MASTER.REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${getState().userDetails?.token}`,
			},
		};

		const { data } = await axios.get(
			`${base_url}/${masterName}/approve/${id}`,
			config
		);

		dispatch({
			type: APPROVE_MASTER.SUCCESS,
			payload: {
				success: "success",
				masterName,
				data,
				status: PENDING,
			},
		});
	} catch (error) {
		dispatch({ type: APPROVE_MASTER.FAILURE, payload: error });
	}
};

export const rejectMaster =
	(masterName, id, body) => async (dispatch, getState) => {
		try {
			dispatch({ type: REJECT_MASTER.REQUEST });

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getState().userDetails?.token}`,
				},
			};

			const { data } = await axios.post(
				`${base_url}/${masterName}/reject/${id}`,
				body,
				config
			);

			dispatch({
				type: REJECT_MASTER.SUCCESS,
				payload: {
					success: "success",
					masterName,
					data,
					status: PENDING,
				},
			});
		} catch (error) {
			dispatch({ type: REJECT_MASTER.FAILURE, payload: error });
		}
	};

export const importMaster =
	(masterName, importFile) => async (dispatch, getState) => {
		try {
			dispatch({ type: IMPORT_MASTER.REQUEST });

			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${getState().userDetails?.token}`,
				},
			};

			const { data } = await axios.post(
				`${base_url}/${masterName}/upload/import`,
				importFile,
				config
			);

			dispatch({
				type: IMPORT_MASTER.SUCCESS,
				payload: {
					success: "success",
					masterName,
					data,
				},
			});
		} catch (error) {
			dispatch({ type: IMPORT_MASTER.FAILURE, payload: error });
		}
	};

export const downloadFile = file => async (dispatch, getState) => {
	try {
		dispatch({ type: DOWNLOAD_FILE.REQUEST });

		axios
			.get(`${base_url}/files/${file?.id}`, {
				headers: {
					Authorization: `Bearer ${getState().userDetails?.token}`,
				},
				responseType: "blob",
			})
			.then(response => {
				let url = window.URL.createObjectURL(new Blob([response.data]));
				let a = document.createElement("a");
				a.href = url;
				a.download = file?.name;
				a.click();
			});

		dispatch({
			type: DOWNLOAD_FILE.SUCCESS,
			payload: {
				success: "success",
			},
		});
	} catch (error) {
		dispatch({ type: DOWNLOAD_FILE.FAILURE, payload: error });
	}
};
