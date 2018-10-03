import React from 'react';
import { Control, Form, actions } from 'react-redux-form';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = themes => ({
    inputLabel: {
        display: 'flex',
        alignItems: 'center'
    },
    rsvpForm: {
        width: '800px',
        margin: '0 auto',
        marginTop: '50px'
    }
});

export class ChildrensRsvpForm extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        const { classes, model, rsvp } = this.props;
        
        const validators = {
            firstName: rsvp && rsvp.firstName && rsvp.firstName.length <= 0,
            lastName: rsvp && rsvp.lastName && rsvp.lastName.length <= 0,
            email: rsvp && rsvp.email && rsvp.email.length <= 0,
        };

        if(!rsvp.employeeId) { return null }

        return (
            <Form
                id="childrens-rsvp-form"
                model={ model }
                className={classes.rsvpForm}
            >
                <Grid container spacing={24} style={{ justifyContent: 'center' }}>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.inputLabel}>
                        <InputLabel>Employee ID</InputLabel>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Typography>{rsvp.employeeId}</Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.inputLabel}>
                        <InputLabel>First Name</InputLabel>
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
                        <InputLabel>Last Name</InputLabel>
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
                        <InputLabel>Email</InputLabel>
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
                        <InputLabel>Spouse/Partner</InputLabel>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Control.text
                            model=".spouse"
                            id="spouse"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.inputLabel}>
                        <InputLabel>Children</InputLabel>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <ExpansionPanel expanded={!!(rsvp.children[0] && rsvp.children[0].name)}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>First Child</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container spacing={24}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <InputLabel>Name</InputLabel>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <Control.text
                                            model=".children[0].name"
                                            component={TextField}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <InputLabel>Age</InputLabel>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <Control.text
                                            model=".children[0].age"
                                            component={TextField}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <InputLabel>Gender</InputLabel>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <InputLabel>Male</InputLabel>
                                        <Control.radio
                                            model=".children[0].gender"
                                            value="male"
                                            color="primary"
                                            label="Male"
                                            component={Radio}
                                        />
                                        <br />
                                        <InputLabel>Female</InputLabel>
                                        <Control.radio
                                            model=".children[0].gender"
                                            value="female"
                                            label="Female"
                                            component={Radio}
                                        />
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel defaultExpanded={rsvp.children[1] && rsvp.children[1].name ? true : false}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>Second Child</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container spacing={24}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <InputLabel>Name</InputLabel>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <Control.text
                                            model=".children[1].name"
                                            component={TextField}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <InputLabel>Age</InputLabel>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <Control.text
                                            model=".children[1].age"
                                            component={TextField}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <InputLabel>Gender</InputLabel>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <InputLabel>Male</InputLabel>
                                        <Control.radio
                                            model=".children[1].gender"
                                            value="male"
                                            color="primary"
                                            label="Male"
                                            component={Radio}
                                        />
                                        <br />
                                        <InputLabel>Female</InputLabel>
                                        <Control.radio
                                            model=".children[1].gender"
                                            value="female"
                                            label="Female"
                                            component={Radio}
                                        />
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel defaultExpanded={rsvp.children[2] && rsvp.children[2].name ? true : false}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>Third Child</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container spacing={24}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <InputLabel>Name</InputLabel>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <Control.text
                                            model=".children[2].name"
                                            component={TextField}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <InputLabel>Age</InputLabel>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <Control.text
                                            model=".children[2].age"
                                            component={TextField}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <InputLabel>Gender</InputLabel>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <InputLabel>Male</InputLabel>
                                        <Control.radio
                                            model=".children[2].gender"
                                            value="male"
                                            color="primary"
                                            label="Male"
                                            component={Radio}
                                        />
                                        <br />
                                        <InputLabel>Female</InputLabel>
                                        <Control.radio
                                            model=".children[2].gender"
                                            value="female"
                                            label="Female"
                                            component={Radio}
                                        />
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel defaultExpanded={rsvp.children[3] && rsvp.children[3].name ? true : false}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>Fourth Child</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container spacing={24}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <InputLabel>Name</InputLabel>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <Control.text
                                            model=".children[3].name"
                                            component={TextField}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <InputLabel>Age</InputLabel>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <Control.text
                                            model=".children[3].age"
                                            component={TextField}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <InputLabel>Gender</InputLabel>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <InputLabel>Male</InputLabel>
                                        <Control.radio
                                            model=".children[3].gender"
                                            value="male"
                                            color="primary"
                                            label="Male"
                                            component={Radio}
                                        />
                                        <br />
                                        <InputLabel>Female</InputLabel>
                                        <Control.radio
                                            model=".children[3].gender"
                                            value="female"
                                            label="Female"
                                            component={Radio}
                                        />
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className={classes.inputLabel}>
                        <InputLabel>Would you like a photo with Santa?</InputLabel>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Control.checkbox
                            model=".photoWithSanta"
                            color="primary"
                            component={Switch}
                        />
                    </Grid>
                </Grid>
            </Form>
        );
    };
};

export default withStyles(styles)(ChildrensRsvpForm);
