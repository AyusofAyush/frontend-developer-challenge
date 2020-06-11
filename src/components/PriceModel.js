import React from 'react';
import { Button } from 'react-bootstrap';
import MyVerticallyCenteredModal from './verticalModal';

// this component handles the price modal whenever click.

function Price(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <div>
            <img className="mr-1" src={require('../Assets/Price.png')}
                style={{ width: "1.8em", height: "1.8em", float: "left" }} alt='price' />
            <Button variant="light" style={{ color: "#57698a", textDecoration: "none" }}
                onClick={() => setModalShow(true)}>
                View Pricing
            </Button>
            <MyVerticallyCenteredModal show={modalShow}
                onHide={() => setModalShow(false)} item={props.item}/>
        </div>
    );
}

export default Price;