import { createSelector } from "reselect";

import { IState } from "./reducers";

export const getTotal = (state: IState) => state.total;

createSelector(getTotal, (total: number) => total);
