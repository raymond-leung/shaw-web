import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import localStorage from './../helpers/cache';

import { logout } from './../actions/authActions';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    banner: {
        width: '100%',
        margin: '0 auto',
    },
    response: {
        margin: '0 auto',
        width: '350px',
        marginTop: '50px'
    },
    logoutButton: {
        textAlign: 'center',
        marginTop: '35px'
    },
    maxAttending: {
        marginTop: '30px',
        color: 'red'
    }
});

export class Confirmed extends React.Component {
    constructor(props) {
        super(props);

        this.logoutClickHandler = this.logoutClickHandler.bind(this);
    };

    componentDidMount() {
        const today = new Date().getTime();
        const startTime = new Date(process.env.START_DATE).getTime();
        const endTime = new Date(process.env.END_DATE).getTime();

        if(today < startTime || today > endTime) {
            this.props.history.push('/closed');
        }

        if(!this.props.rsvp.employeeId) {
            this.props.doLogout();            
        }
    }

    logoutClickHandler() {
        this.props.doLogout();
        this.props.history.push('/');
    }

    render() {
        const { classes } = this.props;
        const status = this.props.rsvp.status;
        let response = null;

        if(status === 1 || status === "1") {
            response = (
                <React.Fragment>
                    <div id="response" className={classes.response}>
                        <Typography variant="title">You have responsed with:</Typography>
                        <br />
                        <Typography variant="title">
                            Attending
                        </Typography>
                        <Typography variant="title">
                            { 
                                this.props.rsvp.alergies ?
                                (
                                    `Alergies: ${this.props.rsvp.alergies}`
                                ) : null
                            }
                        </Typography>
                        {
                            this.props.rsvp.isWaitingList ?
                            (
                                <Typography variant="title" className={classes.maxAttending}>
                                    You have been placed on the waiting list because we are at capacity for this event.
                                </Typography>
                            ) : null
                        }

                        <br />
                        <Typography variant="title">
                            Please contact <a href="mailto:jenny.wong@sjrb.ca?subject=Vancouver Employee Appreciation Event Question">Jenny Wong</a> if you have any questions.
                        </Typography>
                    </div>
                </React.Fragment>
            );
        } else if(status === 0 || status === "2") {
            response = (
                <React.Fragment>
                    <div id="response" className={classes.response}>
                        <Typography variant="title">You have responded with:</Typography>
                        <br />
                        <Typography variant="title">Not Attending</Typography>
                    </div>
                </React.Fragment>
            );
        }

        return (
            <div id='confirmed'>
                <img src='./img/1920x300.jpg' className={classes.banner} />
                { response }
                <div className={classes.logoutButton}>
                    <Button variant="contained" color="primary" onClick={this.logoutClickHandler}>Logout</Button>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        rsvp: state.forms.rsvp,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        doLogout: () => { dispatch(logout()); }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Confirmed)));
