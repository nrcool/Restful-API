import React, { Component } from 'react'
import { connect } from "react-redux";

class Products extends Component {
    render() {
        return (
            <div className="productspage">
                <h1>Products</h1>
                <div className="getproducts">
                    <button>Get products</button>
                    <details><summary>all products </summary> </details>

                </div>
                {this.props.data.userLogin ?<> <div className="postproduct">
                    <details><summary>post order </summary>

                        <form action="/products" method="POST">
                            <label htmlFor="productname"><span>product Name:  </span>
                                <input type="text" name="product" />
                            </label><br />
                            <label htmlFor="price"><span> price:  </span>
                                <input type="text" name="price" /> </label><br />
                            <label htmlFor="quantity"><span>Qantity:  </span>
                                <input type="text" name="quantity" />
                            </label><br />
                            <button type="submit">Post order</button>
                        </form></details>
                </div>
                    <div className="updateproduct">
                        <details><summary> update order</summary>

                            <form action="/products/:productID" method="PATCH">
                                <label htmlFor="id"><span> ID: </span>
                                    <input type="text" name="id" />
                                </label><br />
                                <label htmlFor="productname"><span>product Name:  </span>
                                    <input type="text" name="product" />
                                </label><br />
                                <label htmlFor="price"><span>Price:  </span>
                                    <input type="text" name="price" /> </label><br />
                                <label htmlFor="quantity"><span>Qantity:  </span>
                                    <input type="text" name="quantity" />
                                </label><br />
                                <button type="submit">update product</button>
                            </form></details>
                    </div>
                    <div className="deleteproduct">
                        <details><summary> delete product</summary>
                            <form action="/products/:productID" method="DELETE">
                                <label htmlFor="id"><span> ID:</span>
                                    <input type="text" name="id" />
                                </label><br />
                                <label htmlFor="productname"><span> product Name: </span>
                                    <input type="text" name="product" />
                                </label><br />
                                <label htmlFor="price"><span> Price: </span>
                                    <input type="text" name="price" /> </label><br />
                                <label htmlFor="quantity"><span>  Qantity: </span>
                                    <input type="text" name="quantity" />
                                </label><br />
                                <button type="submit">Delete product</button>
                            </form> </details>
                    </div></> : ""}

            </div>

        )
    }
}



const mapStateToProps = (state) => {
    return { data: state }
}


export default connect(mapStateToProps)(Products);