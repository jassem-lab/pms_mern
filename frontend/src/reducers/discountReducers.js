import {
  DISCOUNT_REQUEST,
  DISCOUNT_SUCCESS,
  DISCOUNT_FAIL,
  DISCOUNT_RESET,
  DISCOUNT_CREATE_REQUEST,
  DISCOUNT_CREATE_SUCCESS,
  DISCOUNT_CREATE_FAIL,
  DISCOUNT_CREATE_RESET,
  DISCOUNT_UPDATE_REQUEST,
  DISCOUNT_UPDATE_SUCCESS,
  DISCOUNT_UPDATE_FAIL,
  DISCOUNT_UPDATE_RESET,
  DISCOUNT_DELETE_REQUEST,
  DISCOUNT_DELETE_SUCCESS,
  DISCOUNT_DELETE_FAIL,
} from '../constants/discountConstants'
import { CLEAR_ALERTS } from '../constants/userConstants'

export const discountListReducer = (state = { discounts: [] }, action) => {
  switch (action.type) {
    case DISCOUNT_REQUEST:
      return {
        loading: true,
      }
    case DISCOUNT_SUCCESS:
      return {
        loading: false,
        discounts: action.payload,
      }
    case DISCOUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case DISCOUNT_RESET:
      return {
        discounts: [],
      }
    default:
      return state
  }
}

export const discountCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DISCOUNT_CREATE_REQUEST:
      return {
        loading: true,
      }
    case DISCOUNT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        discounts: action.payload,
      }
    case DISCOUNT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case DISCOUNT_CREATE_RESET:
      return {}
    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}

export const discountUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DISCOUNT_UPDATE_REQUEST:
      return {
        loading: true,
      }
    case DISCOUNT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case DISCOUNT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case DISCOUNT_UPDATE_RESET:
      return {}
    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}

export const discountDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DISCOUNT_DELETE_REQUEST:
      return {
        loading: true,
      }
    case DISCOUNT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case DISCOUNT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}
