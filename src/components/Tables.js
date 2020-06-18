import React from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import Price from './PriceModel';
import Calendar from './Calendar';
import Translator from './translator';
import defaultMsg from './language/defaultMessages';

// Component responsible for table of the webpage

class tables extends React.Component {

    // to get date in defined format
    getMonth(date) {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[date.getUTCMonth()];
    }
    prettyDate(date) {
        
        return ' ' + date.getUTCFullYear() + ', ' + date.getUTCDate();
    }

    // days from milliseconds
    DaysLeft(x) {
        return (Math.floor(Math.abs(x) / (60 * 60 * 24 * 1000))).toString();
    }

    render() {
        let d = new Date();
        let milsec = d.getTime();
        this.prettyDate = this.prettyDate.bind(this);
        this.DaysLeft = this.DaysLeft.bind(this);
        if (this.props.data === null) {
            return (
                <h3 className="text-center">Select a Compaign.</h3>
            )
        }

        return (
            < div >
                <Table responsive hover style={{ color: "#57698a", backgroundColor: "white", border: "1px solid lightgrey", tableLayout: "auto" }}>
                    <thead >
                        <tr style={{ backgroundColor: "#f1f1f4" }}>
                            <th>{Translator('date',defaultMsg.msg.err)}</th>
                            <th>{Translator('campaign',defaultMsg.msg.err)}</th>
                            <th>{Translator('view',defaultMsg.msg.err)}</th>
                            <th>{Translator('actions',defaultMsg.msg.err)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((item, idx) => (
                            <tr key={idx}>
                                <td style={{fontSize: "0.95em"}} >{Translator(this.getMonth(new Date(parseInt(item['createdOn']))),defaultMsg.msg.err)}
                                {this.prettyDate(new Date(parseInt(item['createdOn'])))}
                                    <br />
                                    <sub><i>{this.DaysLeft(parseInt(item['createdOn']) - milsec)} {Translator('days',defaultMsg.msg.err)}
                                     {(item['createdOn'] - milsec >= 0 ? Translator('ahead',defaultMsg.msg.err) : Translator('ago',defaultMsg.msg.err)) }</i></sub>
                                </td>
                                <td style={{ width: "24%" }}>
                                    <img alt='game_url' className="mr-3" src={require('../Assets/' + item['image_url'])}
                                        style={{ width: "3em", height: "3em", float: "left" }} />
                                    <div><p className="my-0"><b> {item['name']} </b></p>
                                        <sub> {item['region']} </sub> </div>
                                </td>
                                <td style={{ width: "19%" }} >
                                    <Price item={{
                                        name: item['name'], region: item['region'], price: item['price'],
                                        image: item['image_url']
                                    }} />
                                </td>
                                <td style={{ width: "46%" }} > <ButtonGroup>
                                    <img alt='csv' className="mr-3" src={require('../Assets/file.png')}
                                        style={{ width: "2.2em", height: "2.2em", float: "left" }} />
                                    <p className="ml-1 mx-0 my-0"> CSV</p>
                                    <img alt='report' className="ml-5" src={require('../Assets/statistics-report.png')}
                                        style={{ width: "2.2em", height: "2.2em", float: "left" }} />
                                    <p className="ml-2 mx-0 my-0">{Translator('report',defaultMsg.msg.err)}</p>
                                    <Calendar item={{ name: item['name'], time: item['createdOn'] }} updatedData={this.props.updatedData} />
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

export default tables;

