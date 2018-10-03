import { combineReducers } from 'redux';
import { combineForms, createForms } from 'react-redux-form';

import authReducer from './auth';
import manageReducer from './manage';

import authFormReducer from './authForm';
import rsvpFormReducer from './rsvpForm';
import addEmployeeFormReducer from './addEmployeeForm';

import childrensAuthFormReducer from './childrensAuthForm';
import childrensRsvpFormReducer from './childrensRsvpForm';

export default combineReducers({
    auth: authReducer, 
    manage: manageReducer,

    forms: combineForms({
        rsvp: rsvpFormReducer,
        childrensRsvp: childrensRsvpFormReducer,
        auth: authFormReducer,
        addEmployee: addEmployeeFormReducer,
        childrensAuth: childrensAuthFormReducer,
    }, 'forms')
});
