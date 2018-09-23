const defaultState= {
    authenticated: false,
    isLoading: false,
    hasError: false,
    error: {}
};

const authReducer = (state=defaultState, action) => {
    switch(action.type) {
        case 'LOGIN_START':
            return { 
                ...state, 
                authenticated: false,
                isLoading: true,
                hasError: false,
                error: {}
            };
        case 'LOGIN_COMPLETE':
            return {
                ...state,
                authenticated: true,
                isLoading: false,
                hasError: false,
                error: {}
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                authenticated: false,
                isLoading: false,
                hasError: true,
                error: action.payload.err
            };
        case 'UNAUTHENTICATE':
            return {
                ...state,
                authenticated: false,
                isLoading: false,
                hasError: false,
                error: {}
            }
        default:
            return { ...state };
    }
};

export default authReducer;
