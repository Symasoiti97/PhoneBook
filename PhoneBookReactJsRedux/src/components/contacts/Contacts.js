import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import ModalWindow from "../ModalWindow";
import ContactCreateContainer from "../contactCreate/ContactCreateContainer";
import {withRouter} from 'react-router-dom'

class Contacts extends Component {
    constructor(props) {
        super(props);

        this.onContactOpen = this.onContactOpen.bind(this);
        this.onContactCreate = this.onContactCreate.bind(this);
        this.onSearchContacts = this.onSearchContacts.bind(this);
    }

    componentDidMount() {
        this.props.searchContactsFetch();
    }

    onContactOpen(e) {
        e.preventDefault();
        const subId = e.target.dataset.id;
        if (subId)
            this.props.history.push(`/contact/${subId}`);
    }

    onSearchContacts(e) {
        e.preventDefault();
        const search = this.refs.search.value;
        this.props.searchContactsFetch(search);
    }

    onContactCreate(e) {
        e.preventDefault();
        this.props.openWindowCreateContact();
    }

    render() {
        const {contacts, isOpenWindowCreateContact} = this.props;
        const items = contacts.map((item) =>
            <li>
                <button className="item" data-id={item.id} onClick={this.onContactOpen}>{item.name}</button>
            </li>);

        const com = () => (<ContactCreateContainer/>);

        return (
            <Fragment>
                <div className="main">
                    <div className="header">
                        <span className="text"><a className="active" href="#">Контакты</a></span>
                        <span className="text"><Link to="/groups">Группы</Link></span>
                    </div>
                    <div className="body content">
                        <ul className="list-contact">
                            {items}
                        </ul>
                    </div>
                    <div className="footer footer-contacts">
                        <form className="contacts-form">
                            <input className="text" ref="search" type="text" placeholder="Поиск"/>
                            <input className="btn" type="button" value="Найти" onClick={this.onSearchContacts}/>
                            <input className="btn" type="button" value="Добавить" onClick={this.onContactCreate}/>
                        </form>
                    </div>
                </div>

                {isOpenWindowCreateContact ? <ModalWindow child={com}/> : null}
            </Fragment>);
    }
}

export default withRouter(Contacts);