import {
  POSITION_REQUEST,
  POSITION_SUCCESS,
  POSITION_FAIL,
  POSITION_RESET,
  POSITION_CREATE_REQUEST,
  POSITION_CREATE_SUCCESS,
  POSITION_CREATE_FAIL,
  POSITION_CREATE_RESET,
  POSITION_UPDATE_REQUEST,
  POSITION_UPDATE_SUCCESS,
  POSITION_UPDATE_FAIL,
  POSITION_UPDATE_RESET,
  POSITION_DELETE_REQUEST,
  POSITION_DELETE_SUCCESS,
  POSITION_DELETE_FAIL,
} from '../constants/positionConstants'
import { CLEAR_ALERTS } from '../constants/userConstants'

export const positionListReducer = (state = { positions: [] }, action) => {
  switch (action.type) {
    case POSITION_REQUEST:
      return {
        loading: true,
      }
    case POSITION_SUCCESS:
      return {
        loading: false,
        positions: action.payload,
      }
    case POSITION_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case POSITION_RESET:
      return {
        positions: [],
      }
    default:
      return state
  }
}

export const positionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POSITION_CREATE_REQUEST:
      return {
        loading: true,
      }
    case POSITION_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        positions: action.payload,
      }
    case POSITION_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case POSITION_CREATE_RESET:
      return {}
    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}

export const positionUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case POSITION_UPDATE_REQUEST:
      return {
        loading: true,
      }
    case POSITION_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case POSITION_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case POSITION_UPDATE_RESET:
      return {}
    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}

export const positionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POSITION_DELETE_REQUEST:
      return {
        loading: true,
      }
    case POSITION_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case POSITION_DELETE_FAIL:
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
