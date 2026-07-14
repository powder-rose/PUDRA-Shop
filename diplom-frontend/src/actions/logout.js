import { ACTION_TYPES } from "./action-types.js";
import {request} from "../utilits/request.js";

export const logout = () => {
  request('/logout', 'POST' );

  return {
    type: ACTION_TYPES.LOGOUT,
  };
};
