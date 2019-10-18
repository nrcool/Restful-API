import React, { Component } from 'react';
import {connect} from "react-redux";

class Users extends Component {
    state={
        users:[],
        deleteuser:""
    }
    getusers=()=>{
        fetch("/users")
        .then(res => res.json())
        .then(res2 => {
            console.log(res2)
            this.setState({
                users: res2
            })
        }
        )
    }
    deleteuser=(e)=>{
        e.preventDefault();
        const formdata = new FormData(e.target)
        const searchurl = new URLSearchParams();
        for (const pair of formdata) {
            searchurl.append(pair[0], pair[1])
        }
        e.target.reset()
        fetch("/users", { method: "DELETE", body: searchurl })
            .then(res => res.json())
                .then(res2 => this.setState({
                    deleteuser: res2.deleteuser
                },()=>{
                    setTimeout(() => {
                       this.setState({
                          deleteuser:""
                       }) 
                    }, 2000);
                    
                }))
    }
    render() {
        return (<>
            {this.props.data.admin?<div className="userspage">
                <div className="users">
            <h1>USERS</h1>
                <div className="getUSERS">
                <button onClick={this.getusers}>Get Users</button>
                    <details><summary>all Users </summary>
                    {this.state.users.length === 0 ? "" : (<>{this.state.users.map(user => {
                            return (<div key={user._id} style={{ background: "lightgreen", padding: "5px", buser: "2px dotted black" }}><p> <span style={{ background: "lightgray" }}> Id:</span> {user._id} </p>
                                <p><span style={{ background: "lightgray" }}>  Username:</span> {user.username} </p> </div>)
                        })}</>)}
                     </details>
                </div>
            <div className="deleteorder">
                <p>delete order</p>
                <form method="DELETE" onSubmit={this.deleteuser}>
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