import React from 'react';
import Tables from './Tables';

// Tab manager is actually managing the tab data which needs to be rendered 
// tab is refreshed once you click again.

class TabManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campaignJson: props.data
        };
        this.updateData = this.updateData.bind(this)
    }
    updateData(d, item) {
        const campaignData = this.state.campaignJson.map(data => {
            if (data['name'] === item['name']) {
                return {...data, createdOn: d}
            }
            return data;
        });
        this.setState({campaignJson: campaignData});
    }
    render() {

        let d = new Date(); // today date updated
        let milsec = d.getTime();
        let upData = this.state.campaignJson.map(item => {
            if ((parseInt(item['createdOn']) - milsec) > 86400000) {
                return item;
            } return null;
        }).filter(Boolean);

        let liveData = this.state.campaignJson.map(item => {
            if ((parseInt(item['createdOn']) - milsec) >= 0 && (parseInt(item['createdOn']) - milsec) <= 86400000) {
                return item;
            } return null;
        }).filter(Boolean);

        let pastData = this.state.campaignJson.map(item => {
            if (parseInt(item['createdOn']) < milsec) {
                return item;
            } return null;
        }).filter(Boolean);

        const whichData = this.props.activeState === 'upcoming' ? upData :
        this.props.activeState === 'live' ? liveData :
        this.props.activeState === 'past' ? pastData : null;

        return (
            <Tables data={whichData} updatedData={this.updateData} />
        );
    };
}

export default TabManager;