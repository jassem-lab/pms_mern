import {
  LEAVE_REQUEST,
  LEAVE_SUCCESS,
  LEAVE_FAIL,
  LEAVE_RESET,
  LEAVE_CREATE_REQUEST,
  LEAVE_CREATE_SUCCESS,
  LEAVE_CREATE_FAIL,
  LEAVE_CREATE_RESET,
  LEAVE_UPDATE_REQUEST,
  LEAVE_UPDATE_SUCCESS,
  LEAVE_UPDATE_FAIL,
  LEAVE_UPDATE_RESET,
  LEAVE_DELETE_REQUEST,
  LEAVE_DELETE_SUCCESS,
  LEAVE_DELETE_FAIL,
} from '../constants/leaveConstants'
import { CLEAR_ALERTS } from '../constants/userConstants'

export const leaveListReducer = (state = { leaves: [] }, action) => {
  switch (action.type) {
    case LEAVE_REQUEST:
      return {
        loading: true,
      }
    case LEAVE_SUCCESS:
      return {
        loading: false,
        leaves: action.payload,
      }
    case LEAVE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case LEAVE_RESET:
      return {
        leaves: [],
      }
    default:
      return state
  }
}

export const leaveCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LEAVE_CREATE_REQUEST:
      return {
        loading: true,
      }
    case LEAVE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        leaves: action.payload,
      }
    case LEAVE_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case LEAVE_CREATE_RESET:
      return {}
    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}

export const leaveUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case LEAVE_UPDATE_REQUEST:
      return {
        loading: true,
      }
    case LEAVE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case LEAVE_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case LEAVE_UPDATE_RESET:
      return {}
    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}

export const leaveDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LEAVE_DELETE_REQUEST:
      return {
        loading: true,
      }
    case LEAVE_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case LEAVE_DELETE_FAIL:
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
