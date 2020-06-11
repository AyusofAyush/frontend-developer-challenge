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

        };
        this.handleClick = this.handleClick.bind(this);
    }

    // click handler which handles everytime clicked on the tabs
    handleClick(event) {
        this.setState({ active: event.target.title });
        let d = new Date('December 4, 2019'); // static date
        let milsec = d.getTime();
        if (event.target.title === 'upcoming') {
            const updatedData = this.state.original.map(item => {
                if (parseInt(item['createdOn']) > milsec) {
                    return item;
                }
            }).filter(Boolean);

            this.setState({ Updata: updatedData });
        } else if (event.target.title === 'live') {
            const updatedData = this.state.original.map(item => {
                if (Math.abs(parseInt(item['createdOn']) - milsec) <= 2 * 86400000) {
                    return item;
                }
            }).filter(Boolean);

            this.setState({ Livedata: updatedData });

        } else {
            const updatedData = this.state.original.map(item => {
                if (parseInt(item['createdOn']) < milsec) {
                    return item;
                }
            }).filter(Boolean);

            this.setState({ Pastdata: updatedData });
        }
    }

    style1 = {
        color: "#82a523",
        borderBottom: "4px solid #82a523",
        fontWeight: "bold"
    };


    render() {
        console.log(this.props.param, this.props.update, this.props.date);
        let d = new Date(this.props.date).getTime();
        console.log(d);

        const whichData = this.state.active === 'upcoming' ? this.state.Updata :
            this.state.active === 'live' ? this.state.Livedata :
                this.state.Pastdata;

        let updated;
        if (whichData !== null) {
            updated = whichData.map(item => {
                if (item['name'] === this.props.param)
                    item['createdOn'] = d;
                return item;
            }).filter(Boolean);
        }

        const upcom = this.props.lang === 'en'?'Upcoming Campaigns':
        'Kommende Kampagnen';
        const livecom = this.props.lang === 'en'?'Live Compaigns':
        'Live-Kampagnen';
        const pastcom = this.props.lang === 'en'?'Past Compaigns':
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
                <Table data={whichData !== null ? updated : null} lang={this.props.lang}/>
            </div>
        );
    }
}


export default ControlledTabs;