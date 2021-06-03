import axios from 'axios'
import {
  RESIGN_REQUEST,
  RESIGN_SUCCESS,
  RESIGN_FAIL,
  RESIGN_CREATE_FAIL,
  RESIGN_CREATE_REQUEST,
  RESIGN_CREATE_SUCCESS,
  RESIGN_UPDATE_FAIL,
  RESIGN_UPDATE_SUCCESS,
  RESIGN_UPDATE_REQUEST,
  RESIGN_DELETE_REQUEST,
  RESIGN_DELETE_SUCCESS,
  RESIGN_DELETE_FAIL,
} from '../constants/resignConstants'

export const listResign = () => async (dispatch) => {
  try {
    dispatch({ type: RESIGN_REQUEST })

    const { data } = await axios.get(`/api/resigns`)

    dispatch({
      type: RESIGN_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESIGN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createResign = (resignData) => async (dispatch, getState) => {
  try {
    dispatch({ type: RESIGN_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/resigns`, resignData, config)

    dispatch({
      type: RESIGN_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESIGN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateResign = (resignData) => async (dispatch, getState) => {
  try {
    dispatch({ type: RESIGN_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(`/api/resigns/${resignData.id}`, resignData, config)

    dispatch({
      type: RESIGN_UPDATE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: RESIGN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteResign = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: RESIGN_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/resigns/${id}`, config)

    dispatch({
      type: RESIGN_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: RESIGN_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
