const defaultState = {
    list: [],
    searchTerm: '',
    searchResults: [],
    rsvpCounts: {},
    isLoading: false,
    error: {}
};

const childrensManageReducer = (state=defaultState, action) => {
    switch(action.type) {
        case 'GET_CHILDRENS_LIST_START':
            return {
                ...state,
                list: [],
                isLoading: true,
                error: {}
            }
        case 'GET_CHILDRENS_LIST_COMPLETE':
            return {
                ...state,
                list: action.payload.list,
                isLoading: false,
                error: {}
            }
        case 'GET_CHILDRENS_LIST_ERROR':
            return {
                ...state,
                list: [],
                isLoading: false,
                error: action.payload.err
            }
        case 'CHILDRENS_SEARCH_TERM':
            return {
                ...state,
                searchTerm: action.payload.searchTerm
            }
        case 'CHILDRENS_SEARCH_START':
            return {
                ...state,
                searchResults: []
            }
        case 'CHILDRENS_SEARCH_COMPLETE':
            return {
                ...state,
                isSearch: true,
                searchResults: action.payload.searchResults
            }
        case 'CHILDRENS_SEARCH_ERROR':
            return {
                ...state,
                isSearch: false,
                searchResults: []
            }
        case 'GET_CHILDRENS_RSVP_COUNTS_START':
            return {
                ...state,
                rsvpCounts: {}
            };
        case 'GET_CHILDRENS_RSVP_COUNTS_COMPLETE':
            return {
                ...state,
                rsvpCounts: action.payload
            };
        case 'GET_CHILDRENS_RSVP_COUNTS_ERROR':
            return {
                ...state,
                rsvpCounts: {}
            };
        case 'CHILDRENS_SEARCH_TERM':
            return {
                ...state,
                searchTerm: action.payload.searchTerm
            }
        default: 
            return { ...state };
    };
};

export default childrensManageReducer;
