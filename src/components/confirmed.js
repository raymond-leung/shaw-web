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
        width: '1420px',
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
                            { 
                                this.props.rsvp.guestName ? 
                                    (
                                        ` with ${this.props.rsvp.guestName}`
                                    ) : null
                            }
                        </Typography>
                        <Typography variant="title">
                            { 
                                this.props.rsvp.dietary ?
                                (
                                    `Dietary Restrictions: ${this.props.rsvp.dietary}`
                                ) : null
                            }
                        </Typography>
                        <Typography variant="title">
                            {
                                this.props.rsvp.assistance ?
                                (
                                    `Special Assistance: ${this.props.rsvp.assistance}`
                                ) : null
                            }
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
