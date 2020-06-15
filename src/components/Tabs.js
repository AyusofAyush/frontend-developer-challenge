import React from 'react';
import data from './DataFile';
import 'bootstrap/dist/css/bootstrap.min.css';
import TabManager from './TabManager';

// tabs components - 3 (upcoming, live, past) compaigns

class ControlledTabs extends React.Component {

    constructor() {
        super()
        this.state = {
            active: "",
            today: new Date().getTime(),

        };
        this.handleClick = this.handleClick.bind(this);
    }

    // click handler which handles everytime clicked on the tabs



    handleClick(event) {
        this.setState({ active: event.target.title });
    }


    style1 = {
        color: "#82a523",
        borderBottom: "4px solid #82a523",
        fontWeight: "bold"
    };


    render() {
        // console.log(this.props.param, this.props.update, this.props.date);
        // let d = new Date(this.props.date).getTime() + 5.5 * (3600000); // for Indian time Zone
        // console.log(d);


        const dt = new Date(this.props.date).getTime() + 5.5 * (3600000); // for Indian time Zone
        const updated = data.body.map(item => {
                if (item['name'] === this.props.param)
                    item['createdOn'] = dt;
                return item;
            }).filter(Boolean);

        const upcom = this.props.lang === 'en' ? 'Upcoming Campaigns' :
            'Kommende Kampagnen';
        const livecom = this.props.lang === 'en' ? 'Live Compaigns' :
            'Live-Kampagnen';
        const pastcom = this.props.lang === 'en' ? 'Past Compaigns' :
            'Vergangene Kampagnen';


        // console.log(updated);

        return (
            <div>
                <style type="text/css">
                    {`
                        button:focus {
                            outline: none;
                        }
                        .myTabs {
                            color: #5e6e8f;
                            border: none;
                            background: none;
                        }
                    `}
                </style>
                <button title="upcoming" onClick={this.handleClick}
                    style={this.state.active === 'upcoming' ? this.style1 : null}
                    className="myTabs pl-1 pr-2 py-2" >
                    {upcom}  </button>
                <button onClick={this.handleClick}
                    title='live'
                    style={this.state.active === 'live' ? this.style1 : null}
                    className="myTabs pl-3 pr-2 py-2">
                    {livecom} </button>
                <button onClick={this.handleClick}
                    title='past'
                    style={this.state.active === 'past' ? this.style1 : null}
                    className="myTabs pl-3 pr-2 py-2">
                    {pastcom}</button>
                <br />
                <br />
                {/* <Table data={whichData} lang={this.props.lang} /> */}
                <TabManager lang={this.props.lang} 
                data={updated}
                activeState={this.state.active}
                
                />
            </div>
        );
    }
}


export default ControlledTabs;