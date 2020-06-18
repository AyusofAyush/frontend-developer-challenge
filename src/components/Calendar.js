import React from 'react';
import CaLendar from 'react-calendar';
import ControlledTabs from './Tabs';
import Translator from './translator';
import defaultMsg from './language/defaultMessages';

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
        const time = new Date(date).getTime() + 5.5 * (3600000); // for Indian std Time
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
                <button onClick={this.handleClick} variant="light" style={{ background: "white", color: "#57698a", 
                textDecoration: "none", border: "0.4em solid white", marginTop: "5px", fontSize: "0.9em"}}
        ><p className="ml-0 mx-0 my-0"> {Translator('scheduleAgain',defaultMsg.msg.err)}</p>
                </button>
                {renderCal()}
                <div style={{ display: "none" }}>
                    {renderUpdate()}
                </div>
            </div>
        );
    };

};

export default Calendar;