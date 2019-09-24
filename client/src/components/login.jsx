import React, { Component } from 'react'
import {connect} from "react-redux";

class Login extends Component {
  
    alreadysignup=()=>{
        this.props.userExist(true)
        
    }
    userlogin=(e)=>{
       e.preventDefault();
       const formdata= new FormData(e.target)
       const searchurl=new URLSearchParams();
       for(const pair of formdata){
           searchurl.append(pair[0],pair[1])
       }
       e.target.reset()
       console.log(searchurl)
        fetch("/users/userlogin",{method:"POST",body:searchurl})
        .then(res=>res.json())
        .then(res2=>{
            this.props.userLogin(res2.userlogin)
            this.props.unorpw(res2.unorpw)
            this.props.token(res2.token)
            this.props.admin(res2.admin)
        }
        )  
    }

    logout=()=>{
        console.log("logout")
        this.props.userLogin(false)
   
    }
    render() {
        console.log(this.props.data)
        const signupPage=(<><h1>Sign up </h1>
            <form className="loginform" 
            action="/users" 
            method="POST" 
            onSubmit={this.signupuser}
            >
        
            <label htmlFor="username">
                 <span>username: </span>
                  <input type="text" name="username"/>
                </label><br/>
                <label htmlFor="password"><span>Password:  </span>
                    <input type="password" name="password"/>
                </label><br/>
                <label htmlFor="email"><span>Email: </span>
                     <input type="email" name="email"/>
                </label><br/>
                <input type="submit" value="Sign up"/>

              
                <p onClick={this.alreadysignup}>Already Signup?</p>
            </form></>)
        const loginPage=(<><h1>Login Page</h1>
                          <form onSubmit={this.userlogin}>
                              <label htmlFor="username"><span>Username: </span>
                                   <input type="text" name="username"/>
                              </label><br/>
                              <label htmlFor="password"><span> Password: </span>
                                  <input type="password" name="password"/>
                              </label><br/>
                              <span style={{color:"red"}}>{this.props.data.unorpw}</span><br/>
                              <button type="submit">Login</button>

                              </form>  </>)
        return (
            <div className="loginpage">
                {this.props.data.userLogin?<div><button onClick={this.logout}>logout</button></div>:<>{this.props.data.userExisted?loginPage:signupPage}</>}
               
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {data:state}
}
const mapStateToDispatch=(dispatch)=>{
    return{
        userExist:(value)=>dispatch({type:"userExist",payload:value}),
        userLogin:(value)=>dispatch({type:"userLogin",payload:value}),
        unorpw:(value)=>dispatch({type:"unorpw",payload:value}),
        token:(value)=>dispatch({type:"token",payload:value}),
        admin:(value)=>dispatch({type:"admin",payload:value})
        
    }
}

export default connect(mapStateToProps,mapStateToDispatch)(Login);