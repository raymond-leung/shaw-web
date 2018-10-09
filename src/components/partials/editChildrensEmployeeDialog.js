import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { cancelRsvp, attendingRsvp } from './../../actions/childrensManageActions';

import ChildrensRsvpForm from './childrensRsvpForm';

const styles = theme => ({
    editDialog: {
        height: "500px"
    },
    button: {
        margin: theme.spacing.unit
    }
});

export class EditChildrensEmployeeDialog extends React.Component {
    constructor(props) {
        super(props);

        this.cancelRsvp = this.cancelRsvp.bind(this);
        this.attendingRsvp = this.attendingRsvp.bind(this);
    };

    cancelRsvp() {
        this.props.cancelRsvp()
            .then(() => {
                this.props.onSubmit();
            })
            .catch((err) => {
                console.log('Cancel error: ', err);
            })
    };

    attendingRsvp() {
        this.props.attendingRsvp()
            .then(() => {
                this.props.onSubmit();
            })
            .catch((err) => {
                console.log('RSVP error: ', err);
            });
    }

    render() {
        const { classes } = this.props;
console.log('edit: ', this.props.rsvp);        
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                maxWidth="lg"
            >
                <DialogTitle>Edit RSVP</DialogTitle>
                <DialogContent className={classes.editDialog}>
                    <ChildrensRsvpForm
                        model="forms.childrensRsvp"
                        rsvp={this.props.rsvp}
                    />
                    <div style={{ textAlign: 'center' }}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.attendingRsvp}>Save</Button>
                        <Button variant="outlined" color="primary" className={classes.button} onClick={this.cancelRsvp}>Cancel RSVP</Button>
                        <Button variant="outlined" color="default" onClick={this.props.onClose} className={classes.button}>Close</Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        rsvp: state.forms.childrensRsvp,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        cancelRsvp: () => {
            return dispatch(cancelRsvp());
        },
        attendingRsvp: () => {
            return dispatch(attendingRsvp());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditChildrensEmployeeDialog));
