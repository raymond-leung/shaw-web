import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import LoginRoute from './auth/LoginRoute';
import Login from './login';
import Confirmed from './confirmed';
import Closed from './closed';
import Rsvp from './rsvp';
import Manage from './manage';

import ChildrensLoginRoute from './auth/ChildrensLoginRoute';
import ChildrensLogin from './childrens/ChildrensLogin';
import ChildrensConfirmed from './childrens/ChildrensConfirmed';
import ChildrensClosed from './childrens/ChildrensClosed';
import ChildrensFull from './childrens/ChildrensFull';
import ChildrensRsvp from './childrens/ChildrensRsvp';
//import ChildrensManage from './childrens/ChildrensManage';

import localStorage from './../helpers/cache';

const styles = theme => ({
    root: {
        margin: '0 auto',
        padding: 0,
        width: '100%',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: 0, 
        minWidth: 0
    }
});

export class App extends React.Component {
    constructor(props) {
        super(props);

        if(localStorage.getItem('auth-token') && localStorage.getItem('childrens-auth-token')) {
            localStorage.removeItem('auth-token');
            localStorage.removeItem('childrens-auth-token');
            props.setUnauthenticated();
        } else if(localStorage.getItem('auth-token')) {
            props.setAuthenticated();
        } else if(localStorage.getItem('childrens-auth-token')) {
            props.setChildrensAuthenticated();
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div id="content" className={classes.root}>
                <main className={classes.content}>
                    <Switch>
                        <Route exact={true} path='/' component={Login} />
                        <LoginRoute exact={true} path='/rsvp' component={Rsvp} />
                        <LoginRoute exact={true} path='/confirmed' component={Confirmed} />
                        <LoginRoute exact={true} path='/manage' component={Manage} />
                        <Route exact={true} path='/closed' component={Closed} />

                        <Route exact={true} path='/childrens' component={ChildrensLogin} />
                        <ChildrensLoginRoute exact={true} path='/childrens/rsvp' component={ChildrensRsvp} />
                        <ChildrensLoginRoute exact={true} path='/childrens/confirmed' component={ChildrensConfirmed} />
                        <ChildrensLoginRoute exact={true} path='/childrens/closed' component={ChildrensClosed} />
                        <ChildrensLoginRoute exact={true} path='/childrens/full' component={ChildrensFull} />
                        
                    </Switch>
                </main>
            </div>
        );
    }
};

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUnauthenticated: () => { dispatch({ type: 'UNAUTHENTICATE', payload: {} }) },
        setAuthenticated: () => { dispatch({ type: 'LOGIN_COMPLETE', payload: {} }) },
        setChildrensAuthenticated: () => { dispatch({ type: 'CHILDRENS_LOGIN_COMPLETE', payload: {} }) },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)));
