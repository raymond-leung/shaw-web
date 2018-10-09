import axiosWrapper from './../helpers/axiosWrapper';

export function getRsvp() {
    return (dispatch) => {
        dispatch({ type: 'GET_CHILDRENS_RSVP_START', payload: {} });
        return axiosWrapper.get(`${process.env.CHILDRENS_API_URL}/api/v1/childrens/rsvp`)
            .then((response) => {
                const payload = { ...response.data.employee, children: response.data.children };
                dispatch({ type: 'GET_CHILDRENS_RSVP_COMPLETE', payload });
                return response.data;
            })
            .catch((err) => {
                dispatch({ type: 'GET_CHILDRENS_RSVP_ERROR', payload: { err } });
                return Promise.reject(err);
            })
    }
};

export function rsvp(rsvpObj) {
    return (dispatch) => {
        dispatch({ type: 'SUBMIT_CHILDRENS_RSVP_START', payload: {} });
        return axiosWrapper.put(`${process.env.CHILDRENS_API_URL}/api/v1/childrens/rsvp`, {
            data: {
                status: 1,
                firstName: rsvpObj.firstName,
                lastName: rsvpObj.lastName,
                spouseName: rsvpObj.spouse,
                email: rsvpObj.email,
                photoWithSanta: rsvpObj.photoWithSanta,
                dietary: rsvpObj.dietary,
                children: rsvpObj.children
            }
        }).then((response) => {
            dispatch({ type: 'SUBMIT_CHILDRENS_RSVP_COMPLETE', payload: {} });
        }).catch((err) => {
            dispatch({ type: 'SUBMIT_CHILDRENS_RSVP_ERROR', payload: { err } });
        })
    }
};

export function cancelRsvp() {
    return (dispatch) => {
        dispatch({ type: 'CANCEL_CHILDRENS_RSVP_START', payload: {} });
        return axiosWrapper.remove(`${process.env.CHILDRENS_API_URL}/api/v1/childrens/rsvp`)
            .then((response) => {
                dispatch({ type: 'CANCEL_CHILDRENS_RSVP_COMPLETE', payload: response.data });
            })
            .catch((err) => {
                dispatch({ type: 'CANCEL_CHILDRENS_RSVP_ERROR', payload: { err } });
            })
    }
};
