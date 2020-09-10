import OfflineLibActionTypes from "./offline-lib.types";

const INITIAL_STATE = {
   
  readings: [], 
  tags: [], 

  readingsPositions: [], 

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
        tags: [ ...state.tags, ...action.payload.newTags ], 
        readingsPositions: [ ...state.readingsPositions, { readingId: action.payload.data.id, position: 0 } ]
      }
    case OfflineLibActionTypes.SET_FILTERS: 
      return {
        ...state, 
        filtersTitle: action.payload.title, 
        filtersTags: action.payload.tags
      }
    case OfflineLibActionTypes.SET_READING_POSITION: 
      const { readingId, position } = action.payload;
      return {
        ...state, 
        readingsPositions: 
          state.readingsPositions.map(rp => +rp.readingId === +readingId ? { ...rp, position: position} : rp)
      }
    case OfflineLibActionTypes.SET_READING_POSITIONS: 
      return {
        ...state, 
        readingsPositions: action.paylod
      }
    default:
      return state;
  }
}

export default OfflineLibReducer;