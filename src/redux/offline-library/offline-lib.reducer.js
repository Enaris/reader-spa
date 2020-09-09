import OfflineLibActionTypes from "./offline-lib.types";

const INITIAL_STATE = {
   
  readings: [], 
  tags: [], 

  // filters: {
  //   title: '', 
  //   tags: []
  // }
  filtersTitle: '', 
  filtersTags: []

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
        readings: [ ...state.readings, action.payload.data ],
        tags: [ ...state.tags, ...action.payload.newTags ]
      }
    case OfflineLibActionTypes.SET_FILTERS: 
      return {
        ...state, 
        filtersTitle: action.payload.title, 
        filtersTags: action.payload.tags
      }
    default:
      return state;
  }
}

export default OfflineLibReducer;