import {routerReducer} from "react-router-redux";
import {combineReducers} from "redux";
import {loginReducer} from "./login/reducers";
import {registerReducer} from "./register/reducers";
import {contactsReducer} from "./contacts/reducers";
import {contactReducer} from "./contact/reducers"
import {groupsReducer} from "./groups/reducers";
import {defReducer} from "./reducers";


export default combineReducers({
        routing: routerReducer,
        login: loginReducer,
        register: registerReducer,
        contacts: contactsReducer,
        contact: contactReducer,
        groups: groupsReducer,
        def: defReducer
    }
)