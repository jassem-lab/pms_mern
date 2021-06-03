import axios from 'axios'
import {
  POSITION_REQUEST,
  POSITION_SUCCESS,
  POSITION_FAIL,
  POSITION_CREATE_FAIL,
  POSITION_CREATE_REQUEST,
  POSITION_CREATE_SUCCESS,
  POSITION_UPDATE_FAIL,
  POSITION_UPDATE_SUCCESS,
  POSITION_UPDATE_REQUEST,
  POSITION_DELETE_REQUEST,
  POSITION_DELETE_SUCCESS,
  POSITION_DELETE_FAIL,
} from '../constants/positionConstants'

export const listPosition = () => async (dispatch) => {
  try {
    dispatch({ type: POSITION_REQUEST })

    const { data } = await axios.get(`/api/positions`)

    dispatch({
      type: POSITION_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POSITION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPosition = (positionData) => async (dispatch, getState) => {
  try {
    dispatch({ type: POSITION_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/positions`, positionData, config)

    dispatch({
      type: POSITION_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POSITION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePosition = (positionData) => async (dispatch, getState) => {
  try {
    dispatch({ type: POSITION_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(`/api/positions/${positionData.id}`, positionData, config)

    dispatch({
      type: POSITION_UPDATE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: POSITION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletePosition = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POSITION_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/positions/${id}`, config)

    dispatch({
      type: POSITION_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: POSITION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
