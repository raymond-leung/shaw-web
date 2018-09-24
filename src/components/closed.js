import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    content: {
        margin: "0 auto",
        textAlign: 'center',
        marginTop: '50px',
        marginBottom: '100px'
    },
    banner: {
        width: '100%',
        margin: '0 auto',
    }
});

export class Closed extends React.Component {
    render() {
        const { classes } = this.props;

        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        const startDate = new Date(process.env.START_DATE);
        const endDate = new Date(process.env.END_DATE);

        return (
            <div id='closed'>
                <img src='./img/1920x800.jpg' className={classes.banner} />
                <div className={classes.content}>
                    <Typography variant="title">
                        The 2018 End of Year Celebration RSVP is available between <br /><br />
                        {months[startDate.getMonth()]} {startDate.getDate()}, {startDate.getFullYear()} <br /><br />till<br /><br />
                        {months[endDate.getMonth()]} {endDate.getDate()}, {endDate.getFullYear()}.
                    </Typography>

                    <br /><br /><br />
                    <Typography variant="title">
                        Please contact the <a href="mailto:YearEndCelebration-Vancouver@@sjrb.ca">Year End Celebration Committee</a> for any inquirires
                    </Typography>
                </div>
            </div>
        );
    }
};

export default withStyles(styles)(Closed);
