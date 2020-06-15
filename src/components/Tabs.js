import React from 'react';
import data from './DataFile';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './Tables';

// tabs components - 3 (upcoming, live, past) compaigns

class ControlledTabs extends React.Component {

    constructor() {
        super()
        this.state = {
            original: data.body,
            Updata: null,
            Livedata: null,
            Pastdata: null,
            active: "",
            today: new Date().getTime(),

        };
        this.handleClick = this.handleClick.bind(this);
        this.updateTabs = this.updateTabs.bind(this);
        this.updateMe = this.updateMe.bind(this);
        this.whichData = this.whichData.bind(this);
    }

    // click handler which handles everytime clicked on the tabs

    updateTabs() {
        let d = new Date(); // static date
        let milsec = d.getTime();
        let upData = this.state.original.map(item => {
            if ((parseInt(item['createdOn']) - milsec) > 86400000) {
                return item;
            }
        }).filter(Boolean);

        this.setState({ Updata: upData });

        let liveData = this.state.original.map(item => {
            if ((parseInt(item['createdOn']) - milsec) >= 0 && (parseInt(item['createdOn']) - milsec) <= 86400000) {
                return item;
            }
        }).filter(Boolean);

        this.setState({ Livedata: liveData });

        let pastData = this.state.original.map(item => {
            if (parseInt(item['createdOn']) < milsec) {
                return item;
            }
        }).filter(Boolean);

        this.setState({ Pastdata: pastData });
    }


    handleClick(event) {
        this.setState({ active: event.target.title });
        this.updateTabs();
    }

    whichData = () => {
        return this.state.active === 'upcoming' ? this.state.Updata :
        this.state.active === 'live' ? this.state.Livedata :
            this.state.active === 'past'? this.state.Pastdata: null;
    }

    updateMe = () => {
        let d = new Date(this.props.date).getTime() + 5.5*(3600000); // for Indian time Zone
        if (this.state.today !== this.props.date) {
            this.setState({ today: this.props.date });
            let updated = this.state.original.map(item => {
                if (item['name'] === this.props.param)
                    item['createdOn'] = d;
                return item;
            }).filter(Boolean);
            this.setState({ original: updated });
            this.updateTabs();
            this.whichData();
        }
        return null;
    };

    style1 = {
        color: "#82a523",
        borderBottom: "4px solid #82a523",
        fontWeight: "bold"
    };


    render() {
        // console.log(this.props.param,this.props.update,this.props.date);
        let d = new Date(this.props.date).getTime() + 5.5*(3600000); // for Indian time Zone
        // console.log(d);

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
                {this.updateMe()}
                <Table data={this.whichData()} lang={this.props.lang} />
            </div>
        );
    }
}


export default ControlledTabs;