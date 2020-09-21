import LibraryActionTypes from './library.types.js';

const INITIAL_STATE = {
   
  addingReading: false,
  addReadingErrors: null, 

  tags: [], 
  fetchingTags: false,
  fetchingTagsErrors: null,

  readings: [], 
  fetchingReadings: false, 
  fetchingReadingsErrors: null, 

  selectedReading: null, 
  fetchingSelectedReading: false, 
  fetchingSelectedReadingErrors: null,

  updatingReading: false, 
  updatingErrors: null, 

  deletingReading: false, 
  deletingErrors: null
}

const LibraryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LibraryActionTypes.ADD_READING_START: 
      return {
        ...state,
        addingReading: true, 
        addReadingErrors: null
      }
    case LibraryActionTypes.ADD_READING_SUCCESS: 
      return {
        ...state,
        addingReading: false, 
        addReadingErrors: null
      }
    case LibraryActionTypes.ADD_READING_FAILURE: 
      return {
        ...state,
        addingReading: false, 
        addReadingErrors: action.payload
      }

    case LibraryActionTypes.FETCH_TAGS_START: 
      return {
        ...state,
        tags: [], 
        fetchingTags: true,
        fetchingTagsErrors: null
      }
    case LibraryActionTypes.FETCH_TAGS_SUCCESS: 
      return {
        ...state,
        tags: action.payload, 
        fetchingTags: false,
        fetchingTagsErrors: null
      }
    case LibraryActionTypes.FETCH_TAGS_FAILURE: 
      return {
        ...state,
        tags: [], 
        fetchingTags: false,
        fetchingTagsErrors: action.payload
      }
      
    case LibraryActionTypes.FETCH_READINGS_START: 
      return {
        ...state,
        readings: [], 
        fetchingReadings: true, 
        fetchingReadingsErrors: null
      }
    case LibraryActionTypes.FETCH_READINGS_SUCCESS: 
      return {
        ...state,
        readings: action.payload, 
        fetchingReadings: false, 
        fetchingReadingsErrors: null
      }
    case LibraryActionTypes.FETCH_READINGS_FAILURE: 
      return {
        ...state,
        readings: [], 
        fetchingReadings: false, 
        fetchingReadingsErrors: action.payload
      }
      
    case LibraryActionTypes.FETCH_READING_START: 
      return {
        ...state,
        selectedReading: null, 
        fetchingSelectedReading: true, 
        fetchingSelectedReadingErrors: null
      }
    case LibraryActionTypes.FETCH_READING_SUCCESS: 
      return {
        ...state,
        selectedReading: action.payload, 
        fetchingSelectedReading: false, 
        fetchingSelectedReadingErrors: null
      }
    case LibraryActionTypes.FETCH_READING_FAILURE: 
      return {
        ...state,
        selectedReading: null, 
        fetchingSelectedReading: false, 
        fetchingSelectedReadingErrors: action.payload
      }

    case LibraryActionTypes.UPDATE_READING_ONLINE_START: 
      return {
        ...state,
        updatingReading: true, 
        updatingErrors: null
      }
    case LibraryActionTypes.UPDATE_READING_ONLINE_SUCCESS: 
      return {
        ...state,
        updatingReading: false, 
        updatingErrors: null
      }
    case LibraryActionTypes.UPDATE_READING_ONLINE_FAILURE: 
      return {
        ...state,
        updatingReading: false, 
        updatingErrors: action.payload
      }

    case LibraryActionTypes.DELETE_READING_ONLINE_START: 
      return {
        ...state,
        deletingReading: true, 
        deletingErrors: null
      }
    case LibraryActionTypes.DELETE_READING_ONLINE_SUCCESS: 
      return {
        ...state,
        deletingReading: false, 
        deletingErrors: null
      }
    case LibraryActionTypes.DELETE_READING_ONLINE_FAILURE: 
      return {
        ...state,
        deletingReading: false, 
        deletingErrors: action.payload
      }

    default:
      return state;
  }
}

export default LibraryReducer;