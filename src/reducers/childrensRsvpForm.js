const defaultState = {
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    status: "", 
    spouse: "",
    photoWithSanta: false,
    children: [],
    isLoading: false,
    error: {}
};

const childDefaultState = {
    name: "",
    age: "",
    gender: "",
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
                isLoading: true,
                error: {}
            }
        case 'GET_CHILDRENS_RSVP_COMPLETE':
            return { 
                ...state,
                employeeId: action.payload.employee[0].employeeId,
                firstName: action.payload.employee[0].firstName,
                lastName: action.payload.employee[0].lastName,
                email: action.payload.employee[0].email,
                status: action.payload.employee[0].status,
                spouse: action.payload.employee[0].spouseName,
                photoWithSanta: action.payload.employee[0].photoWithSanta,
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
        default:
            return { ...state };
    }
};

export default childrensRsvpFormReducer;
