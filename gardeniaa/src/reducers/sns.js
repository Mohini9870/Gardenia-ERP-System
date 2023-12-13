import {
  ADD_SNS_LIST,
  APPROVE_SNS,
  EDIT_SNS_LIST,
  GET_DROPDOWN_LIST,
  GET_SNS_LIST,
  REAPPROVE_SNS,
  REJECT_SNS,
} from "../constants/sns";

const initialState = {
  isFetchingSNSList: false,
  isUpdatingSNSList: false,
  isFetchingDropdownList: false,
  isUpdatingSNSStatus: false,

  // Update Stock
  updatestockSNSList: [],
  updatestockSNSPagination: {
    totalPages: 1,
    pageSize: 10,
    totalElements: 10,
  },
  updatestockDropdownList: [],
  // parentHqDropdownList: [],

  // IMPORT
  isImportingSNS: false,
};

export const getIsUpdatingSNSList = (state) => {
  return state?.snsList?.isUpdatingSNSList;
};

export const getIsFetchingSNSList = (state) => {
  return state?.snsList?.isFetchingSNSList;
};

export const getIsFetchingDropdownList = (state) => {
  return state?.snsList?.isFetchingDropdownList;
};

export const getIsUpdatingSNSStatus = (state) => {
  return state?.snsList?.isUpdatingSNSStatus;
};
//region
export const getRegionDropdownList = (state) => {
  return state?.snsList?.regionDropdownList;
};

//update stock
export const getUpdatestockSNSList = (state) => {
  return state?.snsList?.updatestockSNSList;
};

export const getUpdatestockPagination = (state) => {
  return state?.snsList?.updatestockPagination;
};

export const getUpdatestockDropdownList = (state) => {
  return state?.snsList?.updatestokeDropdownList;
};
//designation
export const getUpdateStockDesignationDropdownList = (state) => {
  return state?.masterList?.updatestockdesignationDropdownList;
};

//import
export const getIsImportingSNS = (state) => {
  return state?.snsList?.isImportingSNS;
};

export const snsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SNS_LIST.REQUEST:
      return { ...state, isFetchingSNSList: true };
    case GET_SNS_LIST.SUCCESS:
      return {
        ...state,
        isFetchingSNSList: false,
        [`${payload?.snsName}SNSList`]: payload?.data?.data,
        [`${payload?.snsName}Pagination`]: payload?.data?.pagination,
      };
    case GET_SNS_LIST.FAILURE:
      return { ...state, isFetchingSNSList: false };

    case EDIT_SNS_LIST.REQUEST:
    case REAPPROVE_SNS.REQUEST:
    case ADD_SNS_LIST.REQUEST:
      return { ...state, isUpdatingSNSList: true };
    case ADD_SNS_LIST.SUCCESS:
    case EDIT_SNS_LIST.SUCCESS:
    case REAPPROVE_SNS.SUCCESS:
    case ADD_SNS_LIST.FAILURE:
    case EDIT_SNS_LIST.FAILURE:
    case REAPPROVE_SNS.FAILURE:
      return {
        ...state,
        isUpdatingSNSList: false,
      };

    case GET_DROPDOWN_LIST.REQUEST:
      return { ...state, isFetchingDropdownList: true };
    case GET_DROPDOWN_LIST.SUCCESS:
      return {
        ...state,
        isFetchingDropdownList: false,
        [`${payload?.snsName}DropdownList`]: payload?.data,
      };
    case GET_DROPDOWN_LIST.FAILURE:
      return { ...state, isFetchingDropdownList: false };

    case APPROVE_SNS.REQUEST:
    case REJECT_SNS.REQUEST:
      return { ...state, isUpdatingSNSStatus: true };
    case APPROVE_SNS.SUCCESS:
    case REJECT_SNS.SUCCESS:
      return {
        ...state,
        isUpdatingSNSStatus: false,
      };
    case APPROVE_SNS.FAILURE:
    case REJECT_SNS.FAILURE:
      return { ...state, isUpdatingSNSStatus: false };
    default:
      return state;
  }
};
