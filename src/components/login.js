import React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { withRouter } from 'react-router-dom';
import localStorage from './../helpers/cache';

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { login } from './../actions/authActions';

const styles = theme => ({
    center: {
        textAlign: 'center',
    },
    banner: {
        //width: '100%',
        width: '500px',
        marginBottom: '50px'
    },
    inputLabel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputField: {
        textAlign: 'center'
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    errorMessage: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    close: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    submitButton: {
        paddingTop: '30px',
        paddingBottom: '50px',
        margin: '0 auto'
    }
});

export class Login extends React.Component {
    constructor(props) {
        super(props);

        if(props.auth.authenticated) {
            this.props.history.push('/rsvp');
        }

        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.closeError = this.closeError.bind(this);

        this.state = {
            showError: false
        };
    }

    closeError() {
        this.setState({ showError: false });
    }

    handleLoginSubmit(evt) {
        if(this.props.authForm.employeeId && this.props.authForm.employeeLastName) {
            this.props.login(this.props.authForm.employeeId, this.props.authForm.employeeLastName)
                .then((response) => {
                    if(response.isValid) {
                        const loginRedirect = localStorage.getItem('login-redirect');
                        if(loginRedirect && loginRedirect !== 'null') {
                            this.props.history.push(loginRedirect);
                            localStorage.setItem('login-redirect', null);
                        } else {
                            this.props.history.push('/rsvp');
                        }
                    }
                })
                .catch((err) => { 
                    this.setState({ showError: true })
                });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div id='login'>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.showError}
                    onClose={this.closeError}
                >
                    <SnackbarContent
                        className={classes.error}
                        message={
                            <div className={classes.errorMessage}>
                                <p>There was an error with your login.</p>
                                <p>Please double check your credentials and try again.</p>
                                <p>If the problem persists, please contact <a href="mailto:YearEndCelebration-Vancouver@sjrb.ca">Year End Celebration - Vancouver</a> for assistance.</p>
                            </div>
                        }
                        action={[
                            <IconButton
                                key="close"
                                color="inherit"
                                onClick={this.closeError}
                                className={classes.close}
                            >
                                <CloseIcon />
                            </IconButton>
                        ]}
                    />
                </Snackbar>
                <Form
                    id="login-form"
                    model="forms.auth"
                >
                    <Grid container spacing={24}>
                        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.center}>
                            <img className={classes.banner} src='./img/customer_appreciation.jpg' />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
                            <InputLabel htmlFor="employee-last-name">Employee Last Name</InputLabel>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.inputField}>
                            <Control.text
                                model=".employeeLastName"
                                id="employee-last-name"
                                component={TextField}
                            />
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.inputLabel}>
                            <InputLabel htmlFor="employee-id">Employee ID</InputLabel>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.inputField}>
                            <Control.text
                                model=".employeeId"
                                id="emploeye-id"
                                component={TextField}
                            />
                        </Grid>
                        <Grid item className={classes.submitButton} style={{ 'paddingTop': '30px', 'paddingBottom': '50px' }}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                component="div"
                                onClick={this.handleLoginSubmit}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        authForm: state.forms.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (employeeId, employeeLastName) => { return dispatch(login(employeeId, employeeLastName)) }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login)));
