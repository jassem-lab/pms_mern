import {
  NEWS_UP_REQUEST,
  NEWS_UP_SUCCESS,
  NEWS_UP_FAIL,
  NEWS_UP_RESET,
  NEWS_UP_CREATE_FAIL,
  NEWS_UP_CREATE_REQUEST,
  NEWS_UP_CREATE_SUCCESS,
  NEWS_UP_CREATE_RESET,
  NEWS_UP_UPDATE_FAIL,
  NEWS_UP_UPDATE_SUCCESS,
  NEWS_UP_UPDATE_REQUEST,
  NEWS_UP_UPDATE_RESET,
  NEWS_UP_DELETE_REQUEST,
  NEWS_UP_DELETE_SUCCESS,
  NEWS_UP_DELETE_FAIL,
} from '../constants/newsConstants';

import { CLEAR_ALERTS } from '../constants/userConstants';

export const newsUpListReducer = (state = { newsUps: [] }, action) => {
  switch (action.type) {
    case NEWS_UP_REQUEST:
      return {
        loading: true,
      };
    case NEWS_UP_SUCCESS:
      return {
        loading: false,
        newsUps: action.payload,
      };
    case NEWS_UP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case NEWS_UP_RESET:
      return {
        newsUps: [],
      };
    default:
      return state;
  }
};

export const newsUpCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NEWS_UP_CREATE_REQUEST:
      return {
        loading: true,
      };
    case NEWS_UP_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        newsUps: action.payload,
      };
    case NEWS_UP_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case NEWS_UP_CREATE_RESET:
      return {};
    case CLEAR_ALERTS:
      return {
        success: false,
      };
    default:
      return state;
  }
};

export const newsUpUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case NEWS_UP_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case NEWS_UP_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case NEWS_UP_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case NEWS_UP_UPDATE_RESET:
      return {};
    case CLEAR_ALERTS:
      return {
        success: false,
      };

    default:
      return state;
  }
};

export const newsUpDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NEWS_UP_DELETE_REQUEST:
      return {
        loading: true,
      };
    case NEWS_UP_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case NEWS_UP_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ALERTS:
      return {
        success: false,
      };

    default:
      return state;
  }
};
