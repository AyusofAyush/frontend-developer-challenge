import React, { useState } from 'react';
import CaLendar from 'react-calendar';
import ControlledTabs from './Tabs';
import Translator from './translator';
import defaultMsg from './language/defaultMessages';

// this component handles the calender of the web page .
// changed the calendar component  - used react hooks useState

function Calendar(props) {

    const [param, setParam] = useState("");
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState(false);
    const [update, setUpdate] = useState(false);

    const handleChange = date => {
        const time = new Date(date).getTime() + 5.5 * (3600000); // for Indian std Time
        props.updatedData(time, props.item);
        setDate(date);
        setView(false);
        setUpdate(true);
    }

    const handleClick = () => {
        setView(prevState => !prevState);
        setUpdate(false);
        setParam(props.item['name']);
    }
    const activeView = view;
    const renderCal = () => {
        if (activeView) {
            return <CaLendar onChange={handleChange}
                value={date} />;
        }
        return null;
    }
    const someUpdate = update;
    const renderUpdate = () => {
        if (someUpdate) {
            return <div><ControlledTabs key={update} param={param}
                update={update}
                date={date} />
            </div>
        }
        return null;
    }
    return (
        <div>
            <img alt='calendar' className="ml-5" src={require('../Assets/calendar.png')}
                style={{ width: "2.5em", height: "2.5em", float: "left" }} />
            <button onClick={handleClick} variant="light" style={{
                background: "white", color: "#57698a",
                textDecoration: "none", border: "0.4em solid white", marginTop: "5px", fontSize: "0.9em"
            }}
            ><p className="ml-0 mx-0 my-0"> {Translator('scheduleAgain', defaultMsg.msg.err)}</p>
            </button>
            {renderCal()}
            <div style={{ display: "none" }}>
                {renderUpdate()}
            </div>
        </div>
    );
};

export default Calendar;