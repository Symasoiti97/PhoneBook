import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import ModalWindow from "../ModalWindow";
import uuid from "react-uuid"

function getContactWitchRefs(contact) {
    const phoneCategories = contact.phoneCategories.map(i => {
        return {
            id: i.id,
            ref: React.createRef(),
            value: i.name,
            items: i.items.map(j => {
                return {
                    id: j.id,
                    ref: React.createRef(),
                    value: j.name
                }
            })
        }
    });

    const addressCategories = contact.addressCategories.map(i => {
        return {
            id: i.id,
            ref: React.createRef(),
            value: i.name,
            items: i.items.map(j => {
                return {
                    id: j.id,
                    ref: React.createRef(),
                    value: j.name
                }
            })
        }
    });

    const notes = contact.notes.map(i => {
        return {
            refName: React.createRef(),
            name: i.name,
            refValue: React.createRef(),
            value: i.content
        }
    });

    return {
        id: contact.id,
        name: {
            ref: React.createRef(),
            value: contact.name
        },
        email: {
            ref: React.createRef(),
            value: contact.email
        },
        gender: {
            ref: React.createRef(),
            value: contact.gender
        },
        dateOfBirth: {
            ref: React.createRef(),
            value: contact.dateOfBirth
        },
        phoneCategories: phoneCategories,
        addressCategories: addressCategories,
        notes: notes
    }
}

export function ContactEdit(props) {
    const {contact, getContactFetch, updateContactFetch, deleteContactFetch, contactId} = props;
    const [contactState, setContact] = React.useState(getContactWitchRefs(contact));

    const addCategory = (e) => {
        const name = e.target.name;
        contactState[name].push({
            id: uuid(),
            value: "New category",
            ref: React.createRef(),
            items: []
        });
        setContact({...contactState});
    };

    const removeCategory = (e) => {
        const name = e.target.name;
        const id = e.target.dataset.id;
        contactState[name] = contactState[name].filter(i => i.id !== id);
        setContact({...contactState});
    };

    const addCategoryNote = (e) => {
        const categoryId = e.target.dataset.id;
        const name = e.target.name;
        contactState[name].filter(i => i.id === categoryId)[0].items.push({
            id: uuid(),
            ref: React.createRef(),
            value: ""
        });
        setContact({...contactState});
    };

    const removeCategoryNote = (e) => {
        debugger;
        const name = e.target.name;
        const id = e.target.dataset.id;
        const categoryId = e.target.dataset.subcategoryid;
        contactState[name].filter(i => i.id === categoryId)[0].items = contactState[name]
            .filter(i => i.id === categoryId)[0].items.filter(i => i.id !== id);
        setContact({...contactState});
    };

    const removeContact = () => {
        deleteContactFetch(contactId);
    };

    const saveContact = () => {
        const name = contactState["name"].ref.current.value;
        const email = contactState["email"].ref.current.value;
        const gender = contactState["gender"].ref.current.value;
        const dateOfBirth = contactState["dateOfBirth"].ref.current.value;
        const phoneCategories = contactState.phoneCategories.map(i => {
                return {
                    id: i.id,
                    name: i.ref ? i.ref.current.value : i.value,
                    items: i.items.map(j => {
                        return{
                          id: j.id,
                          name: j.ref ? j.ref.current.value : j.value
                        };
                    })
                };
        });
        const addressCategories = contactState.addressCategories.map(i => {
            return {
                id: i.id,
                name: i.ref ? i.ref.current.value : i.value,
                items: i.items.map(j => {
                    return{
                        id: j.id,
                        name: j.ref ? j.ref.current.value : j.value
                    };
                })
            };
        });
        const notes = [];
        const groupIds = [];

        const contactId = contactState.id;
        const updateContact = {
            name,
            email,
            gender: Number(gender),
            dateOfBirth: null,
            phoneCategories,
            addressCategories,
            notes,
            groupIds
        };
        debugger;
        //redirect
        updateContactFetch(contactId, updateContact);
    };

    const linkSub = `/contact/${contactId}`;

    return (<Fragment>
            <div className="main">
                <div className="header">
                    <span className="text"><Link to={linkSub}>Отмена</Link></span>
                    <span className="text">
                        <Link to="#" onClick={saveContact}>Сохранить</Link>
                    </span>
                </div>
                <div className="body content">
                    {contactState ?
                        <ul>
                            <StaticNote name="Имя" content={contactState.name}/>
                            <StaticNote name="Email" content={contactState.email}/>
                            <GenderNote gender={contactState.gender}/>
                            <DateNote date={contactState.dateOfBirth}/>
                            <Category name="phoneCategories" subCategories={contactState.phoneCategories}
                                      addCategory={addCategory} removeCategory={removeCategory}
                                      addCategoryNote={addCategoryNote} removeCategoryNote={removeCategoryNote}/>
                            <Category name="addressCategories" subCategories={contactState.addressCategories}
                                      addCategory={addCategory} removeCategory={removeCategory}
                                      addCategoryNote={addCategoryNote} removeCategoryNote={removeCategoryNote}/>
                        </ul> : null}
                </div>
                <div className="footer">
                </div>
            </div>
        </Fragment>
    )
}

