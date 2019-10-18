import React, { Component } from 'react'
import { connect } from "react-redux";


class Orders extends Component {
    state = {
        orders: [],
        postorder: "",
        updateorder:"",
        deleteorder:""
    }   
  

    getorders = () => {
        fetch("https://my-restful-api5.herokuapp.com/orders/userorders",{method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: this.props.data.username
        })})
            .then(res => res.json())
            .then(res2 => {
               /*  console.log(res2) */
                this.setState({
                    orders: res2
                })
            }
            )
    }
    orderPost = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target)
        const searchurl = new URLSearchParams();
        for (const pair of formdata) {
            searchurl.append(pair[0], pair[1])
        }
        searchurl.append("username",this.props.data.username)
        e.target.reset()
        console.log(searchurl)
        fetch("https://my-restful-api5.herokuapp.com/orders", { method: "POST", body: searchurl })
            .then(res => res.json())
                .then(res2 => this.setState({
                    postorder:res2.postorder
                  },()=>{
                    setTimeout(() => {
                       this.setState({
                          postorder:""
                       }) 
                    }, 2000);
                    
                }))
    }
    orderUpdate = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target)
        const searchurl = new URLSearchParams();
        for (const pair of formdata) {
            searchurl.append(pair[0], pair[1])
        }
        e.target.reset()
        console.log(searchurl)
        fetch("https://my-restful-api5.herokuapp.com/orders", { method: "PATCH", body: searchurl })
            .then(res => res.json())
                .then(res2 => this.setState({
                    updateorder: res2.updateorder
                },()=>{
                    setTimeout(() => {
                       this.setState({
                          updateorder:""
                       }) 
                    }, 2000);
                    
                }))

    }
    orderDelete = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target)
        const searchurl = new URLSearchParams();
        for (const pair of formdata) {
            searchurl.append(pair[0], pair[1])
        }
        e.target.reset()
        console.log(searchurl)
        fetch("https://my-restful-api5.herokuapp.com/orders", { method: "DELETE", body: searchurl })
            .then(res => res.json())
                .then(res2 => this.setState({
                    deleteorder: res2.deleteorder
                },()=>{
                    setTimeout(() => {
                       this.setState({
                          deleteorder:""
                       }) 
                    }, 2000);
                    
                }))

    }
    render() {
        console.log(this.props.data)
        return (
            <div className="ordersspage">
                <h1>Orders</h1>
                <div className="getorders">
                    <button onClick={this.getorders}>Get Orders</button>
                    <details> <summary>all orders</summary>

                        {this.state.orders.length === 0 ? "" : (<>{this.state.orders.map(order => {
                            return (<div key={order._id} style={{ background: "lightgreen", padding: "5px", border: "2px dotted black" }}><p> <span style={{ background: "lightgray" }}> Id:</span> {order._id} </p>
                                <p><span style={{ background: "lightgray" }}>  Item Name:</span> {order.itemname} </p>
                                <p><span style={{ background: "lightgray" }}> Price:</span>  {order.price} </p>
                                <p> <span style={{ background: "lightgray" }}>  quantity:</span>{order.quantity} </p> </div>)
                        })}</>)}
                    </details>
                </div>
                {this.props.data.userLogin ? <><div className="postorder">
                    <details> <summary>post order </summary>

                        <form method="POST" onSubmit={this.orderPost}>
                            <label htmlFor="itemname"><span> Item Name: </span>
                                <input type="text" name="itemname" />
                            </label><br />
                            <label htmlFor="quantity"><span>Qantity:  </span>
                                <input type="text" name="quantity" />
                            </label><br />
                            <span className="msjfromserver">{this.state.postorder}</span><br/>
                            <button type="submit">Post order</button>
                        </form></details>
                </div>
                    <div className="updateorder">
                        <details> <summary>update order </summary>

                            <form method="PATCH" onSubmit={this.orderUpdate}>
                                <label htmlFor="id"><span> ID:</span>
                                    <input type="text" name="id" />
                                </label><br />
                                <label htmlFor="itemname"><span>Item Name:  </span>
                                    <input type="text" name="itemname" />
                                </label><br />
                                <label htmlFor="quantity"><span>   Qantity:  </span>
                                    <input type="text" name="quantity" />
                                </label><br />
                                <span className="msjfromserver">{this.state.updateorder}</span><br/>
                                <button type="submit">update order</button>
                            </form>
                        </details>
                    </div>
                    <div className="deleteorder">
                        <details> <summary>delete order </summary>

                            <form method="DELETE" onSubmit={this.orderDelete} >
                                <label htmlFor="id"><span>Product Name: </span>
                                    <input type="text" name="itemname" />
                                </label><br />
                                <span className="msjfromserver">{this.state.deleteorder}</span><br/>
                                <button type="submit">Delete order</button>
                            </form>
                        </details>
                    </div> </> : ""}

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return { data: state }
}


export default connect(mapStateToProps)(Orders);