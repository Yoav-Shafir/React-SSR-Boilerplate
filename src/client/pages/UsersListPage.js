import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { fetchUsers } from "../actions";

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map(users => {
      return <li key={users.id}>{users.name}</li>;
    });
  }

  head() {
    const title = `${this.props.users.length} Users loaded`;
    return (
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
        Here's a big list of users:
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function loadData(store) {
  // Why are we doing it manually and not by using the `connect` function
  // to handle the action creator as we normally do?
  // In traditional app the `connect` function communicates or depends on the `<Provider />` tag
  // which has a ref to the Redux store. however in our case - server side rendering -
  // we want to do all the data fetching and poplulating the Redux store before rendering the application at all
  // which means no <Provider /> tag at that point of time.
  // So, we can do it manually all the Redux functionality will apply.
  return store.dispatch(fetchUsers());
}

UsersList = connect(
  mapStateToProps,
  { fetchUsers }
)(UsersList);

export default { component: UsersList, loadData };
