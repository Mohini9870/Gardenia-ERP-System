import {
  ADD_MASTER_LIST,
  APPROVE_MASTER,
  EDIT_MASTER_LIST,
  GET_DROPDOWN_LIST,
  GET_MASTER_LIST,
  REAPPROVE_MASTER,
  REJECT_MASTER,
} from "../constants/master";

const initialState = {
  isFetchingMasterList: false,
  isUpdatingMasterList: false,
  isFetchingDropdownList: false,
  isUpdatingMasterStatus: false,

  // COUNTRY
  countryMasterList: [],
  countryPagination: {
    totalPages: 1,
    pageSize: 10,
    totalElements: 10,
  },
  countryDropdownList: [],

  // STATE
  stateMasterList: [],
  statePagination: {
    totalPages: 1,
    pageSize: 10,
    totalElements: 10,
  },
  stateDropdownList: [],

  // REGION
  regionMasterList: [],
  regionPagination: {
    totalPages: 1,
    pageSize: 10,
    totalElements: 10,
  },
  regionDropdownList: [],

  // DISTRICT
  districtMasterList: [],
  districtPagination: {
    totalPages: 1,
    pageSize: 10,
    totalElements: 10,
  },
  districtDropdownList: [],

  // CITY
  cityMasterList: [],
  cityPagination: {
    totalPages: 1,
    pageSize: 10,
    totalElements: 10,
  },
  cityDropdownList: [],

  // AREA
  areaMasterList: [],
  areaPagination: {
    totalPages: 1,
    pageSize: 10,
    totalElements: 10,
  },
  areaDropdownList: [],

  // HQ
  hqmasterMasterList: [],
  hqmasterPagination: {
    totalPages: 1,
    pageSize: 10,
    totalElements: 10,
  },
  hqDropdownList: [],
  parentHqDropdownList: [],

  // DESIGNATION
  hqdesignationDropdownList: [],

  // BRAND
  brandMasterList: [],
  brandPagination: {
    totalPages: 1,
    pageSize: 10,
    totalElements: 10,
  },
  brandDropdownList: [],

  // CATEGORY
  categoryMasterList: [],
  categoryPagination: {
    totalPages: 1,
    pageSize: 10,
    totalElements: 10,
  },
  categoryDropdownList: [],
  categoryBrandDropdownList: [],

  // FAMILY
  familyMasterList: [],
  familyPagination: {
    totalPages: 1,
    pageSize: 10,
    totalElements: 10,
  },
  familyDropdownList: [],

  // PRODUCT
  productMasterList: [],
  productPagination: {
    totalPages: 1,
    pageSize: 10,
    totalElements: 10,
  },
  uomDropdownList: [],
  statusDropdownList: [],

  // DISTRIBUTOR
  distributorMasterList: [],
  distributorPagination: {
    totalPages: 1,
    pageSize: 10,
    totalElements: 10,
  },
  serviceStatusDropdownList: [],
  assignTsoDropdownList: [],
  typeOfDistributorDropdownList: [],

  // USER
  userMasterList: [],
  userPagination: {
    totalPages: 1,
    pageSize: 10,
    totalElements: 10,
  },
  titleDropdownList: [],
  genderDropdownList: [],
  paymentModeDropdownList: [],
  maritalStatusDropdownList: [],
  employeeNameDropdownList: [],
  roleDropdownList: [],
  branchDropdownList: [],

  // Update Stock
  updatestockMasterList: [],
  updatestockMasterPagination: {
    totalPages: 1,
    pageSize: 10,
    totalElements: 10,
  },
  updatestockDropdownList: [],

  // IMPORT
  isImportingMaster: false,
};

export const getIsUpdatingMasterList = (state) => {
  return state?.masterList?.isUpdatingMasterList;
};

export const getIsFetchingMasterList = (state) => {
  return state?.masterList?.isFetchingMasterList;
};

export const getIsFetchingDropdownList = (state) => {
  return state?.masterList?.isFetchingDropdownList;
};

