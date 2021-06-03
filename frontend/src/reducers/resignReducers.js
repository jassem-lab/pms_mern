import {
  RESIGN_REQUEST,
  RESIGN_SUCCESS,
  RESIGN_FAIL,
  RESIGN_RESET,
  RESIGN_CREATE_REQUEST,
  RESIGN_CREATE_SUCCESS,
  RESIGN_CREATE_FAIL,
  RESIGN_CREATE_RESET,
  RESIGN_UPDATE_REQUEST,
  RESIGN_UPDATE_SUCCESS,
  RESIGN_UPDATE_FAIL,
  RESIGN_UPDATE_RESET,
  RESIGN_DELETE_REQUEST,
  RESIGN_DELETE_SUCCESS,
  RESIGN_DELETE_FAIL,
} from '../constants/resignConstants'
import { CLEAR_ALERTS } from '../constants/userConstants'

export const resignListReducer = (state = { resigns: [] }, action) => {
  switch (action.type) {
    case RESIGN_REQUEST:
      return {
        loading: true,
      }
    case RESIGN_SUCCESS:
      return {
        loading: false,
        resigns: action.payload,
      }
    case RESIGN_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case RESIGN_RESET:
      return {
        resigns: [],
      }
    default:
      return state
  }
}

export const resignCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RESIGN_CREATE_REQUEST:
      return {
        loading: true,
      }
    case RESIGN_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        resigns: action.payload,
      }
    case RESIGN_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case RESIGN_CREATE_RESET:
      return {}
    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}

export const resignUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case RESIGN_UPDATE_REQUEST:
      return {
        loading: true,
      }
    case RESIGN_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case RESIGN_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case RESIGN_UPDATE_RESET:
      return {}
    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}

export const resignDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case RESIGN_DELETE_REQUEST:
      return {
        loading: true,
      }
    case RESIGN_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case RESIGN_DELETE_FAIL:
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