function ContactEditDef(props) {
    const {contact, getContactFetch, updateContactFetch, deleteContactFetch, contactId} = props;
    const {addCategoryPhoneFetch, deleteCategoryPhoneFetch, addCategoryAddressFetch, deleteCategoryAddressFetch} = props;
    const [contactState, setContact] = React.useState(contact);
    const [modalState, setModal] = React.useState({isOpen: false, type: ""});

    React.useEffect(() => {
        getContactFetch(contactId);
    }, []);

    const changeName = (e) => {
        const target = e.target;
        const index = e.target.dataset.index;
        const value = target.value;
        let item = this.state.item;

        item.notes[index] = {
            name: value,
            content: item.notes[index].content
        };

        this.setState({item: item});
    };

    const changeValue = (e) => {
        const target = e.target;
        const index = target.dataset.index;
        const nameListCategory = target.dataset.name;
        const name = target.name;
        const value = target.value;
        const item = contactState;
        if (name === 'name')
            item.name = value;
        if (name === 'email')
            item.email = value;
        else if (name === 'dateOfBirth') {
            item.dateOfBirth = new Date(value).toLocaleDateString();
        } else if (name === 'gender')
            item.gender = value;
        else if (index && name === "contentNote")
            item.notes[index] = {
                name: name,
                value: value
            };
        else if (index && name && nameListCategory === "Номера")
            item.phoneCategories[name].items[index] = {
                name: name,
                value: value
            };
        else if (index && name && nameListCategory === "Адреса")
            item.addressCategories[name].items[index] = {
                name: name,
                value: value
            };

        setContact(item);
    };

    const addCategory = (e) => {
        const {id} = contactState;
        const name = e.target.name;
        if (name === "Номера")
            setModal({isOpen: true, type: "Number", contactId: id, addCategoryFetch: addCategoryPhoneFetch});
        if (name === "Адреса")
            setModal({isOpen: true, type: "Number", contactId: id, addCategoryFetch: addCategoryAddressFetch});
    };

    const removeCategory = (e) => {
        const categoryId = e.target.dataset.id;
        const name = e.target.name;
        if (name === "Номера")
            deleteCategoryPhoneFetch(categoryId, contactState.id);
        if (name === "Адреса")
            deleteCategoryAddressFetch(categoryId, contactState.id);
    };

    const addCategoryNote = (e) => {
        const categoryId = e.target.dataset.id;
        const name = e.target.name;
        if (name === "Номера") {
            const phoneCategories = contactState.phoneCategories;
            const category = phoneCategories.filter(i => i.id === categoryId)[0];
            category.items.push({id: "", name: ""});
            contactState.phoneCategories = phoneCategories;
            setContact({...contactState});
        }
        if (name === "Адреса") {
            const addressCategories = contactState.addressCategories;
            const category = addressCategories.filter(i => i.id === categoryId)[0];
            category.items.push({id: "", name: ""});
            contactState.addressCategories = addressCategories;
            setContact({...contactState});
        }
    };

    const removeCategoryNote = (e) => {

    };

    const removeContact = () => {
        deleteContactFetch(contactId);
    };

    const closeModal = () => {
        setModal({isOpen: false});
    };

    const saveContact = () => {
        const {name, email, gender, dateOfBirth} = this.ref;

        const contact = {
            ...contactState.contact,
            name: name.value,
            email: email.value,
            gender: gender.value,
            dateOfBirth: dateOfBirth.value
        };

        updateContactFetch(contact);
    };

    const linkSub = `/contact/${contactId}`;

    return (
        <Fragment>
            <div className="main">
                <div className="header">
                    <span className="text"><Link to={linkSub}>Отмена</Link></span>
                    <span className="text">
                        <Link to="#" onClick={saveContact}>Сохранить</Link>
                    </span>
                </div>
                <div className="body content">
                    {contactState ?
                        <ul>
                            <StaticNote name="Имя" content={contactState.name} changeValue={changeValue}/>
                            <StaticNote name="Email" content={contactState.email} changeValue={changeValue}/>
                            <GenderNote gender={contactState.gender} changeValue={changeValue}/>
                            <DateNote date={contactState.dateOfBirth} changeValue={changeValue}/>
                            <Category name="Номера" categories={contactState.phoneCategories}
                                      changeValue={changeValue} changeName={changeName}
                                      addCategory={addCategory} removeCategory={removeCategory}
                                      addCategoryNote={addCategoryNote} removeCategoryNote={removeCategoryNote}/>
                            <Category name="Адреса" categories={contactState.addressCategories}
                                      changeValue={changeValue} changeName={changeName}
                                      addCategory={addCategory} removeCategory={removeCategory}
                                      addCategoryNote={addCategoryNote} removeCategoryNote={removeCategoryNote}/>
                        </ul> : null}
                </div>
                <div className="footer">
                <span className="text flex">
                    <Link className="text-red" to={linkSub} onClick={removeContact}>Удалить контакт</Link>
                </span>
                </div>
            </div>
            {modalState.isOpen ?
                <ModalWindow child={() => <AddCategory closeModal={closeModal} {...modalState}/>}/> : null}
        </Fragment>
    );
}

