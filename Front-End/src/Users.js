import React from 'react';
import moment from "moment";
import {Spinner, Toast} from 'react-bootstrap';

const  subStringDate = (date) => {
    const month = date.substring(5, 7);
    const year = date.substring(0, 4);
    const day = date.substring(8, 10)
    switch (month) {
        case "01":
            return day + " January " + year;
        case "02":
            return day + " February " + year;
        case "03":
            return day + " March " + year;
        case "04":
            return day + " April " + year;
        case "05":
            return day + " May " + year;
        case "06":
            return day + " June " + year;
        case "07":
            return day + " July " + year;
        case "08":
            return day + " August " + year;
        case "09":
            return day + " September " + year;
        case "10":
            return day + " October " + year;
        case "11":
            return day + " November " + year;
        default:
            return day + " December " + year;
    }
}

const daysLeft = (start_date, end_date) => {
    const start = moment(start_date)
    const end = moment(end_date)
    const days = end.diff(start, 'days');
    return days;
}

const Users = (users) => {
    const usersList = users.users.length ? (
        users.users.map(user => {
            console.log()
            return (
                <div key={user.userId}>
                    <div className="row">
                        <div className="col-3"></div>
                        <div  className="col-6 text-center" style={{marginTop: 25}}>
                            <Toast style={{width: '375px'}}>
                                <Toast.Header>
                                    <strong className="mr-auto">{user.full_names}</strong>
                                    <span style={{fontSize: 10}}> {user.email_address}</span>
                                    {/*<small>11 mins ago</small>*/}
                                </Toast.Header>
                                <Toast.Body>{daysLeft(user.start_date, user.end_date)}{" days "} {"("} {subStringDate(user.start_date)} {" to "} {subStringDate(user.end_date)} {")"}</Toast.Body>
                            </Toast>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
            )
        })
    ) : (
        <div className="container wrapper-2" >
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 text-center">
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="success" />
                    <Spinner animation="grow" variant="danger" />
                    <Spinner animation="grow" variant="warning" />
                    <Spinner animation="grow" variant="info" />
                    <Spinner animation="grow" variant="dark" />
                </div>
                <div className="col-3"></div>
            </div>
        </div>
        )
    return (
        <div>
            {usersList}
        </div>
    )
}



export default Users;