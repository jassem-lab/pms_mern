import {
  EMPLOYEE_REQUEST,
  EMPLOYEE_SUCCESS,
  EMPLOYEE_FAIL,
  EMPLOYEE_RESET,
  EMPLOYEE_CREATE_REQUEST,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_CREATE_FAIL,
  EMPLOYEE_CREATE_RESET,
  EMPLOYEE_UPDATE_REQUEST,
  EMPLOYEE_UPDATE_SUCCESS,
  EMPLOYEE_UPDATE_FAIL,
  EMPLOYEE_UPDATE_RESET,
  EMPLOYEE_DELETE_REQUEST,
  EMPLOYEE_DELETE_SUCCESS,
  EMPLOYEE_DELETE_FAIL,
} from '../constants/employeeConstants'
import { CLEAR_ALERTS } from '../constants/userConstants'

export const employeeListReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case EMPLOYEE_REQUEST:
      return {
        loading: true,
      }
    case EMPLOYEE_SUCCESS:
      return {
        loading: false,
        employees: action.payload,
      }
    case EMPLOYEE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case EMPLOYEE_RESET:
      return {
        employees: [],
      }
    default:
      return state
  }
}

export const employeeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_CREATE_REQUEST:
      return {
        loading: true,
      }
    case EMPLOYEE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        employees: action.payload,
      }
    case EMPLOYEE_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case EMPLOYEE_CREATE_RESET:
      return {}
    case CLEAR_ALERTS:
      return {
        success: false,
      }
    default:
      return state
  }
}

export const employeeUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE_REQUEST:
      return {
        loading: true,
      }
    case EMPLOYEE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case EMPLOYEE_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case EMPLOYEE_UPDATE_RESET:
      return {}
    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}

export const employeeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_DELETE_REQUEST:
      return {
        loading: true,
      }
    case EMPLOYEE_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case EMPLOYEE_DELETE_FAIL:
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
