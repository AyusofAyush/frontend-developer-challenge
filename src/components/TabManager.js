import React from 'react';
import Tables from './Tables';

// Tab manager is actually managing the tab data which needs to be rendered 
// tab is refreshed once you click again.

class TabManager extends React.Component {
    render() {

        let d = new Date(); // static date
        let milsec = d.getTime();
        let upData = this.props.data.map(item => {
            if ((parseInt(item['createdOn']) - milsec) > 86400000) {
                return item;
            } return null;
        }).filter(Boolean);

        let liveData = this.props.data.map(item => {
            if ((parseInt(item['createdOn']) - milsec) >= 0 && (parseInt(item['createdOn']) - milsec) <= 86400000) {
                return item;
            } return null;
        }).filter(Boolean);

        let pastData = this.props.data.map(item => {
            if (parseInt(item['createdOn']) < milsec) {
                return item;
            } return null;
        }).filter(Boolean);

        const whichData = this.props.activeState === 'upcoming' ? upData :
        this.props.activeState === 'live' ? liveData :
        this.props.activeState === 'past' ? pastData : null;

        return (
            <Tables data={whichData} lang={this.props.lang} />
        );
    };
}

export default TabManager;