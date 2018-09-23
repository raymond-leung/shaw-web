const defaultState = {
    employeeLastName: '',
    employeeId: ''
};

const authFormReducer = (state=defaultState, action) => {
    switch(action.type) {
        case 'UNAUTHENTICATE':
            return { 
                ...state, 
                employeeLastName: '',
                employeeId: ''
            };
        default:
            return { ...state };
    }
};

export default authFormReducer;

