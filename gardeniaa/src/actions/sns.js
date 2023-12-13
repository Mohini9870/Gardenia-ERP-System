import axios from "axios";
import {
  ADD_SNS_LIST,
  EDIT_SNS_LIST,
  GET_DROPDOWN_LIST,
  GET_SNS_LIST,
} from "../constants/sns";
import stringifyQueryParams from "../utils/stringifyQueryParams";
import { base_url } from "./baseUrls";

export const getSNSList =
  (snsName, query = {}) =>
  async (dispatch, getState) => {
    try {
      const queryString = stringifyQueryParams(query);
      dispatch({ type: GET_SNS_LIST.REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().userDetails?.token}`,
        },
      };

      const { data } = await axios.get(
        `${base_url}/${snsName}?${queryString}`,
        config
      );

      dispatch({
        type: GET_SNS_LIST.SUCCESS,
        payload: {
          success: "success",
          data,
          snsName,
        },
      });
    } catch (error) {
      dispatch({ type: GET_SNS_LIST.FAILURE, payload: error });
    }
  };

export const addSNSList =
  (snsName, snsData, status = null, configType = "application/json") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_SNS_LIST.REQUEST });

      const config = {
        headers: {
          "Content-Type": configType,
          Authorization: `Bearer ${getState().userDetails?.token}`,
        },
      };

      const { data } = await axios.post(
        `${base_url}/${snsName}`,
        snsData,
        config
      );
      dispatch({
        type: ADD_SNS_LIST.SUCCESS,
        payload: {
          success: "success",
          data,
          status,
          snsName,
        },
      });
    } catch (error) {
      dispatch({ type: ADD_SNS_LIST.FAILURE, payload: error });
    }
  };

export const editSNSList =
  (snsName, snsData, id, status, configType = "application/json") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EDIT_SNS_LIST.REQUEST });

      const config = {
        headers: {
          "Content-Type": configType,
          Authorization: `Bearer ${getState().userDetails?.token}`,
        },
      };

      const { data } = await axios.put(
        `${base_url}/${snsName}/${id}`,
        snsData,
        config
      );
      dispatch({
        type: EDIT_SNS_LIST.SUCCESS,
        payload: {
          success: "success",
          data,
          status,
          snsName,
        },
      });
    } catch (error) {
      dispatch({ type: EDIT_SNS_LIST.FAILURE, payload: error });
    }
  };

export const getDropdownList =
  (snsName, query = {}) =>
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

      const { data } = await axios.get(
        `${base_url}/${snsName}/dropdown?${queryString}`,
        config
      );

      dispatch({
        type: GET_DROPDOWN_LIST.SUCCESS,
        payload: {
          success: "success",
          data,
          snsName,
        },
      });
    } catch (error) {
      dispatch({ type: GET_DROPDOWN_LIST.FAILURE, payload: error });
    }
  };
