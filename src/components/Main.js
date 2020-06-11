import React from 'react';
import ControlledTabs from './Tabs';
import {DropdownButton, Dropdown} from 'react-bootstrap';

// This this is the main component of body after header


class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            lang: "en",
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (event) => this.setState({lang:event.target.title});

    render() {
        console.log(this.state.lang);
        return (
            <div>
                <div className="container mr-auto pl-5">
                    <h1
                        style={{ color: "#2b416c" }}><b>Manage Compaigns</b></h1>
                    <DropdownButton id="dropdown-item-button" variant="success" title="Language">
                        <Dropdown.Item onClick={this.handleClick} as="button" title="en" >ENG</Dropdown.Item>
                        <Dropdown.Item onClick={this.handleClick} as="button" title="gr" >GER</Dropdown.Item>
                    </DropdownButton>
                </div>
                <br />
                <div className="container mr-auto pl-5">
                    <ControlledTabs lang={this.state.lang}/>
                </div>
            </div>
        );
    }
}


export default Main;