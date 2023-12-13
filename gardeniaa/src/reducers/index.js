import { reducer as formReducer } from "redux-form";
import { masterReducer } from "./master";
import { modalReducer } from "./modals";
import { userReducer } from "./user";

export const rootReducers = {
	userDetails: userReducer,
	masterList: masterReducer,
	modals: modalReducer,
	form: formReducer,
};
