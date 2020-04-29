import React, {Component} from "react";
import {Switch, Route} from 'react-router-dom';
import {authRedirect} from '../hoc/AuthRedirect'
import ContactsContainer from "../contacts/ContactsContainer";
import GroupsContainer from "../groups/GroupsContainer";
import ContactContainer from "../contact/ContactContainer";
import ContactEditContainer from "../contactEdit/ContactEditContainer";

class Private extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
                <Switch>
                    <Route exact path="/" component={ContactsContainer}/>
                    <Route exact path="/contacts" component={ContactsContainer}/>
                    <Route exact path="/contact/:contactId" component={ContactContainer}/>
                    <Route exact path="/contact/:contactId/edit" component={ContactEditContainer}/>
                    <Route exact path="/groups" component={GroupsContainer}/>
                </Switch>
        );
    }
}

const component = authRedirect(Private);
export default component;