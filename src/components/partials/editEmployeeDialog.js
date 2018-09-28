import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { cancelRsvp } from './../../actions/manageActions';

import RsvpForm from './rsvpForm';

const styles = theme => ({
    editDialog: {
        height: "500px"
    },
    button: {
        margin: theme.spacing.unit
    }
});

export class EditEmployeeDialog extends React.Component {
    constructor(props) {
        super(props);

        this.cancelRsvp = this.cancelRsvp.bind(this);
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

    render() {
        const { classes } = this.props;
        
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <DialogTitle>Edit RSVP</DialogTitle>
                <DialogContent className={classes.editDialog}>
                    <RsvpForm
                        model="forms.rsvp"
                        rsvp={this.props.rsvp}
                    />
                    <div style={{ textAlign: 'center' }}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.props.onSubmit}>Save</Button>
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
        rsvp: state.forms.rsvp,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        cancelRsvp: () => {
            return dispatch(cancelRsvp());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditEmployeeDialog));
