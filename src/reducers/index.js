import { combineReducers } from 'redux';
import { combineForms, createForms } from 'react-redux-form';

import authReducer from './auth';
import manageReducer from './manage';

import authFormReducer from './authForm';
import rsvpFormReducer from './rsvpForm';
import addEmployeeFormReducer from './addEmployeeForm';

export default combineReducers({
    auth: authReducer, 
    manage: manageReducer,

    forms: combineForms({
        rsvp: rsvpFormReducer,
        auth: authFormReducer,
        addEmployee: addEmployeeFormReducer,
    }, 'forms')
});
