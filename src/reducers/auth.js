const defaultState= {
    authenticated: false,
    childrensAuthenticated: false,
    isLoading: false,
    hasError: false,
    error: {}
};

const authReducer = (state=defaultState, action) => {
    switch(action.type) {
        case 'CHILDRENS_LOGIN_START':
        case 'LOGIN_START':
            return { 
                ...state, 
                authenticated: false,
                childrensAuthenticated: false,
                isLoading: true,
                hasError: false,
                error: {}
            };
        case 'LOGIN_COMPLETE':
            return {
                ...state,
                authenticated: true,
                childrensAuthenticated: false,
                isLoading: false,
                hasError: false,
                error: {}
            };
        case 'CHILDRENS_LOGIN_ERROR':
        case 'LOGIN_ERROR':
            return {
                ...state,
                authenticated: false,
                childrensAuthenticated: false,
                isLoading: false,
                hasError: true,
                error: action.payload.err
            };
        case 'CHILDRENS_UNAUTHENTICATE':
        case 'UNAUTHENTICATE':
            return {
                ...state,
                authenticated: false,
                childrensAuthenticated: false,
                isLoading: false,
                hasError: false,
                error: {}
            };
        case 'CHILDRENS_LOGIN_COMPLETE':
            return {
                ...state,
                authenticated: false,
                childrensAuthenticated: true,
                isLoading: false,
                hasError: false,
                error: {}
            };
        default:
            return { ...state };
    }
};

export default authReducer;
