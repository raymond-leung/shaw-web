import React from 'react';
import { connect } from 'react-redux'; 
import { Control, Form, actions } from 'react-redux-form';

import { addEmployee, getAddEmployeeLists } from './../../actions/manageActions';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    addEmployee: {
        width: '200px',
        backgroundColor: 'white',
    },
    dialogContent: {
        margin: "0px auto"
    },
    errors: {
        textAlign: 'center',
        color: 'red',
        fontWeight: '700',
        fontSize: '18px',
        marginBottom: '30px',
    },
    inputLabel: {
        display: 'flex',
        alignItems: 'center',
    }
});     
    
export class AddEmployeeDialog extends React.Component {
    constructor(props) {
        super(props); 
    
        this.state = {
            open: false,
            departments: [],
            locations: [],
            managers: [],
            vps: [],
            titles: []
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCreateEmployee = this.handleCreateEmployee.bind(this);

        this.props.getAddEmployeeLists().then((results) => {
            this.setState({
                departments: results.departments,
                locations: results.locations,
                managers: results.managers,
                vps: results.vps,
                titles: results.titles
            })
        });
    };
    
    handleOpen() {
        this.props.initAddEmployee();                       
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
        this.props.onAddComplete();
    }

    handleCreateEmployee() {
        this.props.doAddEmployee(this.props.addEmployee)
            .then((response) => {
                this.handleClose();
            })
            .catch((err) => {
                console.log('handleCreateEmployee err: ', this.props.addEmployee);
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.dialogContent}>
                <Button onClick={this.handleOpen} variant='outlined' className={classes.addEmployee}><AddIcon />Add Employee</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogContent>
                        {
                            this.props.addEmployee.isError ?
                                (
                                    <Typography variant="title" className={classes.errors}>{this.props.addEmployee.error.message}</Typography>
                                ) : null
                        }
                        <Form
                            model="forms.addEmployee"
                        >
                            <Grid container spacing={24}>
                                <Grid item lg={4} md={4} sm={4} xs={12} className={classes.inputLabel}>
                                    <InputLabel>Employee ID</InputLabel>
                                </Grid>
                                <Grid item lg={8} md={8} sm={8} xs={12}>
                                    <Control.text
                                        model=".employeeId"
                                        id="add-employee-id"
                                        component={TextField}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={12} className={classes.inputLabel}>
                                    <InputLabel>First Name</InputLabel>
                                </Grid>
                                <Grid item lg={8} md={8} sm={8} xs={12}>
                                    <Control.text
                                        model=".firstName"
                                        id="add-employee-first-name"
                                        component={TextField}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={12} className={classes.inputLabel}>
                                    <InputLabel>Last Name</InputLabel>
                                </Grid>
                                <Grid item lg={8} md={8} sm={8} xs={12}>
                                    <Control.text
                                        model=".lastName"
                                        id="add-employee-last-name"
                                        component={TextField}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={12} className={classes.inputLabel}>
                                    <InputLabel>Title</InputLabel>
                                </Grid>
                                <Grid item lg={8} md={8} sm={8} xs={12}>
                                    <Control.select
                                        model=".title"
                                        id="add-employee-title"
                                        component={Select}
                                    >
                                        {
                                            this.state.titles.map((title) => {
                                                return (<option key={title.title} value={title.title}>{title.title}</option>);
                                            })
                                        }
                                    </Control.select>
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={12} className={classes.inputLabel}>
                                    <InputLabel>Department</InputLabel>
                                </Grid>
                                <Grid item lg={8} md={8} sm={8} xs={12}>
                                    <Control.select
                                        model=".department"
                                        id="add-employee-department"
                                        component={Select}
                                    >
                                        { 
                                            this.state.departments.map((department) => {
                                                return (<option key={department.department} value={department.department}>{department.department}</option>)
                                            })
                                        }
                                    </Control.select>
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={12} className={classes.inputLabel}>
                                    <InputLabel>location</InputLabel>
                                </Grid>
                                <Grid item lg={8} md={8} sm={8} xs={12}>
                                    <Control.select
                                        model=".location"
                                        id="add-employee-location"
                                        component={Select}
                                    >
                                        {
                                            this.state.locations.map((location) => {
                                                return (<option key={location.location} value={location.location}>{location.location}</option>);
                                            })
                                        }
                                    </Control.select>
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={12} className={classes.inputLabel}>
                                    <InputLabel>Email Address</InputLabel>
                                </Grid>
                                <Grid item lg={8} md={8} sm={8} xs={12}>
                                    <Control.text
                                        model=".email"
                                        id="add-employee-email"
                                        component={TextField}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={12} className={classes.inputLabel}>
                                    <InputLabel>Manager</InputLabel>
                                </Grid>
                                <Grid item lg={8} md={8} sm={8} xs={12}>
                                    <Control.select
                                        model=".manager"
                                        id="add-employee-manager"
                                        component={Select}
                                    >
                                        {
                                            this.state.managers.map((manager) => {
                                                return (<option key={manager.manager} value={manager.manager}>{manager.manager}</option>);
                                            })
                                        }
                                    </Control.select>
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={12} className={classes.inputLabel}>
                                    <InputLabel>VP</InputLabel>
                                </Grid>
                                <Grid item lg={8} md={8} sm={8} xs={12}>
                                    <Control.select
                                        model=".vp"
                                        id="add-employee-vp"
                                        component={Select}
                                    >
                                        {
                                            this.state.vps.map((vp) => {
                                                return (<option key={vp.vp} value={vp.vp}>{vp.vp}</option>)
                                            })
                                        }
                                    </Control.select>
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={12} className={classes.inputLabel}>
                                    <InputLabel>Allergies</InputLabel>
                                </Grid>
                                <Grid item lg={8} md={8} sm={8} xs={12}>
                                    <Control.text
                                        model=".alergies"
                                        id="add-employee-allergies"
                                        component={TextField}
                                    />
                                </Grid>
                            </Grid>
                        </Form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCreateEmployee} variant="contained" color="primary">Create</Button>
                        <Button onClick={this.handleClose} variant="outlined" color="primary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
};  
    
const mapStateToProps = (state) => {
    return {
        addEmployee: state.forms.addEmployee,
    };
};
    
const mapDispatchToProps = (dispatch) => {
    return {
        initAddEmployee: () => { dispatch({ type: 'ADD_EMPLOYEE_INIT', payload: {} }) },
        doAddEmployee: (employeeObj) => { return dispatch(addEmployee(employeeObj)) },
        getAddEmployeeLists: () => { return dispatch(getAddEmployeeLists()) }
    };          
}           
        
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddEmployeeDialog));
