import OfflineLibActionTypes from "./offline-lib.types";

const INITIAL_STATE = {
   
  readings: [], 
  tags: []

}

const OfflineLibReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OfflineLibActionTypes.SET_READINGS: 
      return {
        ...state,
        readings: action.payload 
      }
    case OfflineLibActionTypes.ADD_READING: 
      return {
        ...state, 
        readings: state.readings.push(action.payload)
      }

    default:
        return state;
  }
}

export default OfflineLibReducer;