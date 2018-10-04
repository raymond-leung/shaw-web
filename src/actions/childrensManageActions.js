import axiosWrapper from './../helpers/axiosWrapper';

export function getList(status) {
    if(status === undefined) { status = 1 }

    return (dispatch) => {
        dispatch({ type: 'GET_CHILDRENS_LIST_START', payload: {} });
        return axiosWrapper.get(`${process.env.CHILDRENS_API_URL}/api/v1/childrens/manage/list/${status}`)
            .then((response) => {
                dispatch({ type: 'GET_CHILDRENS_LIST_COMPLETE', payload: { list: response.data } });
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                dispatch({ type: 'GET_LIST_ERROR', payload: { err } });
                return Promise.reject(err);
            });
    }
};

export function searchEmployee(searchTerm) {
    return (dispatch) => {
        dispatch({ type: 'CHILDRENS_SEARCH_START', payload: {} });
        return axiosWrapper.get(`${process.env.CHILDRENS_API_URL}/api/v1/childrens/manage/employee/${searchTerm}`)
            .then((response) => {
                dispatch({ type: 'CHILDRENS_SEARCH_COMPLETE', payload: { searchResults: response.data } });
            })
            .catch((err) => {
                dispatch({ type: 'CHILDRENS_SEARCH_ERROR', payload: { err } });
            })
    }
}

export function addEmployee(employeeObj) {
    return (dispatch) => {
        dispatch({ type: 'ADD_EMPLOYEE_START', payload: {} });
        return axiosWrapper.post(`${process.env.CHILDRENS_API_URL}/api/v1/childrens/manage/employee`, {
            data: {
                employeeId: employeeObj.employeeId,
                firstName: employeeObj.firstName,
                lastName: employeeObj.lastName,
                email: employeeObj.email
            }
        }).then((response) => {
            return dispatch({ type: 'ADD_EMPLOYEE_COMPLETE', payload: {} });
        }).catch((err) => {
            return dispatch({ type: 'ADD_EMPLOYEE_ERROR', payload: { err: err.response.data.err } });
        })
    }
};

export function getCounts() {
    return (dispatch) => {
        dispatch({ type: 'GET_RSVP_COUNTS_START', payload: {} });
        return axiosWrapper.get(`${process.env.CHILDRENS_API_URL}/api/v1/childrens/manage/counts`)
            .then((response) => {
                dispatch({ type: 'GET_RSVP_COUNTS_COMPLETE', payload: response.data });
            })
            .catch((err) => {
                dispatch({ type: 'GET_RSVP_COUNTS_ERROR', payload: { err } });
            })
    }
}

export function getEmployee(employeeId) {
    return (dispatch) => {
        dispatch({ type: 'GET_CHILDRENS_RSVP_START', payload: {} });
        return axiosWrapper.get(`${process.env.CHILDRENS_API_URL}/api/v1/childrens/manage/employee/${employeeId}`)
            .then((response) => {
                return dispatch({ type: 'GET_CHILDRENS_RSVP_COMPLETE', payload: response.data[0] });
            })
            .catch((err) => {
                dispatch({ type: 'GET_CHILDRENS_RSVP_ERROR', payload: {} });
            })
    }
}

export function updateEmployee(rsvpObj) {
    return (dispatch) => {
        dispatch({ type: 'SUBMIT_CHILDRENS_RSVP_START', payload: {} });
        return axiosWrapper.put(`${process.env.CHILDRENS_API_URL}/api/v1/childrens/manage/employee/${rsvpObj.employeeId}`, {
            data: {
                employeeId: rsvpObj.employeeId,
                status: rsvpObj.status,
                guestName: rsvpObj.guestName,
                guestEmployeeId: rsvpObj.guestEmployeeId,
                firstName: rsvpObj.firstName,
                lastName: rsvpObj.lastName,
                dietary: rsvpObj.dietary,
                assistance: rsvpObj.assistance,
                email: rsvpObj.email
            }
        }).then((response) => {
            dispatch({ type: 'SUBMIT_CHILDRENS_RSVP_COMPLETE', payload: {} })
        }).catch((err) => {
            dispatch({ type: 'SUBMIT_CHILDRENS_RSVP_ERROR', payload: { err} });
            return Promise.reject(err);
        })
    }
}

export function cancelRsvp() {
    return (dispatch) => {
        dispatch({ type: 'SET_CANCEL_RSVP', payload: {} });

        return Promise.resolve();
    }
};
