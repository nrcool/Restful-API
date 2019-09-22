import React, { Component } from 'react'
import {connect} from "react-redux";


class Orders extends Component {
    state = {
        orders: []
    }
    getorders = () => {
        fetch("/orders")
            .then(res => res.json())
            .then(res2 => {
                console.log(res2)
                this.setState({
                    orders: res2
                })
            }
            )
    }
    render() {
        return (
            <div className="ordersspage">
                <h1>Orders</h1>
                <div className="getorders">
                    <button onClick={this.getorders}>Get Orders</button>
                    <details> <summary>all orders</summary>

                        {this.state.orders.length === 0 ? "" : (<>{this.state.orders.map(order => {
                            return (<div style={{ background: "lightgreen", padding: "5px", border: "2px dotted black" }}><p> <span style={{ background: "lightgray" }}> Id:</span> {order._id} </p>
                                <p><span style={{ background: "lightgray" }}>  Item Name:</span> {order.itemname} </p>
                                <p><span style={{ background: "lightgray" }}> Price:</span>  {order.price} </p>
                                <p> <span style={{ background: "lightgray" }}>  quantity:</span>{order.quantity} </p> </div>)
                        })}</>)}
                    </details>
                </div>
                {this.props.data.userLogin?<><div className="postorder">
                    <details> <summary>post order </summary>

                        <form action="/orders" method="POST">
                            <label htmlFor="itemname"><span> Item Name: </span>
                                <input type="text" name="itemname" />
                            </label><br />
                            <label htmlFor="price"><span>price:  </span>
                                <input type="text" name="price" /> </label><br />
                            <label htmlFor="quantity"><span>Qantity:  </span>
                                <input type="text" name="quantity" />
                            </label><br />
                            <button type="submit">Post order</button>
                        </form></details>
                </div>
                <div className="updateorder">
                    <details> <summary>update order </summary>

                        <form action="/orders/:orderID" method="PATCH">
                            <label htmlFor="id"><span> ID:</span>
                                <input type="text" name="id" />
                            </label><br />
                            <label htmlFor="itemname"><span>Item Name:  </span>
                                <input type="text" name="itemname" />
                            </label><br />
                            <label htmlFor="price"><span>Price:   </span>
                                <input type="text" name="price" /> </label><br />
                            <label htmlFor="quantity"><span>   Qantity:  </span>
                                <input type="text" name="quantity" />
                            </label><br />
                            <button type="submit">update order</button>
                        </form>
                    </details>
                </div>
                <div className="deleteorder">
                    <details> <summary>delete order </summary>

                        <form action="/orders/:orderID" method="DELETE">
                            <label htmlFor="id"><span>ID: </span>
                                <input type="text" name="id" />
                            </label><br />
                            <label htmlFor="itemname"><span> Item Name:  </span>
                                <input type="text" name="itemname" />
                            </label><br />
                            <label htmlFor="price"><span>Price: </span>
                                <input type="text" name="price" /> </label><br />
                            <label htmlFor="quantity"><span>Qantity: </span>
                                <input type="text" name="quantity" />
                            </label><br />
                            <button type="submit">Delete order</button>
                        </form>
                    </details>
                </div> </> : ""}
                
            </div>
        )
    }
}


const mapStateToProps=(state)=>{
    return {data:state}
}


export default connect(mapStateToProps)(Orders);