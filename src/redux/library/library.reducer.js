import LibraryActionTypes from './library.types.js';

const INITIAL_STATE = {
   
  addingReading: false,
  addReadingErrors: null, 

  tags: [], 
  fetchingTags: false,
  fetchingTagsErrors: null,

  tagDetails: null, 
  fetchingTagDetails: false,
  fetchingTagDetailsErrors: null,

  tableTags: [], 
  fetchingTableTags: false,
  fetchingTableTagsErrors: null,

  readings: [], 
  fetchingReadings: false, 
  fetchingReadingsErrors: null, 

  selectedReading: null, 
  fetchingSelectedReading: false, 
  fetchingSelectedReadingErrors: null,

  updatingReading: false, 
  updatingErrors: null, 

  deletingReading: false, 
  deletingErrors: null, 

  deletingTag: false, 
  deletingTagErrors: null
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
    case LibraryActionTypes.ADD_READING_SET_ERRORS: 
      return {
        ...state,
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
      
    case LibraryActionTypes.FETCH_TAG_DETAILS_START: 
      return {
        ...state,
        tagDetails: null, 
        fetchingTagDetails: true,
        fetchingTagDetailsErrors: null
      }
    case LibraryActionTypes.FETCH_TAG_DETAILS_SUCCESS: 
      return {
        ...state,
        tagDetails: action.payload, 
        fetchingTagDetails: false,
        fetchingTagDetailsErrors: null
      }
    case LibraryActionTypes.FETCH_TAG_DETAILS_FAILURE: 
      return {
        ...state,
        tagDetails: null, 
        fetchingTagDetails: false,
        fetchingTagDetailsErrors: action.payload
      }

    case LibraryActionTypes.FETCH_TABLE_TAGS_START: 
      return {
        ...state,
        tableTags: [], 
        fetchingTableTags: true,
        fetchingTableTagsErrors: null
      }
    case LibraryActionTypes.FETCH_TABLE_TAGS_SUCCESS: 
      return {
        ...state,
        tableTags: action.payload, 
        fetchingTableTags: false,
        fetchingTableTagsErrors: null
      }
    case LibraryActionTypes.FETCH_TABLE_TAGS_FAILURE: 
      return {
        ...state,
        tableTags: [], 
        fetchingTableTags: false,
        fetchingTableTagsErrors: action.payload
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

    case LibraryActionTypes.DELETE_TAG_ONLINE_SUCCESS: 
      return {
        ...state,
        deletingTag: false, 
        deletingTagErrors: null
      }
    case LibraryActionTypes.DELETE_TAG_ONLINE_FAILURE: 
      return {
        ...state,
        deletingTag: false, 
        deletingTagErrors: action.payload
      }
    default:
      return state;
  }
}

export default LibraryReducer;