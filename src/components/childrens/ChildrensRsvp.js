import React from 'react';
import { connect } from 'react-redux';
import { Control, Form, actions } from 'react-redux-form';
import { withRouter } from 'react-router-dom';

import ChildrensRsvpForm from './../partials/childrensRsvpForm';

import { getRsvp, rsvp, cancelRsvp } from './../../actions/childrensRsvpActions';
import { childrensLogout, getAttendingCount } from './../../actions/childrensAuthActions';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    banner: {
        marginBottom: '50px',
        width: '512px',
        height: '512px'
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
});

export class ChildrensRsvp extends React.Component {
    constructor(props) {
        super(props);

        this.rsvpClickHandler = this.rsvpClickHandler.bind(this);
        this.cancelRsvpClickHandler = this.cancelRsvpClickHandler.bind(this);
        this.logoutClickHandler = this.logoutClickHandler.bind(this);
        this.closeError = this.closeError.bind(this);

        this.state = {
            showError: false
        };
    }

    closeError() {
        this.setState({ showError: false });
    }

    rsvpClickHandler() {
        if(this.props.rsvp.firstName.length && this.props.rsvp.lastName.length && this.props.rsvp.email.length && this.props.rsvp.children.length) {
            this.props.submit(this.props.rsvp)
                .then((response) => {
                    this.setState({ showError: false });
                    this.props.history.push('/childrens/confirmed');
                })
                .catch((err) => {
                    if(err.response.status === 401) {
                        this.logoutClickHandler();
                    }
                })
        } else {
            this.setState({ showError: true });
        }
    }

    cancelRsvpClickHandler() {
        this.props.cancel()
            .then(() => {
                this.props.history.push('/childrens/confirmed');
            })
            .catch((err) => {
                console.log('cancel error: ', err);
            })
    }

    logoutClickHandler() {
        this.props.logout();
        this.props.history.push("/childrens");
    }

    componentDidMount() {
        const today = new Date().getTime();
        const startTime = new Date(process.env.CHILDRENS_START_DATE).getTime();
        const endTime = new Date(process.env.CHILDRENS_END_DATE).getTime();

        if(today < startTime || today > endTime) {
            this.props.history.push('/childrens/closed');
        }

        this.props.getAttendingCount()
            .then((count) => {
                count = !count ? 0 : count;
                if(parseInt(count) > parseInt(process.env.CHILDRENS_CAPACITY)) {
                    this.props.history.push('/childrens/full');
                    return;
                }
            })
            .catch((err) => {
                console.log('attending count err: ', err);
            })

        this.props.get()
            .catch((err) => {
                if(err.response.status === 401) {
                    this.logoutClickHandler();
                }
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <div id='childrens-rsvp'>
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
                                <p>Please make sure all required fields have been filled</p>
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
                <div style={{textAlign: 'center'}}>
                    <img className={classes.banner} src='./../img/ChildrensBanner2018.png' />
                </div>
                <ChildrensRsvpForm
                    model="forms.childrensRsvp"
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
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        rsvp: state.forms.childrensRsvp,
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        get: () => { return dispatch(getRsvp()) },
        getAttendingCount: () => { return dispatch(getAttendingCount()) },
        submit: (rsvpObj) => { return dispatch(rsvp(rsvpObj)) }, 
        cancel: () => { return dispatch(cancelRsvp()) },
        logout: () => { return dispatch(childrensLogout()) }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChildrensRsvp)));