function StaticNote(props) {
    const {name, content} = props;
    return (<li>
        <div className="name">{name}</div>
        <div className="content">
            <input className="border-none note" type="text"
                   placeholder={name} defaultValue={content.value}
                   ref={content.ref}/>
        </div>
    </li>)
}

function DynamicNote(props) {
    const {name, content, index, removeNote} = props;
    return (<li className="height-auto">
        <div className="name">
            <input className="border-none note" type="text" placeholder="Укажите имя поля"
                   data-index={index} name="nameNote" defaultValue={name}
            />
            <button className="remove" data-index={index} onClick={removeNote}>
                X
            </button>
        </div>
        <div className="content">
            <input className="border-none note" type="text" placeholder="Укажите значение поля"
                   data-index={index} defaultValue={content} name="contentNote"
            />
        </div>
    </li>)
}

function Category(props) {
    const {name, subCategories, addCategory} = props;
    return (
        <li>
            <div className="name">
                {name}
                <input className="add" type="button" name={name} value="+" onClick={addCategory}/>
            </div>
            <div className="categories">
                {subCategories.map(i => <SubCategory subCategory={i} {...props}/>)}
            </div>
        </li>
    );
}

function SubCategory(props) {
    const {subCategory, name, addCategoryNote, removeCategory} = props;
    return (
        <ul>
            <div className="name">
                <input className="border-none note" type="text"
                       ref={subCategory.ref} placeholder="Укажите знанчение поля"
                       defaultValue={subCategory.value}/>
                <div className="flex">
                    <input className="add" type="button" name={name} value="+" data-id={subCategory.id}
                           onClick={addCategoryNote}/>
                    <input className="remove" type="button" name={name} data-id={subCategory.id} value="X"
                           onClick={removeCategory}/>
                </div>
            </div>
            {subCategory.items.map((i, index) => <Item index={index} item={i} {...props}/>)}
        </ul>
    );
}

function Item(props) {
    const {item, subCategory, removeCategoryNote, name} = props;
    return (
        <div className="content flex">
            <input className="border-none note" type="text"
                   ref={item.ref} placeholder="Укажите знанчение поля"
                   defaultValue={item.value}/>
            <button className="remove" name={name} data-id={item.id}
                    data-subCategoryId={subCategory.id} onClick={removeCategoryNote}>X
            </button>
        </div>
    );
}

function DateNote(props) {
    const {date} = props;
    const dateValue = date.value ? new Date(date.value).toISOString().slice(0, 10) : null;

    return (
        <li>
            <div className="name">Дата рождения</div>
            <div className="content">
                <input className="full border-none date"
                       type="date"
                       ref={date.ref}
                       dataformatas="dd.mm.yyyy"
                       name="dateOfBirth"
                       defaultValue={dateValue}/>
            </div>
        </li>
    );
}

function GenderNote(props) {
    const {gender} = props;
    return (
        <li>
            <div className="name">Пол</div>
            <div className="content">
                <select
                    name="gender"
                    className='gender full border-none'
                    ref={gender.ref}
                    defaultValue={gender.value}>
                    <option value={0}>Укажите пол</option>
                    <option value={2}>Жен</option>
                    <option value={1}>Муж</option>
                </select>
            </div>
        </li>
    );
}


function AddCategory(props) {
    const {addCategoryFetch, closeModal, contactId,} = props;

    const add = (e) => {
        e.preventDefault();
        const name = e.target.elements[0].value;
        addCategoryFetch(contactId, name);
        closeModal();
    };

    return (
        <form onSubmit={add}>
            <input className="" type="text" name="newCategoryName"/>
            <button className="" value="Отмена" onClick={closeModal}>Отмена</button>
            <button className="" type="submit" value="Создать">Создать</button>
        </form>
    );
}


const ul = (item) => {
    const notes = item.notes.map((i, index) => createNote(i.name, i.content, index));

    return (
        <ul className="contact">
            {notes}
            <div className="footer">
                <button className="btn full" onClick={this.onAddNote}>Добавить новое поле</button>
            </div>
        </ul>
    );
};