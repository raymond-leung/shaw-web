import React from 'react';
import { connect } from 'react-redux';
import { CSVDownload } from 'react-csv';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
import AppBar from '@material-ui/core/AppBar';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import AddChildrensEmployeeDialog from './../partials/addChildrensEmployeeDialog';
import EditChildrensEmployeeDialog from './../partials/editChildrensEmployeeDialog.js';

import { getList, getCounts, getEmployee, searchEmployee, updateEmployee } from './../../actions/childrensManageActions';

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

export class ChildrensManage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openEditDialog: false,
            targetStatus: 1,
            csvData: []
        };

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

    handleSearchChange(evt) {
        this.setState({ searchTerm: evt.target.value });
        this.props.searchTermChange(evt.target.value)
        if(evt.target.value.length > 0) {
            this.props.doSearch(evt.target.value);
        }
    }

    editEmployee(evt) {
        this.props.lookupEmployee(evt.target.innerHTML)
            .then((response) => {
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

    generateCSV(done) {
        const promiseArray = [
            this.props.getList(1),
            this.props.getCounts()
        ];

        return Promise.all(promiseArray)
            .then((results) => {
                let csvData = [ ["Employee ID", "Name", "Spouse", "Dietary", "Photo", "Child Name", "Child Age", "Child Gender", "Relationship"] ];

                results[0].forEach((attending) => {
                    csvData.push([
                        attending.employeeId,
                        `${attending.firstName} ${attending.lastName}`,
                        attending.spouseName,
                        attending.dietary,
                        attending.photo ? "Yes" : "No",
                        attending.children[0].name,
                        attending.children[0].age,
                        attending.children[0].gender,
                        attending.children[0].relationship
                    ]);

                    if(attending.children.length > 1) {
                        for(let ii=1; ii< attending.children.length; ii++) {
                            csvData.push([
                                "",
                                "",
                                "",
                                "",
                                "",
                                attending.children[ii].name,
                                attending.children[ii].age,
                                attending.children[ii].gender,
                                attending.children[ii].relationship
                            ])
                        }
                    }
                });

                csvData.push([`There are ${results[1].attending} total attendees -  ${results[1].adults} adults and ${parseInt(results[1].boys) + parseInt(results[1].girls)} total children attending (${results[1].boys} boys & ${results[1].girls} girls)`]);

                this.setState({ csvData: csvData });
            })
            .catch((err) => {
                console.log('results error: ', err);
            })
    }

    componentDidMount() {
        this.props.getList(1)
            .catch((err) => {
                if(err.response.status === 403 || err.response.status === 401) {
                    this.props.history.push('/childrens');
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

                    <AddChildrensEmployeeDialog 
                        onAddComplete={this.addComplete}
                    />
                    
                    <Button
                        onClick={() => { this.generateCSV() }}
                    >Export</Button>
                    { this.state.csvData && this.state.csvData.length ? (
                        <CSVDownload
                            data={this.state.csvData}
                            target="_blank"
                        />) : null }
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
                                <TableCell>Spouse/Partner</TableCell>
                                <TableCell>Dietary Restrictions</TableCell>
                                <TableCell>Children</TableCell>
                                <TableCell>Santa Photo</TableCell>
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
                                                } 

                                                return (
                                                    <TableRow key={attending.employeeId}>
                                                        <TableCell onClick={this.editEmployee}><a href="javascript:void(0)">{attending.employeeId}</a></TableCell>
                                                        <TableCell>{attending.firstName} {attending.lastName}</TableCell>
                                                        <TableCell>{attending.email}</TableCell>
                                                        <TableCell>{attending.spouseName}</TableCell>
                                                        <TableCell>{attending.dietary}</TableCell>
                                                        <TableCell>
                                                        {
                                                            attending.children && attending.children.map((child) => {
                                                                return (
                                                                    <div key={`${attending.employeeId}-${child.name}`}>{child.name} {child.age} {child.gender} { child.relationship}</div>
                                                                )
                                                            })
                                                        }
                                                        </TableCell>
                                                        <TableCell>{attending.photoWithSanta ? 'Yes' : 'No'}</TableCell>
                                                        <TableCell>{status}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7}>
                                                <Typography variant="title">No RSVPs</Typography>
                                            </TableCell>
                                        </TableRow>
                                    )   
                            }
                            {
                                <EditChildrensEmployeeDialog
                                    open={this.state.openEditDialog}
                                    onClose={this.handleCloseEditDialog}
                                    onSubmit={this.handleEditSubmit}
                                    employee={this.state.targetEmployee}
                                />
                            }
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
        manage: state.childrensManage,
        addEmployee: state.forms.addEmployee,
        rsvpForm: state.forms.childrensRsvp
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (status) => { return dispatch(getList(status)) },
        getCounts: () => { return dispatch(getCounts()) },
        lookupEmployee: (employeeId) => { return dispatch(getEmployee(employeeId)) },
        updateEmployee: (rsvpObj) => { return dispatch(updateEmployee(rsvpObj)) },
        doSearch: (searchTerm) => { dispatch(searchEmployee(searchTerm)) },
        searchTermChange: (newSearchTerm) => { dispatch({ type: 'CHILDRENS_SEARCH_TERM', payload: { searchTerm: newSearchTerm } }) },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChildrensManage));
