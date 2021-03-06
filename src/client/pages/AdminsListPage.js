import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchAdmins } from "../actions";
import requireAuth from "../components/hocs/requireAuth";

class AdminsList extends Component {
  componentDidMount() {
    this.props.fetchAdmins();
  }

  renderAdmins() {
    return this.props.admins.map(admin => {
      return <li key={admin.id}>{admin.name}</li>;
    });
  }

  render() {
    return (
      <div>
        <h3>Protected list of admins</h3>
        <ul>{this.renderAdmins()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ admins }) {
  return { admins };
}

AdminsList = connect(
  mapStateToProps,
  { fetchAdmins }
)(requireAuth(AdminsList));

export default {
  component: AdminsList,
  loadData: ({ dispatch }) => dispatch(fetchAdmins())
};
