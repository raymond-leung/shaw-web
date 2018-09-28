const defaultState = {
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    status: "",
    guestName: "",
    guestEmployeeId: "",
    dietary: "",
    assistance: "",
    isLoading: false,
    hasError: false,
    error: {}
};

const rsvpFormReducer = (state=defaultState, action) => {
    switch(action.type) {
        case 'GET_RSVP_START':
        case 'SUBMIT_RSVP_START':
        case 'CANCEL_RSVP_START':
            return { 
                ...state,
                isLoading: true,
                hasError: false,
                error: {}
            };
        case 'GET_RSVP_COMPLETE':
            return {
                ...state,
                employeeId: action.payload.employeeId || "",
                firstName: action.payload.firstName || "",
                lastName: action.payload.lastName || "",
                email: action.payload.email || "",
                status: action.payload.status || "",
                guestName: action.payload.guestName || "",
                guestEmployeeId: action.payload.guestEmployeeId || "",
                dietary: action.payload.dietary || "",
                assistance: action.payload.assistance || "",
                isLoading: false,
                hasError: false,
                error: {}
            };
        case 'GET_RSVP_ERROR':
            return { 
                ...state,
                employeeId: "",
                firstName: "",
                lastName: "",
                email: "",
                status: "",
                guestName: "",
                guestEmployeeId: "",
                dietary: "",
                assistance: "",
                isLoading: false,
                hasError: true,
                error: action.payload.err
            };
            return { 
                ...state,
                isLoading: true,
                hasError: false,
                error: {}
            };
        case 'SUBMIT_RSVP_COMPLETE':
            return { 
                ...state,
                isLoading: false,
                hasError: false,
                error: {}
            };
        case 'CANCEL_RSVP_COMPLETE':
            return {
                ...state,
                isLoading: false,
                hasError: false,
                error: {},
                status: 0
            };
        case 'SUBMIT_RSVP_ERROR':
        case 'CANCEL_RSVP_ERROR':
            return {
                ...state,
                isLoading: false,
                hasError: false,
                error: {}
            }
        case 'SET_CANCEL_RSVP':
            return { 
                ...state, 
                status: 0 
            };
        default:
            return { ...state };
    }
};

export default rsvpFormReducer;
