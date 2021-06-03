import {
  WRITE_UP_REQUEST,
  WRITE_UP_SUCCESS,
  WRITE_UP_FAIL,
  WRITE_UP_RESET,
  WRITE_UP_CREATE_REQUEST,
  WRITE_UP_CREATE_SUCCESS,
  WRITE_UP_CREATE_FAIL,
  WRITE_UP_CREATE_RESET,
  WRITE_UP_UPDATE_REQUEST,
  WRITE_UP_UPDATE_SUCCESS,
  WRITE_UP_UPDATE_FAIL,
  WRITE_UP_UPDATE_RESET,
  WRITE_UP_DELETE_REQUEST,
  WRITE_UP_DELETE_SUCCESS,
  WRITE_UP_DELETE_FAIL,
} from '../constants/writeUpConstants'
import { CLEAR_ALERTS } from '../constants/userConstants'

export const writeUpListReducer = (state = { writeUps: [] }, action) => {
  switch (action.type) {
    case WRITE_UP_REQUEST:
      return {
        loading: true,
      }
    case WRITE_UP_SUCCESS:
      return {
        loading: false,
        writeUps: action.payload,
      }
    case WRITE_UP_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case WRITE_UP_RESET:
      return {
        writeUps: [],
      }
    default:
      return state
  }
}

export const writeUpCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WRITE_UP_CREATE_REQUEST:
      return {
        loading: true,
      }
    case WRITE_UP_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        writeUps: action.payload,
      }
    case WRITE_UP_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case WRITE_UP_CREATE_RESET:
      return {}
    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}

export const writeUpUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case WRITE_UP_UPDATE_REQUEST:
      return {
        loading: true,
      }
    case WRITE_UP_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case WRITE_UP_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case WRITE_UP_UPDATE_RESET:
      return {}
    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}

export const writeUpDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case WRITE_UP_DELETE_REQUEST:
      return {
        loading: true,
      }
    case WRITE_UP_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case WRITE_UP_DELETE_FAIL:
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
