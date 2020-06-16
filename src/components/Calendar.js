import React from 'react';
import { Button } from 'react-bootstrap';
import CaLendar from 'react-calendar';
import ControlledTabs from './Tabs';

// this component handles the calender of the web page .

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            view: false,
            update: false,
            param: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange = date => {
        const time = new Date(date).getTime();
        this.props.updatedData(time, this.props.item);
        this.setState({ date: date });
        this.setState({ view: false });
        this.setState({ update: true });
    }
    handleClick = () => {
        this.setState(prevState => {
            return {
                view: !prevState.view
            }
        });
        this.setState({ update: false });
        this.setState({param: this.props.item['name']});
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
                return <div><ControlledTabs key={this.state.update} param={this.state.param} 
                update={this.state.update}
                date={this.state.date} />
                </div>
            }
            return null;
        }
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