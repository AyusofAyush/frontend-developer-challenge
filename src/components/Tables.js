import React from 'react';
import { Table, ButtonGroup, Button } from 'react-bootstrap';
import Price from './PriceModel';
import Calendar from './Calendar';

// Component responsible for table of the webpage

class table extends React.Component {

    // to get date in defined format
    prettyDate(date) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return months[date.getUTCMonth()] + ' ' + date.getUTCFullYear() + ', ' + date.getUTCDate();
    }

    // days from milliseconds
    DaysLeft(x) {
        return (Math.floor(Math.abs(x) / (60 * 60 * 24 * 1000))).toString();
    }

    render() {
        console.log('tables ', this.props.lang);
        let d = new Date('December 4, 2019');
        let milsec = d.getTime();
        this.prettyDate = this.prettyDate.bind(this);
        this.DaysLeft = this.DaysLeft.bind(this);
        if (this.props.data === null) {
            return (
                <h3 className="text-center">Select a Compaign.</h3>
            )
        }

        const day = this.props.lang === 'en' ? ' Days ' : ' Tage ';
        const DATE = this.props.lang === 'en'?'DATE':'DATUM';
        const COMPAIGN = this.props.lang === 'en'?'COMPAIGN':'KAMPAGNE';
        const VIEW = this.props.lang === 'en'?'VIEW':'AUSSICHT';
        const ACTIONS = this.props.lang === 'en'?'ACTIONS':'AKTIONEN';
        return (
            < div >
                <Table responsive hover style={{ color: "#57698a", backgroundColor: "white", border: "1px solid lightgrey", tableLayout: "auto" }}>
                    <thead >
                        <tr style={{ backgroundColor: "#f1f1f4" }}>
                            <th>{DATE}</th>
                            <th>{COMPAIGN}</th>
                            <th>{VIEW}</th>
                            <th>{ACTIONS}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((item, idx) => (
                            <tr key={idx}>
                                <td>{this.prettyDate(new Date(parseInt(item['createdOn'])))}
                                    <br />
                                    <sub><i>{this.DaysLeft(parseInt(item['createdOn']) - milsec)}{day}{this.props.lang === 'en' ? (item['createdOn'] - milsec >= 0 ? 'Ahead' : 'Ago') : (item['createdOn'] - milsec >= 0 ? 'Voraus' : 'Vor')}</i></sub>
                                </td>
                                <td style={{ width: "28%" }}>
                                    <img alt='game_url' className="mr-3" src={require('../Assets/' + item['image_url'])}
                                        style={{ width: "3em", height: "3em", float: "left" }} />
                                    <div><p className="my-0"><b> {item['name']} </b></p>
                                        <sub> {item['region']} </sub> </div>
                                </td>
                                <td>
                                    <Price item={{
                                        name: item['name'], region: item['region'], price: item['price'],
                                        image: item['image_url']
                                    }} />
                                </td>
                                <td> <ButtonGroup>
                                    <img alt='csv' className="mr-3" src={require('../Assets/file.png')}
                                        style={{ width: "2.2em", height: "2.2em", float: "left" }} />
                                    <p className="ml-1 mx-0 my-0"> CSV</p>
                                    <img alt='report' className="ml-5" src={require('../Assets/statistics-report.png')}
                                        style={{ width: "2.2em", height: "2.2em", float: "left" }} />
                                    <p className="ml-2 mx-0 my-0"> Report</p>
                                    <Calendar item={{ name: item['name'], time: item['createdOn'] }} />
                                </ButtonGroup>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div >
        );
    }
}

export default table;

