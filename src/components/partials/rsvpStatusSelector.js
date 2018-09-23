import React from 'react';
import { Control, actions } from 'react-redux-form';

import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = themes => ({
});

export class RsvpStatusSelector extends React.Component {
    render() {
        const { classes, model } = this.props;

        return (
            <Control
                model={model}
                mapProps={{
                    selected: props => props.modelValue.toString(),
                    onChange: (props) => {
                        return (evt) => {
                            props.dispatch(actions.change(props.model, evt.target.value))
                        }
                    }
                }}
                component={(props) => {
                    return (
                        <RadioGroup
                            name="status"
                            value={props.selected}
                            onChange={props.onChange}
                        >
                            <FormControlLabel
                                value="1"
                                control={<Radio color="primary" />}
                                label="Attending"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="2"
                                control={<Radio color="primary" />}
                                label="Not Attending"
                                labelPlacement="end"
                            />
                        </RadioGroup>
                    )
                }}
            />
        );
    }
};

export default withStyles(styles)(RsvpStatusSelector);
