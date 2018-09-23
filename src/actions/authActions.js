import axiosWrapper from './../helpers/axiosWrapper';
import localStorage from './../helpers/cache';

export function login(employeeId, employeeLastName) {
    return (dispatch) => {
        dispatch({ type: 'LOGIN_START', payload: {} });
        return axiosWrapper.post(`${process.env.API_URL}/api/v1/login`, {
            data: {
                empId: employeeId,
                empLname: employeeLastName
            }
        }).then((response) => {
            if(response.data.isValid) {
                localStorage.setItem('auth-token', response.data.token);
                dispatch({ type: 'LOGIN_COMPLETE', payload: {} });
            }

            return response.data;
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', payload: { err } });
            return Promise.reject(err);
        });
    };
}

export function logout() {
    return (dispatch) => {
        localStorage.removeItem('auth-token');
        dispatch({ type: 'UNAUTHENTICATE', payload: {} });
        
        return Promise.resolve();
    };
};
