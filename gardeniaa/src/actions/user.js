import axios from "axios";
import { CLEAR_USER_DETAILS, LOGIN_USER, LOGOUT_USER } from "../constants/user";
import { base_url } from "./baseUrls";

export const userLogin = body => async dispatch => {
	try {
		dispatch({ type: LOGIN_USER.REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(`${base_url}/signin`, body, config);

		dispatch({
			type: LOGIN_USER.SUCCESS,
			payload: {
				success: "success",
				data,
			},
		});
	} catch (error) {
		dispatch({ type: LOGIN_USER.FAILURE, payload: error });
	}
};

export const userLogout = () => async (dispatch, getState) => {
	try {
		dispatch({ type: LOGOUT_USER.REQUEST });

		const token = getState().userDetails?.token;

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};

		await axios.post(`${base_url}/signout`, { token }, config);

		dispatch({
			type: LOGOUT_USER.SUCCESS,
			payload: {
				success: "success",
			},
		});
	} catch (error) {
		dispatch({ type: LOGOUT_USER.FAILURE, payload: error });
	}
};

export const clearUserDetails = () => async dispatch => {
	dispatch({ type: CLEAR_USER_DETAILS });
};
