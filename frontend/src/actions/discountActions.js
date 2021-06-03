import axios from 'axios'
import {
  DISCOUNT_REQUEST,
  DISCOUNT_SUCCESS,
  DISCOUNT_FAIL,
  DISCOUNT_CREATE_FAIL,
  DISCOUNT_CREATE_REQUEST,
  DISCOUNT_CREATE_SUCCESS,
  DISCOUNT_UPDATE_FAIL,
  DISCOUNT_UPDATE_SUCCESS,
  DISCOUNT_UPDATE_REQUEST,
  DISCOUNT_DELETE_REQUEST,
  DISCOUNT_DELETE_SUCCESS,
  DISCOUNT_DELETE_FAIL,
} from '../constants/discountConstants'

export const listDiscount = () => async (dispatch) => {
  try {
    dispatch({ type: DISCOUNT_REQUEST })

    const { data } = await axios.get(`/api/discounts`)

    dispatch({
      type: DISCOUNT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DISCOUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createDiscount = (disData) => async (dispatch) => {
  try {
    dispatch({ type: DISCOUNT_CREATE_REQUEST })

    const { data } = await axios.post(`/api/discounts`, disData)

    dispatch({
      type: DISCOUNT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DISCOUNT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateDiscount = (disData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DISCOUNT_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(`/api/discounts/${disData._id}`, disData, config)

    dispatch({
      type: DISCOUNT_UPDATE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DISCOUNT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteDiscount = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DISCOUNT_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/discounts/${id}`, config)

    dispatch({
      type: DISCOUNT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DISCOUNT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