export const getIsUpdatingMasterStatus = (state) => {
  return state?.masterList?.isUpdatingMasterStatus;
};
//country
export const getCountryMasterList = (state) => {
  return state?.masterList?.countryMasterList;
};

export const getCountryPagination = (state) => {
  return state?.masterList?.countryPagination;
};

export const getCountryDropdownList = (state) => {
  return state?.masterList?.countryDropdownList;
};

//state
export const getStateMasterList = (state) => {
  return state?.masterList?.stateMasterList;
};

export const getStatePagination = (state) => {
  return state?.masterList?.statePagination;
};

export const getStateDropdownList = (state) => {
  return state?.masterList?.stateDropdownList;
};

//region
export const getRegionMasterList = (state) => {
  return state?.masterList?.regionMasterList;
};

export const getRegionPagination = (state) => {
  return state?.masterList?.regionPagination;
};

export const getRegionDropdownList = (state) => {
  return state?.masterList?.regionDropdownList;
};

//district
export const getDistrictMasterList = (state) => {
  return state?.masterList?.districtMasterList;
};

export const getDistrictPagination = (state) => {
  return state?.masterList?.districtPagination;
};

export const getDistrictDropdownList = (state) => {
  return state?.masterList?.districtDropdownList;
};

//city
export const getCityMasterList = (state) => {
  return state?.masterList?.cityMasterList;
};

export const getCityPagination = (state) => {
  return state?.masterList?.cityPagination;
};

export const getCityDropdownList = (state) => {
  return state?.masterList?.cityDropdownList;
};

//area
export const getAreaMasterList = (state) => {
  return state?.masterList?.areaMasterList;
};

export const getAreaPagination = (state) => {
  return state?.masterList?.areaPagination;
};

export const getAreaDropdownList = (state) => {
  return state?.masterList?.areaDropdownList;
};
//hq
export const getHqmasterMasterList = (state) => {
  return state?.masterList?.hqmasterMasterList;
};

export const getHqmasterPagination = (state) => {
  return state?.masterList?.hqmasterPagination;
};

export const getHqDropdownList = (state) => {
  return state?.masterList?.hqDropdownList;
};

export const getParentHqDropdownList = (state) => {
  return state?.masterList?.parentHqDropdownList;
};

//designation
export const getHqDesignationDropdownList = (state) => {
  return state?.masterList?.hqdesignationDropdownList;
};

//brand
export const getBrandMasterList = (state) => {
  return state?.masterList?.brandMasterList;
};

export const getBrandPagination = (state) => {
  return state?.masterList?.brandPagination;
};

export const getBrandDropdownList = (state) => {
  return state?.masterList?.brandDropdownList;
};

//category
export const getCategoryMasterList = (state) => {
  return state?.masterList?.categoryMasterList;
};

export const getCategoryPagination = (state) => {
  return state?.masterList?.categoryPagination;
};

export const getCategoryDropdownList = (state) => {
  return state?.masterList?.categoryDropdownList;
};

export const getCategoryBrandDropdownList = (state) => {
  return state?.masterList?.categoryBrandDropdownList;
};

//family
export const getFamilyMasterList = (state) => {
  return state?.masterList?.familyMasterList;
};

export const getFamilyPagination = (state) => {
  return state?.masterList?.familyPagination;
};

export const getFamilyDropdownList = (state) => {
  return state?.masterList?.familyDropdownList;
};

//product
export const getProductMasterList = (state) => {
  return state?.masterList?.productMasterList;
};

export const getProductPagination = (state) => {
  return state?.masterList?.productPagination;
};

export const getUomDropdownList = (state) => {
  return state?.masterList?.uomDropdownList;
};

export const getStatusDropdownList = (state) => {
  return state?.masterList?.statusDropdownList;
};

//distributor
export const getDistributorMasterList = (state) => {
  return state?.masterList?.distributorMasterList;
};

export const getDistributorPagination = (state) => {
  return state?.masterList?.distributorPagination;
};

