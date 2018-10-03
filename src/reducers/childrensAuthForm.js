const defaultState = {
    employeeLastName: '',
    employeeId: ''
};

const childrensAuthFormReducer = (state=defaultState, action) => {
    switch(action.type) {
        case 'CHILDRENS_UNAUTHENTICATE':
            return { 
                ...state, 
                employeeLastName: '',
                employeeId: ''
            };
        default:
            return { ...state };
    }
};

export default childrensAuthFormReducer;

