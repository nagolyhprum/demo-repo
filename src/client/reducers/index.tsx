import { combineReducers } from "redux";

import total, { ITotal } from "./total";

export interface IState {
 total: ITotal;
}

export default combineReducers({
  total,
});
