const defaultState = {
    list: [],
    searchTerm: '',
    searchResults: [],
    rsvpCounts: {},
    isLoading: false,
    error: {}
};

const manageReducer = (state=defaultState, action) => {
    switch(action.type) {
        case 'GET_LIST_START':
            return {
                ...state,
                list: [],
                isLoading: true,
                error: {}
            }
        case 'GET_LIST_COMPLETE':
            return {
                ...state,
                list: action.payload.list,
                isLoading: false,
                error: {}
            }
        case 'GET_LIST_ERROR':
            return {
                ...state,
                list: [],
                isLoading: false,
                error: action.payload.err
            }
        case 'SEARCH_TERM':
            return {
                ...state,
                searchTerm: action.payload.searchTerm
            }
        case 'SEARCH_START':
            return {
                ...state,
                searchResults: []
            }
        case 'SEARCH_COMPLETE':
            return {
                ...state,
                isSearch: true,
                searchResults: action.payload.searchResults
            }
        case 'SEARCH_ERROR':
            return {
                ...state,
                isSearch: false,
                searchResults: []
            }
        case 'GET_RSVP_COUNTS_START':
            return {
                ...state,
                rsvpCounts: {}
            };
        case 'GET_RSVP_COUNTS_COMPLETE':
            return {
                ...state,
                rsvpCounts: action.payload
            };
        case 'GET_RSVP_COUNTS_ERROR':
            return {
                ...state,
                rsvpCounts: {}
            };
        default: 
            return { ...state };
    };
};

export default manageReducer;
