import { TOTAL_ADD, TOTAL_SUB } from "actions/total"

const INITIAL_STATE = 0

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case TOTAL_ADD:
      return state + 1
    case TOTAL_SUB:
      return state - 1
  }
  return state
}