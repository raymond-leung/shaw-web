import axiosWrapper from './../helpers/axiosWrapper';

export function getRsvp() {
    return (dispatch) => {
        dispatch({ type: 'GET_RSVP_START', payload: {} });
        return axiosWrapper.get(`${process.env.API_URL}/api/v1/rsvp`)
            .then((response) => {
                dispatch({ type: 'GET_RSVP_COMPLETE', payload: response.data })
                return response;
            })
            .catch((err) => {
                dispatch({ type: 'GET_RSVP_ERROR', payload: { err} });
                return Promise.reject(err);
            })
    }
};

export function rsvp(rsvpObj) {
    return (dispatch) => {
        dispatch({ type: 'SUBMIT_RSVP_START', payload: {} });
        return axiosWrapper.put(`${process.env.API_URL}/api/v1/rsvp`, {
            data: {
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
            dispatch({ type: 'SUBMIT_RSVP_COMPLETE', payload: response.data });
            return response.data;
        })
        .catch((err) => {
            dispatch({ type: 'SUBMIT_RSVP_ERROR', payload: { err } });
            return Promise.reject(err);
        })
    }
};

export function cancelRsvp() {
    return (dispatch) => {
        dispatch({ type: 'CANCEL_RSVP_START', payload: {} });
        return axiosWrapper.remove(`${process.env.API_URL}/api/v1/rsvp`)
            .then((response) => {
                dispatch({ type: 'CANCEL_RSVP_COMPLETE', payload: response.data });
            })
            .catch((err) => {
                dispatch({ type: 'CANCEL_RSVP_ERROR', payload: { err } });
            });
    }
};
