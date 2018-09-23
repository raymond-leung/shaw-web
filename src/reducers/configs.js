const defaultState = {
    startDate: null,
    endDate: null,
};

const configReducer = (state=defaultState, action) => {
    switch(action.type) {
        case 'GET_CONFIGS_START':
            return {
                startDate: null,
                endDate: null
            };
        case 'GET_CONFIGS_COMPLETE':
            return {
                startDate: action.payload.startDate,
                endDate: action.payload.endDate
            };
        case 'GET_CONFIGS_ERROR':
            return {
                startDate: null,
                endDate: null
            };
        default:
            return { ...state };
    }
};

export default configReducer;
