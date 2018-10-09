const defaultState = {
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    status: "", 
    spouse: "",
    photoWithSanta: false,
    children: [],
    dietary: "",
    isLoading: false,
    error: {}
};

const childrensRsvpFormReducer = (state=defaultState, action) => {
    switch(action.type) {
        case 'SUMIT_CHILDRENS_RSVP_START':
        case 'GET_CHILDRENS_RSVP_START':
        case 'CANCEL_CHILDRENS_RSVP_START':
            return { 
                ...state,
                employeeId: "",
                firstName: "",
                lastName: "",
                email: "",
                status: "",
                spouse: "",
                photoWithSanta: false,
                children: [],
                dietary: "",
                isLoading: true,
                error: {}
            }
        case 'GET_CHILDRENS_RSVP_COMPLETE':
            return { 
                ...state,
                employeeId: action.payload.employeeId || "",
                firstName: action.payload.firstName || "",
                lastName: action.payload.lastName || "",
                email: action.payload.email || "",
                status: action.payload.status,
                spouse: action.payload.spouseName || "",
                photoWithSanta: action.payload.photoWithSanta,
                dietary: action.payload.dietary || "",
                children: action.payload.children,
                isLoading: false,
                error: {}
            }
        case 'GET_CHILDRENS_RSVP_ERROR':
            return { 
                ...state,
                employeeId: "",
                firstName: "",
                lastName: "",
                email: "",
                status: "",
                spouse: "",
                photoWithSanta: false,
                children: [],
                dietary: "",
                isLoading: false,
                error: action.payload.err
            }
        case 'SUBMIT_CHILDRENS_RSVP_COMPLETE':
            const childrenCopy = state.children.slice();
            for(let ii=childrenCopy.length - 1; ii>=0; ii--) {
                if(!childrenCopy[ii].name.length) {
                    delete childrenCopy[ii];
                }
            }

            return {
                ...state,
                isLoading: false,
                error: {},
                status: 1,
                children: childrenCopy
            }
        case 'CANCEL_CHILDRENS_RSVP_COMPLETE':
            return {
                ...state,
                isLoading: false,
                error: {},
                status: 0
            }
        case 'SUBMIT_CHILDRENS_RSVP_ERROR':
        case 'CANCEL_CHILDRENS_RSVP_ERROR':
            return {
                ...state, 
                isLoading: false,
                error: action.payload.err
            }
        case 'SET_CHILDRENS_CANCEL_RSVP':
            return {
                ...state,
                status: 0
            }
        case 'SET_CHILDRENS_ATTENDING_RSVP':
            return {
                ...state,
                status: 1
            }
        default:
            return { ...state };
    }
};

export default childrensRsvpFormReducer;
