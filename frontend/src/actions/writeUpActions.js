import axios from 'axios';
import {
  WRITE_UP_REQUEST,
  WRITE_UP_SUCCESS,
  WRITE_UP_FAIL,
  WRITE_UP_CREATE_FAIL,
  WRITE_UP_CREATE_REQUEST,
  WRITE_UP_CREATE_SUCCESS,
  WRITE_UP_UPDATE_FAIL,
  WRITE_UP_UPDATE_SUCCESS,
  WRITE_UP_UPDATE_REQUEST,
  WRITE_UP_DELETE_REQUEST,
  WRITE_UP_DELETE_SUCCESS,
  WRITE_UP_DELETE_FAIL,
} from '../constants/writeUpConstants';

export const listWriteUp = () => async (dispatch, getState) => {
  try {
    dispatch({ type: WRITE_UP_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/writeUp`, config);

    dispatch({
      type: WRITE_UP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WRITE_UP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createWriteUp = (wuData) => async (dispatch, getState) => {
  try {
    dispatch({ type: WRITE_UP_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/writeUp`, wuData, config);

    dispatch({
      type: WRITE_UP_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WRITE_UP_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateWriteUp = (wuData) => async (dispatch, getState) => {
  try {
    dispatch({ type: WRITE_UP_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/writeUp/${wuData._id}`, wuData, config);

    dispatch({
      type: WRITE_UP_UPDATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: WRITE_UP_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteWriteUp = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: WRITE_UP_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/writeUp/${id}`, config);

    dispatch({
      type: WRITE_UP_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: WRITE_UP_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
