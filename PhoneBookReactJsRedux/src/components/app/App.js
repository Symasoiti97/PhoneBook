import React, {Component, Fragment} from "react";
import Public from "./Public";
import Private from "./Private";
import ModalWindow from "../ModalWindow";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const loadedComponent = () => (<p>loading..</p>);

        return (
            <Fragment>
                {!this.props.isLoaded ? <ModalWindow child={loadedComponent}/> : null}                {/*<Switch>*/}
                    <Public/>
                    <Private isAuth={this.props.isAuth}/>
            </Fragment>
        );
    }
}

export default App;