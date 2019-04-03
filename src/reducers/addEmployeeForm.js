const defaultState = {
    employeeId: "",
    firstName: "",
    lastName: "",
    preferredName: "",
    title: "",
    department: "",
    location: "",
    email: "",
    manager: "",
    vp: "",
    alergies: "",
    status: "",
    isWaitingList: false,
    rsvpDateTime: "",
    isLoading: false,
    error: {},
    isError: false
};

const addEmployeeFormReducer = (state=defaultState, action) => {
    switch(action.type) {
        case 'ADD_EMPLOYEE_INIT':
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: {},
                employeeId: "",
                firstName: "",
                lastName: "",
                preferredName: "",
                title: "",
                department: "",
                location: "",
                email: "",
                manager: "",
                vp: "",
                alergies: "",
                status: "",
                isWaitingList: false,
                rsvpDateTime: ""
            }
        case 'ADD_EMPLOYEE_START':
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: {}
            }
        case 'ADD_EMPLOYEE_COMPLETE':
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: {}
            }
        case 'ADD_EMPLOYEE_ERROR':
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload.err
            }
        default:
            return { ...state }
    }
}

export default addEmployeeFormReducer;
