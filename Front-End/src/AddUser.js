import React, {Component} from 'react';
import axios from 'axios';
import './App.css'
import { validateUserData } from './Valid'
import moment from "moment";
import {Spinner} from "react-bootstrap";

class AddUser extends Component {
    state = {
        email_address: null,
        full_names: null,
        phone_numbers: null,
        start_date: null,
        end_date: null,
        error: null,
        success: false,
        loading: false
    }

    daysLeft = (start_date, end_date) => {
        const start = moment(start_date)
        const end = moment(end_date)
        const days = end.diff(start, 'days');
        return days;
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            error: null,
            success: false})
    }

    handleSubmit = event => {
        this.setState({loading: true})
        event.preventDefault();
        const {email_address, full_names, phone_numbers, start_date, end_date} = this.state;
        const days = this.daysLeft(start_date, end_date);
        const newUser = {
            email_address: email_address,
            full_names: full_names,
            phone_numbers: phone_numbers,
            start_date: start_date,
            end_date: end_date
        }
        console.log(newUser)
        const error = validateUserData(newUser, days);
        if(error){
          this.setState({error: error, loading: false})
        }else{
            this.setState({loading: true})
            axios.post('/newuser', newUser)
                .then((user) => {
                    this.props.addUser(this.state)
                    document.getElementById("create-course-form").reset();
                    this.setState({ email_address: null,
                        full_names: null,
                        phone_numbers: null,
                        start_date: null,
                        end_date: null,
                        error: null,
                        success: true,
                        loading: false})

                })
                .catch((err) => {
                    console.log(err.data);
                });
        }
    }

    render() {
        const {error, success, loading} = this.state;
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1>Create A User</h1>
                    <form onSubmit={this.handleSubmit} noValidate id="create-course-form">
                        <div className="input-style">
                            <label>Full Names</label>
                            <input
                                type="text"
                                name="full_names"
                                onChange={this.handleChange}
                                placeholder="Full Names"
                            />
                        </div>
                        <div className="input-style">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email_address"
                                onChange={this.handleChange}
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="input-style">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phone_numbers"
                                onChange={this.handleChange}
                                placeholder="Phone Number"/>
                        </div>
                        <div className="input-style">
                            <label>Email</label>
                            <input
                                type="date"
                                name="start_date"
                                onChange={this.handleChange}
                                placeholder="Start Date"/>
                        </div> <div className="input-style">
                        <label>Email</label>
                        <input
                            type="date"
                            name="end_date"
                            onChange={this.handleChange}
                            placeholder="End Date"/>
                    </div>

                        <div className="createAccount">
                            { loading ? (
                                <button disabled><Spinner animation="grow" variant="light" /></button>
                            ) : (<button>Create A User</button>)}
                           { error ? (<h5 className="errorMessage text-capitalize">{error}</h5>)
                           : (null)}
                            { success ? (<h5 className="successMessage text-capitalize">Successfully added new user</h5>)
                                : (null)}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddUser;