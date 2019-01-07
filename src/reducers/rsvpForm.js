const defaultState = {
    employeeId: "",
    firstName: "",
    preferredName: "",
    lastName: "",
    email: "",
    tenure: "",
    location: "",
    title: "",
    department: "",
    leader: "",
    vp: "",
    isOver19: false,
    alergies: "",
    status: 0,
    rsvpDateTime: null,
    isWaitingList: false,
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
                preferredName: action.payload.preferredName || "",
                email: action.payload.email || "",
                tenure: action.payload.tenure || "",
                location: action.payload.location || "",
                title: action.payload.title || "",
                department: action.payload.department || "",
                leader: action.payload.leader || "",
                vp: action.payload.vp || "",
                isOver19: action.payload.isOver19 || false,
                alergies: action.payload.alergies || "",
                rsvpDateTime: action.payload.rsvpDateTime || "",
                isWaitingList: action.payload.isWaitingList || false,
                status: action.payload.status || "",
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
                preferredName: "",
                email: "",
                tenure: "",
                location: "",
                title: "",
                department: "",
                leader: "",
                vp: "",
                isOver19: false,
                alergies: "",
                rsvpDateTime: "",
                isWaitingList: false,
                status: 0,
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
            console.log("rsvp complete reducer: ", action.payload);
            return { 
                ...state,
                isWaitingList: action.payload.isWaitingList || 0,
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
