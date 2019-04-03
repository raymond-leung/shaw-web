import axiosWrapper from './../helpers/axiosWrapper';

export function getList(status) {
    if(status === undefined) { status = 1 }

    return (dispatch) => {
        dispatch({ type: 'GET_LIST_START', payload: {} });
        return axiosWrapper.get(`${process.env.API_URL}/api/v1/manage/list/${status}`)
            .then((response) => {
                dispatch({ type: 'GET_LIST_COMPLETE', payload: { list: response.data } });
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
        dispatch({ type: 'SEARCH_START', payload: {} });
        return axiosWrapper.get(`${process.env.API_URL}/api/v1/manage/employee/${searchTerm}`)
            .then((response) => {
                dispatch({ type: 'SEARCH_COMPLETE', payload: { searchResults: response.data } });
            })
            .catch((err) => {
                dispatch({ type: 'SEARCH_ERROR', payload: { err } });
            })
    }
}

export function addEmployee(employeeObj) {
    return (dispatch) => {
        dispatch({ type: 'ADD_EMPLOYEE_START', payload: {} });
        return axiosWrapper.post(`${process.env.API_URL}/api/v1/manage/employee`, {
            data: {
                employeeId: employeeObj.employeeId,
                firstName: employeeObj.firstName,
                lastName: employeeObj.lastName,
                email: employeeObj.email,
                title: employeeObj.title,
                department: employeeObj.department,
                location: employeeObj.location,
                manager: employeeObj.manager,
                vp: employeeObj.vp
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
        return axiosWrapper.get(`${process.env.API_URL}/api/v1/manage/counts`)
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
        dispatch({ type: 'GET_RSVP_START', payload: {} });
        return axiosWrapper.get(`${process.env.API_URL}/api/v1/manage/employee/${employeeId}`)
            .then((response) => {
                return dispatch({ type: 'GET_RSVP_COMPLETE', payload: response.data[0] });
            })
            .catch((err) => {
                dispatch({ type: 'GET_RSVP_ERROR', payload: {} });
            })
    }
}

export function updateEmployee(rsvpObj) {
    return (dispatch) => {
        dispatch({ type: 'SUBMIT_RSVP_START', payload: {} });
        return axiosWrapper.put(`${process.env.API_URL}/api/v1/manage/employee/${rsvpObj.employeeId}`, {
            data: {
                employeeId: rsvpObj.employeeId,
                status: rsvpObj.status,
                firstName: rsvpObj.firstName,
                lastName: rsvpObj.lastName,
                email: rsvpObj.email,
                alergies: rsvpObj.alergies
            }
        }).then((response) => {
            dispatch({ type: 'SUBMIT_RSVP_COMPLETE', payload: {} })
        }).catch((err) => {
            dispatch({ type: 'SUBMIT_RSVP_ERROR', payload: { err} });
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

export function getAddEmployeeLists() {
    return (dispatch) => {
        const promiseArray = [];

        promiseArray.push(axiosWrapper.get(`${process.env.API_URL}/api/v1/manage/departments`));
        promiseArray.push(axiosWrapper.get(`${process.env.API_URL}/api/v1/manage/locations`));
        promiseArray.push(axiosWrapper.get(`${process.env.API_URL}/api/v1/manage/managers`));
        promiseArray.push(axiosWrapper.get(`${process.env.API_URL}/api/v1/manage/vps`));
        promiseArray.push(axiosWrapper.get(`${process.env.API_URL}/api/v1/manage/titles`));

        return Promise.all(promiseArray)
                .then((results) => {
                    return {
                        departments: results[0].data,
                        locations: results[1].data,
                        managers: results[2].data,
                        vps: results[3].data,
                        titles: results[4].data
                    };
                })
                .catch(err => {
                    console.log('err: ', err);
                })
    }
}
