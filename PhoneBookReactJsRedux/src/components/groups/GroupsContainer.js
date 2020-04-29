import React, {Component} from 'react';
import {connect} from "react-redux";
import {addGroupFetch, deleteGroupFetch, getGroupsFetch} from "../../store/groups/actions";
import {Groups} from "./Groups";


class GroupsContainer extends Component {
    render() {
        return <Groups groups={this.props.groups}
                       getGroupsFetch={this.props.getGroupsFetch}
                       addGroupFetch={this.props.addGroupFetch}
                       deleteGroupFetch={this.props.deleteGroupFetch}/>
    }
}

const mapStateToProps = state => {
    return {
        groups: state.groups.groups,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGroupsFetch: () => dispatch(getGroupsFetch()),
        addGroupFetch: name => dispatch(addGroupFetch(name)),
        deleteGroupFetch: groupId => dispatch(deleteGroupFetch(groupId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);