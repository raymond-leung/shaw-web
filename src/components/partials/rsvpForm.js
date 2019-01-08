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
                        <InputLabel>Response</InputLabel>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <RsvpStatusSelector
                            model=".status"
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.inputLabel}>
                        <InputLabel htmlFor="alergies">Allergies</InputLabel>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.inputLabel}>
                        <Control.text
                            id="alergies"
                            model=".alergies"
                            multiline={true}
                            rows={1}
                            rowsMax={5}
                            component={TextField}
                        />
                    </Grid>
                </Grid>
            </Form>
        );
    }
};

export default withStyles(styles)(RsvpForm);
