import React from 'react';
import { connect } from 'react-redux';
import { Control, Form, actions } from 'react-redux-form';
import { withRouter } from 'react-router-dom';

import RsvpForm from './partials/rsvpForm';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { getRsvp, rsvp, cancelRsvp } from './../actions/rsvpActions';
import { logout } from './../actions/authActions';

const styles = theme => ({
    banner: {
        width: '1420px'
    },
    button: {
        margin: theme.spacing.unit,
    },
    buttonGroup: {
        marginTop: '30px',
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
    attendingAsGuest: {
        textAlign: 'center',
        marginTop: '100px'
    },
    rsvpForm: {
        textAlign: 'center',
    }
});

export class Rsvp extends React.Component {
    constructor(props) {
        super(props);

        this.rsvpClickHandler = this.rsvpClickHandler.bind(this);
        this.cancelRsvpClickHandler = this.cancelRsvpClickHandler.bind(this);
        this.logoutClickHandler = this.logoutClickHandler.bind(this);
        this.closeError = this.closeError.bind(this);

        this.state = {
            attendingAsGuest: null,
            guestError: null,
            showError: false
        }
    }

    componentDidMount() {
        const today = new Date().getTime();
        const startTime = new Date(process.env.START_DATE).getTime();
        const endTime = new Date(process.env.END_DATE).getTime();

        if(today < startTime || today > endTime) {
            this.props.history.push('/closed');
        }

        this.props.get()
            .catch((err) => {
                if(err.response.status === 401) {
                    this.logoutClickHandler();
                } else if(err.response.status === 409) {
                    this.setState({ 
                        attendingAsGuest: err.response.data.err.message,
                        showError: true
                    });
                }
            });
    }

    rsvpClickHandler() {
        if(this.props.rsvp.status && this.props.rsvp.firstName.length > 0 && this.props.rsvp.lastName.length > 0 && this.props.rsvp.email.length > 0) {
            this.props.submit(this.props.rsvp)
                .then((response) => {
                    this.setState({ guestError: null, showError: false });
                    this.props.history.push('/confirmed')
                })
                .catch((err) => {
                    if(err.response.status === 401) {
                        this.logoutClickHandler();
                    } else if(err.response.status === 409) {
                        this.setState({ 
                            guestError: err.response.data.err.message,
                            showError: true
                        });
                    }
                })
        } else {
            this.setState({ showError: true });
        }
    }

    closeError() {
        this.setState({ showError: false });
    }

    cancelRsvpClickHandler() {
        this.props.cancel()
            .then(() => {
                this.props.history.push('/confirmed')
            })
            .catch((err) => {
                console.log('cancel error: ', err);
            });
    }

    logoutClickHandler() {
        this.props.logout();
        this.props.history.push("/");
    }

    render() {
        const { classes } = this.props;

        return (
            <div id='rsvp'>
                <img src='./img/1920x300.jpg' className={classes.banner} />
            {
                this.state.attendingAsGuest !== null ?
                    (
                        <div className={classes.attendingAsGuest}>
                            <Typography variant="title">{this.state.attendingAsGuest}</Typography>
                            <Typography variant="title">If this is incorrect or you wish to make any changes, please contact <a href="mailto:jenny.wong@sjrb.ca">Jenny Wong</a></Typography>
                            <br />
                            <Button onClick={this.logoutClickHandler} variant="outlined" color="default">Logout</Button>
                        </div>
                    ) : (
                        <React.Fragment>
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
                                    message = { this.state.guestError ? this.state.guestError : (
                                        <span className={classes.errorMessage}>
                                            <p>There was an error submitting your RSVP</p>
                                            <p>Please make sure all required fields have been filled including Response</p>
                                        </span>)
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

                            <RsvpForm 
                                model="forms.rsvp"
                                rsvp={this.props.rsvp}
                            />
                            <div className={classes.buttonGroup}>
                                <Button 
                                    variant="contained" 
                                    component="span" 
                                    className={classes.button}
                                    color="primary"
                                    onClick={this.rsvpClickHandler}
                                >
                                    RSVP
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    component="span" 
                                    className={classes.button}
                                    color="primary"
                                    onClick={this.cancelRsvpClickHandler}
                                >
                                    Cancel RSVP
                                </Button>
                                <Button 
                                    variant="contained" 
                                    component="span" 
                                    className={classes.button}
                                    color="default"
                                    onClick={this.logoutClickHandler}
                                >
                                    Logout
                                </Button>
                            </div>
                        </React.Fragment>
                    )
            }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        rsvp: state.forms.rsvp,
        auth: state.auth,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        get: () => { return dispatch(getRsvp()) },
        submit: (rsvpObj) => { return dispatch(rsvp(rsvpObj)) },
        cancel: () => { return dispatch(cancelRsvp()) },
        logout: () => { return dispatch(logout()) }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Rsvp)));
