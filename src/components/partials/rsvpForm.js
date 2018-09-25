import React from 'react';
import { Control, Form, actions } from 'react-redux-form';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import RsvpStatusSelector from './rsvpStatusSelector';

const styles = themes => ({
    inputLabel: {
        display: 'flex',
        alignItems: 'center'
    },
    rsvpForm: {
        width: '500px',
        margin: '0 auto',
        marginTop: '50px'
    }
});

export class RsvpForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, model, rsvp } = this.props;

        const validators = {
            firstName: rsvp.firstName.length <= 0,
            lastName: rsvp.lastName.length <= 0,
            email: rsvp.email.length <= 0,
        };

        return (
            <Form
                id="rsvp-form"
                model={ model }
                className={classes.rsvpForm}
            >
                <Grid container spacing={24} style={{ justifyContent: 'center'}}>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.inputLabel}>
                        <InputLabel>Employee ID</InputLabel>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Typography>{rsvp.employeeId}</Typography>    
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.inputLabel}>
                        <InputLabel htmlFor="first-name">First Name</InputLabel>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Control.text
                            error={validators.firstName}
                            label={validators.firstName ? 'Required' : ""}
                            model=".firstName"
                            id="first-name"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.inputLabel}>
                        <InputLabel htmlFor="last-name">Last Name</InputLabel>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Control.text
                            error={validators.lastName}
                            label={validators.lastName ? 'Required' : ""}
                            model=".lastName"
                            id="last-name"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.inputLabel}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Control.text
                            error={validators.email}
                            label={validators.email ? 'Required' : ""}
                            model=".email"
                            id="email"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.inputLabel}>
                        <InputLabel htmlFor="guest-name">Guest Name</InputLabel>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Control.text
                            model=".guestName"
                            id="guest-name"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.inputLabel}>
                        <InputLabel htmlFor="guest-employee-id">Guest Employee ID</InputLabel>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Control.text
                            model=".guestEmployeeId"
                            id="guest-employee-id"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.inputLabel}>
                        <InputLabel htmlFor="dietary">Dietary Restrictions</InputLabel>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.inputLabel}>
                        <Control.text
                            id="dietary"
                            model=".dietary"
                            multiline={true}
                            rows={1}
                            rowsMax={5}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.inputLabel}>
                        <InputLabel htmlFor="assistance">Special Assistance</InputLabel>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Control.text
                            id="assistance"
                            model=".assistance"
                            multiline={true}
                            rows={1}
                            rowsMax={5}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.inputLabel}>
                        <InputLabel>Response</InputLabel>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <RsvpStatusSelector
                            model=".status"
                        />
                    </Grid>
                </Grid>
            </Form>
        );
    }
};

export default withStyles(styles)(RsvpForm);
