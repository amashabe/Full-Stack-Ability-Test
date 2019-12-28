import React, { Component } from 'react';
import axios from 'axios'

import Users from './Users';
import AddUser from './AddUser'

class App extends Component {
  state = {
    users: []
  }

  componentWillMount() {
    //sending a get request to the API to get all the users
    axios.get('/getusers')
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  addUser = (newUser) => {
    newUser.userId = Math.random();
    let users = [...this.state.users, newUser]
    this.setState({
      users
    })
  }

  render() {
    const {users} = this.state;
 
    return (
      <div className="App">
        <AddUser addUser={this.addUser}/>
        <Users users={users} subStringDate={this.subStringDate} />
      </div>
    );
  }

}

export default App;