import React, {Component} from 'react';
import axios from 'axios';
import { validateUserData } from './Valid'
import moment from "moment";

class AddUser extends Component {
    state = {
        email_address: null,
        full_names: null,
        phone_numbers: null,
        start_date: null,
        end_date: null,
        error: null,
        success: false
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

    handleSubmit = event =>{
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
        const error = validateUserData(newUser, days);
        if(error){
          this.setState({error: error})
        }else{
            axios.post('/newuser', newUser)
                .then((user) => {
                    this.props.addUser(this.state)
                    document.getElementById("create-course-form").reset();
                    this.setState({success: true})
                })
                .catch((err) => {
                    console.log(err.data);
                });
        }
    }

    render() {
        const {error, success, full_names} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3 text-center"></div>
                    <div className="col-6 border border-primary " style={{marginTop: '10%', padding: '10px', borderWidth: '3px', borderRadius: '5px', marginBottom: '50px'}}>
                        <form onSubmit={this.handleSubmit} id="create-course-form">
                            {
                                success ? <div className="alert alert-success text-center" role="alert">
                                    Successfull Added {full_names}.
                                </div> : null
                            }
                            <div className="row">
                                <div className="col">
                                    <label style={{ marginBottom: 0,  marginTop: '0.5rem'}}>Full Names : </label>
                                    <input type="text" name="full_names" className="form-control" onChange={this.handleChange} placeholder="Full Names" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  style={{ marginBottom: 0,  marginTop: '0.5rem'}}>Email Address: </label>
                                    <input type="email" name="email_address" className="form-control" onChange={this.handleChange} placeholder="Email Address"/>
                                </div>
                                <div className="col">
                                    <label  style={{ marginBottom: 0,  marginTop: '0.5rem'}}>Phone Number: </label>
                                    <input type="text" name="phone_numbers" className="form-control" onChange={this.handleChange} placeholder="Phone Number"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label  style={{ marginBottom: 0,  marginTop: '0.5rem'}}>Start Date: </label>
                                    <input type="date" name="start_date" className="form-control" onChange={this.handleChange} placeholder="Start Date"/>
                                </div>
                                <div className="col">
                                    <label  style={{ marginBottom: 0,  marginTop: '0.5rem'}}>End Date: </label>
                                    <input type="date" name="end_date" className="form-control" onChange={this.handleChange} placeholder="End Date"/>
                                </div>
                            </div>
                            <div className="form-group" style={{ marginBottom: 0,  marginTop: '0.5rem'}}>
                                <button className="btn btn-primary btn-md btn-block">Submit</button>
                            </div>
                            {
                                error ?
                                <div className="alert alert-danger text-center" role="alert" style={{ marginBottom: 0,  marginTop: '0.5rem'}}>
                                    {error}
                                </div> : null
                            }
                        </form>
                    </div>
                    <div className="col-3 text-center"></div>
                </div>
            </div>
        );
    }
}

export default AddUser;