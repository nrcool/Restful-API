import React, { Component } from 'react'
import { connect } from "react-redux";

class Products extends Component {

    state = {
        products: [],
        postproduct: "",
        updateproduct:"",
        deleteproduct:""
    }   
  

    getproducts = () => {
        fetch("https://my-restful-api5.herokuapp.com/products",{method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }})
            .then(res => res.json())
            .then(res2 => {
                console.log(res2)
                this.setState({
                    products: res2
                })
            }
            )
    }
    productPost = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target)
        const searchurl = new URLSearchParams();
        for (const pair of formdata) {
            searchurl.append(pair[0], pair[1])
        }
        e.target.reset()
        fetch("https://my-restful-api5.herokuapp.com/products", { method: "POST", body: searchurl })
            .then(res => res.json())
                .then(res2 => this.setState({
                    postproduct:res2.postproduct
                  },()=>{
                      setTimeout(() => {
                         this.setState({
                            postproduct:""
                         }) 
                      }, 2000);
                      
                  }))
    }
    productUpdate = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target)
        const searchurl = new URLSearchParams();
        for (const pair of formdata) {
            searchurl.append(pair[0], pair[1])
        }
        e.target.reset()
        fetch("https://my-restful-api5.herokuapp.com/products", { method: "PATCH", body: searchurl })
            .then(res => res.json())
                .then(res2 => this.setState({
                    updateproduct: res2.updateproduct
                },()=>{
                    setTimeout(() => {
                       this.setState({
                          updateproduct:""
                       }) 
                    }, 2000);
                    
                }))

    }
    productDelete = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target)
        const searchurl = new URLSearchParams();
        for (const pair of formdata) {
            searchurl.append(pair[0], pair[1])
        }
        e.target.reset()
        fetch("https://my-restful-api5.herokuapp.com/products", { method: "DELETE", body: searchurl })
            .then(res => res.json())
                .then(res2 => this.setState({
                    deleteproduct: res2.deleteproduct
                },()=>{
                    setTimeout(() => {
                       this.setState({
                          deleteproduct:""
                       }) 
                    }, 2000);
                    
                }))

    }
    render() {
        return (
            <div className="productspage">
                <h1>Products</h1>
                <div className="getproducts">
                    <button onClick={this.getproducts}>Get products</button>
                    <details><summary>all products </summary>
                    {this.state.products.length === 0 ? "" : (<>{this.state.products.map(product => {
                            return (<div key={product._id} style={{ background: "lightgreen", padding: "5px", bproduct: "2px dotted black" }}><p> <span style={{ background: "lightgray" }}> Id:</span> {product._id} </p>
                                <p><span style={{ background: "lightgray" }}>  Item Name:</span> {product.itemname} </p>
                                <p><span style={{ background: "lightgray" }}> Price:</span>  {product.price} </p>
                                <p> <span style={{ background: "lightgray" }}>  quantity:</span>{product.quantity} </p> </div>)
                        })}</>)}
                     </details>

                </div>
                {this.props.data.admin ?<> <div className="postproduct">
                    <details><summary>post product </summary>

                        <form method="POST" onSubmit={this.productPost}>
                            <label htmlFor="productname"><span>product Name:  </span>
                                <input type="text" name="itemname" />
                            </label><br />
                            <label htmlFor="price"><span> price:  </span>
                                <input type="text" name="price" /> </label><br />
                            <label htmlFor="quantity"><span>Qantity:  </span>
                                <input type="text" name="quantity" />
                            </label><br />
                            <span className="msjfromserver">{this.state.postproduct}</span><br/>
                            <button type="submit">Post product</button>
                        </form></details>
                </div>
                    <div className="updateproduct">
                        <details><summary> update product</summary>

                            <form method="PATCH" onSubmit={this.productUpdate}>
                                <label htmlFor="id"><span> ID: </span>
                                    <input type="text" name="id" />
                                </label><br />
                                <label htmlFor="productname"><span>product Name:  </span>
                                    <input type="text" name="itemname" />
                                </label><br />
                                <label htmlFor="price"><span>Price:  </span>
                                    <input type="text" name="price" /> </label><br />
                                <label htmlFor="quantity"><span>Qantity:  </span>
                                    <input type="text" name="quantity" />
                                </label><br />
                                <span className="msjfromserver">{this.state.updateorder}</span><br/>
                                <button type="submit">update product</button>
                            </form></details>
                    </div>
                    <div className="deleteproduct">
                        <details><summary> delete product</summary>
                            <form method="DELETE" onSubmit={this.productDelete}>
                                <label htmlFor="id"><span> ID:</span>
                                    <input type="text" name="id" />
                                </label><br />
                                <span className="msjfromserver">{this.state.deleteorder}</span><br/>
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