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

import localStorage from './../helpers/cache';

const styles = theme => ({
    root: {
        margin: '0 auto',
        padding: 0,
        width: '1420px',
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

        if(localStorage.getItem('auth-token')) {
            props.setAuthenticated();
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
        setAuthenticated: () => { dispatch({ type: 'LOGIN_COMPLETE', payload: {} }) },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)));
