import axios from 'axios'
import {
  LEAVE_REQUEST,
  LEAVE_SUCCESS,
  LEAVE_FAIL,
  LEAVE_CREATE_FAIL,
  LEAVE_CREATE_REQUEST,
  LEAVE_CREATE_SUCCESS,
  LEAVE_UPDATE_FAIL,
  LEAVE_UPDATE_SUCCESS,
  LEAVE_UPDATE_REQUEST,
  LEAVE_DELETE_REQUEST,
  LEAVE_DELETE_SUCCESS,
  LEAVE_DELETE_FAIL,
} from '../constants/leaveConstants'

export const listLeave = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LEAVE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/leaves`, config)

    dispatch({
      type: LEAVE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LEAVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createLeave = (leaData) => async (dispatch, getState) => {
  try {
    dispatch({ type: LEAVE_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/leaves`, leaData, config)

    dispatch({
      type: LEAVE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LEAVE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateLeave = (leaData) => async (dispatch, getState) => {
  try {
    dispatch({ type: LEAVE_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(`/api/leaves/${leaData._id}`, leaData, config)

    dispatch({
      type: LEAVE_UPDATE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: LEAVE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteLeave = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LEAVE_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/leaves/${id}`, config)

    dispatch({
      type: LEAVE_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: LEAVE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
