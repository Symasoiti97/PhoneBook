import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import {getGroupsFetch} from "../../store/groups/actions";
import ModalWindow from "../ModalWindow";

export function Groups(props) {
    const {groups, getGroupsFetch, addGroupFetch} = props;
    const refNewGroup = React.createRef();

    React.useEffect(() => {
        getGroupsFetch();
    }, []);

    const addGroup = (e) => {
        const name = e.target.elements["newGroup"].value;
        addGroupFetch(name);
    };

    return (
        <div className="main">
            <div className="header">
                <span className="text"><Link to="/contacts">Контакты</Link></span>
                <span className="text"><Link to="#" className="active">Группы</Link></span>
            </div>
            <div className="body content">
                <ul>
                    {groups.length > 0 ? groups.map(i => <Group group={i} {...props}/>) : null}
                </ul>
            </div>
            <div className="footer">
                <form className="groups-form" onSubmit={addGroup}>
                    <input className="text" name="newGroup" type="text" placeholder="Имя группы"/>
                    <input className="btn" type="submit" value="Создать"/>
                </form>
            </div>
        </div>
    );
}

function Group(props) {
    const {group, deleteGroupFetch} = props;
    const [isOpenGroup,setOpenGroup] = React.useState(false);
    const removeGroup = (e) => {
        const groupId = e.target.dataset.id;
        deleteGroupFetch(groupId);
    };

    const openGroup = () => {
     setOpenGroup(true);
    };

    const closeGroup = () => {
        setOpenGroup(false)
    };

    return (
        <Fragment>
            <li key={group.id}>
                <button className="group" data-id={group.id} onClick={openGroup}>{group.name}
                    <button className="remove" data-id={group.id} onClick={removeGroup}>
                        X
                    </button>
                </button>
            </li>

            {/*{isOpenGroup ? <ModalWindow child={}/>}*/}
        </Fragment>
    );
}


function GroupContacts(props) {
    const {groupId, closeGroup} = props;

    return {

    }
}