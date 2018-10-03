import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import localStorage from './../../helpers/cache';

class ChildrensLoginRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { component: Component, ...rest } = this.props;

        if(this.props.path !== '/childrens/confirmed') {
            localStorage.setItem('login-redirect', this.props.path);
        }

        return (
            <Route {...rest} render={props => (
                this.props.auth.childrensAuthenticated
                    ? <Component {...props} />
                    : <Redirect to={{ pathname: '/childrens', state: { from: props.location } }} />
            )} />
        );
    }
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default withRouter(connect(mapStateToProps)(ChildrensLoginRoute));
