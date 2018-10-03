import axiosWrapper from './../helpers/axiosWrapper';
import localStorage from './../helpers/cache';

export function childrensLogin(employeeId, employeeLastName) {
    return (dispatch) => {
        dispatch({ type: 'CHILDRENS_LOGIN_START', payload: {} });
        return axiosWrapper.post(`${process.env.CHILDRENS_API_URL}/api/v1/childrens/login`, {
            data: {
                empId: employeeId,
                empLname: employeeLastName
            }
        }).then((response) => {
            if(response.data.isValid) {
                localStorage.setItem('childrens-auth-token', response.data.token);
                dispatch({ type: 'CHILDRENS_LOGIN_COMPLETE', payload: {} });
            }

            return response.data;
        }).catch((err) => {
            dispatch({ type: 'CHILDRENS_LOGIN_ERROR', payload: { err } });
            return Promise.reject(err);
        });
    };
}

export function childrensLogout() {
    return (dispatch) => {
        localStorage.removeItem('childrens-auth-token');
        dispatch({ type: 'CHILDRENS_UNAUTHENTICATE', payload: {} });
        
        return Promise.resolve();
    };
};

export function getAttendingCount() {
    return (dispatch) => {
        return axiosWrapper.get(`${process.env.CHILDRENS_API_URL}/api/v1/childrens/allAttending`)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.resolve(err);
            })
    }
};
