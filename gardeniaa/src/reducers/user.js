import { CLEAR_USER_DETAILS, LOGIN_USER, LOGOUT_USER } from "../constants/user";

const initialState = {
	isUserLoggingIn: false,
	isLoggedIn: false,
	role: null,
	token: null,
	isUserLoggingOut: false,
	isRoleUser: false,
	isRoleMis: false,
	isRoleRsm: false,
};

export const getUserDetails = state => {
	return state.userDetails;
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOGIN_USER.REQUEST:
			return { ...state, isUserLoggingIn: true };
		case LOGIN_USER.SUCCESS:
			return {
				...state,
				role: payload?.data?.role,
				isRoleUser: payload?.data?.role === "USER",
				isRoleMis: payload?.data?.role === "MIS",
				isRoleRsm: payload?.data?.role === "RSM",
				isRoleDistApprover: payload?.data?.role === "DISTAPPROVER",
				isRoleProductApprover:payload?.data?.role === "PRODUCTAPPROVER",
				isRoleProduct:payload?.data?.role === "PRODUCT",
				isLoggedIn: true,
				isUserLoggingIn: false,
				token: payload?.data?.token,
			};
		case LOGIN_USER.FAILURE:
			return {
				...state,
				isUserLoggingIn: false,
			};
		case LOGOUT_USER.REQUEST:
			return { ...state, isUserLoggingOut: true };
		case LOGOUT_USER.SUCCESS:
		case CLEAR_USER_DETAILS:
			return {
				...state,
				role: null,
				token: null,
				isLoggedIn: false,
				isUserLoggingOut: false,
			};
		case LOGOUT_USER.FAILURE:
			return {
				...state,
				isUserLoggingOut: false,
			};
		default:
			return state;
	}
};
