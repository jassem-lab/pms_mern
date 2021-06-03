import axios from 'axios';
import {
  NEWS_UP_REQUEST,
  NEWS_UP_SUCCESS,
  NEWS_UP_FAIL,
  NEWS_UP_CREATE_FAIL,
  NEWS_UP_CREATE_REQUEST,
  NEWS_UP_CREATE_SUCCESS,
  NEWS_UP_UPDATE_FAIL,
  NEWS_UP_UPDATE_SUCCESS,
  NEWS_UP_UPDATE_REQUEST,
  NEWS_UP_DELETE_REQUEST,
  NEWS_UP_DELETE_SUCCESS,
  NEWS_UP_DELETE_FAIL,
} from '../constants/newsConstants';

export const NewsUp = () => async (dispatch, getState) => {
  try {
    dispatch({ type: NEWS_UP_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get('/api/news', config);
    dispatch({
      type: NEWS_UP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEWS_UP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNewsUp = (wuData) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEWS_UP_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post('/api/news', wuData, config);
    dispatch({
      type: NEWS_UP_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEWS_UP_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateNews = (wuData) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEWS_UP_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(`/api/news/${wuData._id}`, wuData, config);
    dispatch({ type: NEWS_UP_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: NEWS_UP_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteNewsUp = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEWS_UP_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/news/${id}`, config);
    dispatch({ type: NEWS_UP_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: NEWS_UP_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
