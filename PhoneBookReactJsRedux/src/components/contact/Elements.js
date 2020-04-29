import React, {Fragment} from "react";

export function ItemContact(props) {
    const {contact} = props;

    return (
        <ul className="contact">
            {createNote('Имя', contact.name)}
            {createNote('Email', contact.email)}
            {createNote('Дата рождения', new Date(contact.dateOfBirth).toLocaleDateString())}
            {createNote('Пол', contact.gender)}
            {create('Номера', contact.phoneCategories)}
            {create('Адреса', contact.addressCategories)}
            {contact.notes ? contact.notes.map(i => createNote(i.name, i.content)) : null}
        </ul>
    )
}

const create = (name, categories) => {
    return (
        <li>
            <div className="name">{name}</div>
            <div className="categories">
                {categories.map(i => createCategory(i.name, i.items))}
            </div>
        </li>
    );
};

const createCategory = (category, items) => {
    return (
        <ul>
            <div className="category">{category}</div>
            {items.map(i => createItem(i.name))}
        </ul>
    );
};

const createItem = (content) => {
    return (
        <div className="categoryItem">{content}</div>
    );
};

const createNote = (name, content) => {
    debugger;
    if (content === null || content === '') return '';
    if (name === 'Пол')
        switch (content) {
            case 0: return '';
            case 2: content = "Жен"; break;
            case 1: content = "Муж"; break;
        }

    return (<li>
        <div className="name">{name}</div>
        <div className="content">{content}</div>
    </li>)
};