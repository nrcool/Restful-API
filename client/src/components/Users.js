import React, { Component } from 'react';
import {connect} from "react-redux";

class Users extends Component {
    render() {
        return (<>
            {this.props.data.admin?<div className="userspage">
                <div className="users">
            <h1>USERS</h1>
                <div className="getUSERS">
                <button>Get USERS</button>
                <p>all USERS</p>
                </div>
            <div className="deleteorder">
                <p>delete order</p>
                <form action="/users" method="DELETE">
                    <label htmlFor="username"> 
                    <span>   Username: </span>
                      <input type="text" name="username"/>
                    </label><br/>
                    <button type="submit">Delete user</button>
                </form>
            </div>
            </div>
        </div> :""}</>
            
        )
    }
}
const mapStateToProps=(state)=>{
    return {data:state}
}


export default connect(mapStateToProps)(Users);