import React from 'react';
import { connect } from 'react-redux';
import { CSVDownload } from 'react-csv';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
import AppBar from '@material-ui/core/AppBar';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import AddEmployeeDialog from './partials/addEmployeeDialog';
import EditEmployeeDialog from './partials/editEmployeeDialog';

import { getList, getCounts, getEmployee, searchEmployee, updateEmployee } from './../actions/manageActions';

const styles = theme => ({
    grow: { 
        flexGrow: 1 
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginLeft: 0,
        width: '30%',
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
    }
});

export class Manage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 10,
            openEditDialog: false,
            targetStatus: 1,
            csvData: []
        };

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleOpenEditDialog = this.handleOpenEditDialog.bind(this);
        this.handleCloseEditDialog = this.handleCloseEditDialog.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.addComplete = this.addComplete.bind(this);
        this.generateCSV = this.generateCSV.bind(this);
    }

    addComplete() {
        this.props.getCounts();
    }

    handleOpenEditDialog() {
        this.setState({ openEditDialog: true });
    }

    handleCloseEditDialog() {
        this.setState({ openEditDialog: false });
    }

    handleChangePage(evt, page) {
        this.setState({ page });
    }

    handleChangeRowsPerPage(evt) {
        this.setState({ rowsPerPage: evt.target.value });
    }

    handleSearchChange(evt) {
        this.setState({ searchTerm: evt.target.value });
        this.props.searchTermChange(evt.target.value)
        if(evt.target.value.length > 0) {
            this.props.doSearch(evt.target.value);
        }
    }

    editEmployee(evt) {
        this.props.lookupEmployee(evt.target.innerHTML)
            .then(() => {
                this.handleOpenEditDialog();
            })
            .catch((err) => {
                console.log('lookup error: ', err);
            })
    }

    handleEditSubmit() {
        this.props.updateEmployee(this.props.rsvpForm)
            .then(() => {
                this.props.getList(this.state.targetStatus);
                this.props.getCounts();
                this.setState({ openEditDialog: false });
            })
            .catch((err) => {
                console.log('update error: ', err);
            })
    }

    generateCSV() {
        this.props.getList(1)
            .then((results) => {
                let csvData = [ ["Employee ID", "First Name", "Last Name", "Guest", "Email", "Dietary", "Assistance"] ];
                results.forEach((attending) => {
                    csvData.push([
                        attending.empmloyeeId,
                        attending.firstName,
                        attending.lastName,
                        attending.guestName,
                        attending.email,
                        attending.dietary,
                        attending.assistance
                    ]);
                });

                this.setState({ csvData: csvData });
            })
            .catch((err) => {
                console.log('Error fetching data for CSV export: ', err);
            })
    }

    componentDidMount() {
        this.props.getList(1)
            .catch((err) => {
                if(err.response.status === 403) {
                    this.props.history.push('/');
                }
            });

        this.setState({ targetStatus: 1 });
        this.props.getCounts();
    }

    render() {
        const { classes } = this.props;
        const { page, rowsPerPage } = this.state;
        const counts = this.props.manage.rsvpCounts;

        let displayContent = [];
        if(this.props.manage.searchTerm.length > 0) {
            displayContent = this.props.manage.searchResults;
        } else {
            displayContent = this.props.manage.list;
        }

        return (
            <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <Input
                            placeholder="Search..."
                            disableUnderline
                            onChange={this.handleSearchChange}
                            value={this.state.searchTerm}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                        />
                    </div>

                    <Button onClick={ () => { 
                        this.setState({ targetStatus: 1 });
                        this.props.searchTermChange("");
                        this.setState({ searchTerm: "" });
                        this.props.getList(1) } 
                    }>Attending ({ counts.attending || 0 })</Button>
                    <Button onClick={ () => { 
                        this.setState({ targetStatus: 2 }); 
                        this.props.searchTermChange("");
                        this.setState({ searchTerm: "" });
                        this.props.getList(2) } 
                    }>Not Attending ({ counts.notAttending || 0 })</Button>
                    <Button onClick={ () => { 
                        this.setState({ targetStatus: 0 }); 
                        this.props.searchTermChange("");
                        this.setState({ searchTerm: "" });
                        this.props.getList(0) } 
                    }>Cancelled ({ counts.cancelled || 0 })</Button>
                    <Button onClick={ () => { 
                        this.setState({ targetStatus: null }); 
                        this.props.searchTermChange("");
                        this.setState({ searchTerm: "" });
                        this.props.getList(null) } 
                    }>Not Responded ({ counts.notResponded || 0 })</Button>

                    <AddEmployeeDialog 
                        onAddComplete={this.addComplete}
                    />

                    <Button
                        onClick={() => { this.generateCSV() }}
                    >Export</Button>
                    {
                        this.state.csvData && this.state.csvData.length ? (
                            <CSVDownload
                                data={this.state.csvData}
                                target='_blank'
                            />
                        ): null
                    }
                </Toolbar>
            </AppBar>

            <Paper>
                <div id='manage'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Employee ID</TableCell>
                                <TableCell>Employee Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Allergies</TableCell>
                                <TableCell>RSVP Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                displayContent.length ?
                                    (
                                        displayContent
                                            .map((attending) => {
                                                let status = 'No Response';
                                                if(attending.status === 0) {
                                                    status = 'Cancelled';
                                                } else if(attending.status === 1) {
                                                    status = 'Attending';
                                                } else if(attending.status === 2) {
                                                    status = 'Not Attending';
                                                }

                                                return (
                                                    <TableRow key={attending.employeeId}>
                                                        <TableCell onClick={this.editEmployee}><a href="javascript:void(0)">{attending.employeeId}</a></TableCell>
                                                        <TableCell>{attending.firstName} {attending.lastName}</TableCell>
                                                        <TableCell>{attending.email}</TableCell>
                                                        <TableCell>{attending.alergies}</TableCell>
                                                        <TableCell>{status}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6}>
                                                <Typography variant="title">No RSVPs</Typography>
                                            </TableCell>
                                        </TableRow>
                                    )   
                            }
                            <EditEmployeeDialog
                                open={this.state.openEditDialog}
                                onClose={this.handleCloseEditDialog}
                                onSubmit={this.handleEditSubmit}
                                employee={this.state.targetEmployee}
                            />
                        </TableBody>
                    </Table>
                </div>
            </Paper>
            </React.Fragment>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        manage: state.manage,
        addEmployee: state.forms.addEmployee,
        rsvpForm: state.forms.rsvp
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (status) => { return dispatch(getList(status)) },
        getCounts: () => { dispatch(getCounts()) },
        lookupEmployee: (employeeId) => { return dispatch(getEmployee(employeeId)) },
        updateEmployee: (rsvpObj) => { return dispatch(updateEmployee(rsvpObj)) },
        doSearch: (searchTerm) => { dispatch(searchEmployee(searchTerm)) },
        searchTermChange: (newSearchTerm) => { dispatch({ type: 'SEARCH_TERM', payload: { searchTerm: newSearchTerm } }) },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Manage));
