import React from 'react';
import { Button } from 'react-bootstrap';
import CaLendar from 'react-calendar';
import ControlledTabs from './Tabs';

// this component handles the calender of the web page .
/*
    Upart from the component 
    there is a improvement to make 
    it does not handles the schedule date properly due to an
    Error: maximum render stack exceeded 
    I tried but unable to handle that problem
    The problem still exists, you can check the state is easily 
    manipulated but setstate resets what props we were getting from the Calendar component.
*/

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            view: false,
            update: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange = date => {
        this.setState({ date: date });
        this.setState({ view: false });
        this.setState({ update: true });
    }
    handleClick = () => {
        this.setState({ view: true });
        this.setState({ update: false });
    }
    render() {
        const activeView = this.state.view;
        const renderCal = () => {
            if (activeView) {
                return <CaLendar onChange={this.handleChange}
                    value={this.state.date} />;
            }
            return null;
        }
        const someUpdate = this.state.update;
        const renderUpdate = () => {
            if (someUpdate) {
                return <ControlledTabs param={this.props.item['name']} 
                update={this.state.update}
                date={this.state.date} />
            }
            return null;
        }
        // console.log(this.props.item['time']);
        return (
            <div>
                <img alt='calendar' className="ml-5" src={require('../Assets/calendar.png')}
                    style={{ width: "2.5em", height: "2.5em", float: "left" }} />
                <Button onClick={this.handleClick} variant="light" style={{ color: "#57698a", textDecoration: "none" }}
                ><p className="ml-0 mx-0 my-0"> Schedule Again</p>
                </Button>
                {renderCal()}
                <div style={{ display: "none" }}>
                    {renderUpdate()}
                </div>
            </div>
        );
    };

};

export default Calendar;