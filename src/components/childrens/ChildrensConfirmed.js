import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import localStorage from './../../helpers/cache';

import { childrensLogout } from './../../actions/childrensAuthActions';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    banner: {
        margin: '0 auto',
        width: '512px',
        height: '512px'
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

export class ChildrensConfirmed extends React.Component {
    constructor(props) {
        super(props);

        this.logoutClickHandler = this.logoutClickHandler.bind(this);
    };

    componentDidMount() {
        const today = new Date().getTime();
        const startTime = new Date(process.env.CHILDRENS_START_DATE).getTime();
        const endTime = new Date(process.env.CHILDRENS_END_DATE).getTime();

        if(today < startTime || today > endTime) {
            this.props.history.push('/chilrens/closed');
        }

        if(!this.props.rsvp.employeeId) {
            this.props.doLogout();            
        }
    }

    logoutClickHandler() {
        this.props.doLogout();
        this.props.history.push('/childrens');
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
                                this.props.rsvp.spouse ? 
                                    (
                                        ` with ${this.props.rsvp.spouse}`
                                    ) : null
                            }
                        </Typography>
                        <br /><br />
                        <Typography variant="title">Children:</Typography>
                        <br />
                        {
                            this.props.rsvp.children.map((child) => {
                                return (
                                    <Typography variant="title" key={child.name}>
                                    {
                                        `${child.name} - ${child.age} ${child.gender}`
                                    }
                                    </Typography>
                                )
                            })
                        }
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
            <div id='confirmed' style={{textAlign: 'center'}}>
                <img src='./../img/ChildrensBanner2018.png' className={classes.banner} />
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
        rsvp: state.forms.childrensRsvp,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        doLogout: () => { dispatch(childrensLogout()); }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChildrensConfirmed)));
