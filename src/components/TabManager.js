import React, { useState } from 'react';
import Tables from './Tables';

// Tab manager is actually managing the tab data which needs to be rendered 
// tab is refreshed once you click again.

function TabManager(props) {

    const [campaignJson, setJson] = useState(props.data);

    function updateData(d, item) {
        const campaignData = campaignJson.map(data => {
            if (data['name'] === item['name']) {
                return { ...data, createdOn: d }
            }
            return data;
        });
        setJson(campaignData);
    }

    let d = new Date(); // today date updated
    let milsec = d.getTime();
    let upData = campaignJson.map(item => {
        if ((parseInt(item['createdOn']) - milsec) > 86400000) {
            return item;
        } return null;
    }).filter(Boolean);

    let liveData = campaignJson.map(item => {
        if ((parseInt(item['createdOn']) - milsec) >= 0 && (parseInt(item['createdOn']) - milsec) <= 86400000) {
            return item;
        } return null;
    }).filter(Boolean);

    let pastData = campaignJson.map(item => {
        if (parseInt(item['createdOn']) < milsec) {
            return item;
        } return null;
    }).filter(Boolean);

    const whichData = props.activeState === 'upcoming' ? upData :
        props.activeState === 'live' ? liveData :
            props.activeState === 'past' ? pastData : null;

    return (
        <Tables data={whichData} updatedData={updateData} />
    );
}

export default TabManager;