export const getServiceStatusDropdown = (state) => {
  return state?.masterList?.serviceStatusDropdownList;
};

export const getTypeOfDistributorDropdownListDropdown = (state) => {
  return state?.masterList?.typeOfDistributorDropdownList;
};

//user
export const getUserMasterList = (state) => {
  return state?.masterList?.userMasterList;
};

export const getUserPagination = (state) => {
  return state?.masterList?.userPagination;
};

export const getAssignTsoDropdown = (state) => {
  return state?.masterList?.assignTsoDropdownList;
};

export const getTitleDropdownList = (state) => {
  return state?.masterList?.titleDropdownList;
};

export const getMaritalStatusDropdownList = (state) => {
  return state?.masterList?.maritalStatusDropdownList;
};

export const getGenderDropdownList = (state) => {
  return state?.masterList?.genderDropdownList;
};

export const getPaymentModeDropdownList = (state) => {
  return state?.masterList?.paymentModeDropdownList;
};

export const getRoleDropdownList = (state) => {
  return state?.masterList?.roleDropdownList;
};

export const getEmployeeNameDropdownList = (state) => {
  return state?.masterList?.employeeNameDropdownList;
};

export const getBranchDropdownList = (state) => {
  return state?.masterList?.branchDropdownList;
};

//update stock
export const getUpdatestockMasterList = (state) => {
  return state?.masterList?.updatestockMasterList;
};

export const getUpdatestockPagination = (state) => {
  return state?.masterList?.updatestockPagination;
};

export const getUpdatestockDropdownList = (state) => {
  return state?.masterList?.updatestokeDropdownList;
};
export const getUpdatestockDistributorDropdownList = (state) => {
  return state?.masterList?.getUpdatestockDistributorDropdownList;
};

//import
export const getIsImportingMaster = (state) => {
  return state?.masterList?.isImportingMaster;
};

export const masterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MASTER_LIST.REQUEST:
      return { ...state, isFetchingMasterList: true };
    case GET_MASTER_LIST.SUCCESS:
      return {
        ...state,
        isFetchingMasterList: false,
        [`${payload?.masterName}MasterList`]: payload?.data?.data,
        [`${payload?.masterName}Pagination`]: payload?.data?.pagination,
      };
    case GET_MASTER_LIST.FAILURE:
      return { ...state, isFetchingMasterList: false };

    case EDIT_MASTER_LIST.REQUEST:
    case REAPPROVE_MASTER.REQUEST:
    case ADD_MASTER_LIST.REQUEST:
      return { ...state, isUpdatingMasterList: true };
    case ADD_MASTER_LIST.SUCCESS:
    case EDIT_MASTER_LIST.SUCCESS:
    case REAPPROVE_MASTER.SUCCESS:
    case ADD_MASTER_LIST.FAILURE:
    case EDIT_MASTER_LIST.FAILURE:
    case REAPPROVE_MASTER.FAILURE:
      return {
        ...state,
        isUpdatingMasterList: false,
      };

    case GET_DROPDOWN_LIST.REQUEST:
      return { ...state, isFetchingDropdownList: true };
    case GET_DROPDOWN_LIST.SUCCESS:
      return {
        ...state,
        isFetchingDropdownList: false,
        [`${payload?.masterName}DropdownList`]: payload?.data,
      };
    case GET_DROPDOWN_LIST.FAILURE:
      return { ...state, isFetchingDropdownList: false };

    case APPROVE_MASTER.REQUEST:
    case REJECT_MASTER.REQUEST:
      return { ...state, isUpdatingMasterStatus: true };
    case APPROVE_MASTER.SUCCESS:
    case REJECT_MASTER.SUCCESS:
      return {
        ...state,
        isUpdatingMasterStatus: false,
      };
    case APPROVE_MASTER.FAILURE:
    case REJECT_MASTER.FAILURE:
      return { ...state, isUpdatingMasterStatus: false };
    default:
      return state;
  }
};
