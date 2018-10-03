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
        margin: '0 auto',
        width: '512px',
        height: '512px'
    }
});

export class ChildrensFull extends React.Component {
    render() {
        const { classes } = this.props;

        const startDate = new Date(process.env.CHILDRENS_START_DATE);
        const endDate = new Date(process.env.CHILDRENS_END_DATE);

        return (
            <div id='closed' style={{ textAlign: 'center'}}>
                <img src='./../img/ChildrensBanner2018.png' className={classes.banner} />
                <div className={classes.content}>
                    <Typography variant="title">
                        The 2018 Shaw Childrens Christmas RSVP is now full.
                    </Typography>
                    <br /><br /><br />
                    <Typography variant="title">
                        Please contact the <a href="mailto:YearEndCelebration-Vancouver@sjrb.ca">Year End Celebration Committee</a> for any inquirires
                    </Typography>
                </div>
            </div>
        );
    }
};

export default withStyles(styles)(ChildrensFull);
