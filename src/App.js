import React from 'react';

const inventory = [
    {
        name: "Dog",
        price: "100",
        image: "dog.png"
    },
    {
        name: "Book",
        price: "5",
        image: "book.png"
    },
    {
        name: "JavaScript",
        price: "69",
        image: "js.png"
    },
    {
        name: "Python",
        price: "0",
        image: "python.png"
    },
    {
        name: "CRUx President Post",
        price: "599",
        image: "crux.png"
    },
    {
        name: "BITS Pilani",
        price: "4000000",
        image: "bits.png"
    },
    {
        name: "Laptop",
        price: "999",
        image: "laptop.png"
    },
    {
        name: "Orange",
        price: "20",
        image: "orange.png"
    },
    {
        name: "Nirma Detergent",
        price: "10",
        image: "nirma.png"
    },
    {
        name: "Maggi",
        price: "1",
        image: "maggi.png"
    },
]



class Cart extends React.Component {


    render() {
        var cart = this.props.cart
        if (cart.length === 0) {
            return (
                <div className="cart">
                    You do not have any items in your cart.
                </div>
            )
        }

        var cartItems = [];
        var price = 0;
        for (var element of cart) {
            price += parseInt(element.price);
            cartItems.push(
                <div className="cart-item" key={element.name}>
                    <b>{element.name} </b>
                    <span>$ {element.price}</span>
                    <br />
                    <button onClick={() => { this.props.removeFromCart(element) }}>Remove</button>
                </div>
            )
        }
        return (
            <div className="cart">
                <h2>Cart</h2>
                <p>You have {cart.length} item(s) in cart.</p>
                <div>
                    {cartItems}
                </div>
                <hr></hr>
                <div>
                    Total Cost of Items : ${price}
                </div>
                <br></br>
                <button className="checkout" onClick={() => { alert(`Thank you for shopping with us.`) }}>Checkout</button>
            </div>
        )

    }
}


class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.item.name,
            price: props.item.price,
            image: props.item.image
        }
    }

    render() {
        return (
            <div className="row product">
                <div className="col-md-4 text-center">
                    <img src={`img/` + this.state.image} className="product-image" />
                </div>
                <div className="col-md-8">
                    <h3>{this.state.name}</h3>
                    <p>$ {this.state.price}</p>
                    <button onClick={() => { this.props.addToCart(this.props.item) }}>Add to Cart</button>
                </div>
            </div>
        )
    }
}



class Ecommerce extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inventory: props.inventory,
            cart: [],
            favourites: [],
            inCheckout: false,
            filterText: ""
        }
        this.addToCart = this.addToCart.bind(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.clearFilterText = this.clearFilterText.bind(this)

    }


    handleFilterTextChange(event) {
        this.setState({
            filterText: event.target.value
        })
    }

    clearFilterText() {
        this.setState({
            filterText: ""
        })
    }

    addToCart(item) {
        for (var element of this.state.cart) {
            if (element.name == item.name) {
                alert("Item is already present in your cart.")
                return;
            }
        }

        const newCart = this.state.cart;
        newCart.unshift(item);
        this.setState({
            cart: newCart,
        })

    }

    removeFromCart(item) {
        var newCart = this.state.cart;
        for (var i = 0; i < newCart.length; i++) {
            if (newCart[i].name == item.name) {
                newCart.splice(i, 1);
                this.setState({
                    cart: newCart,
                })
                return;
            }
        }
    }

    render() {
        if (!this.state.inCheckout) {
            var prodList = [];
            for (var element of this.state.inventory) {
                if (element.name.toUpperCase().includes(this.state.filterText.toUpperCase())) {
                    prodList.push(
                        <Product item={element} addToCart={this.addToCart} key={element.name} />
                    )
                }

            }
            return (
                <div className="row">

                    <div className="col-md-8">
                        <div className="row search">
                            <input className="searchbox col-md-10" type="search" placeholder="Filter Items" value={this.state.filterText} onChange={this.handleFilterTextChange} />
                            <button className="col-md-2" onClick={this.clearFilterText}>Clear</button>
                        </div>
                        {prodList}
                    </div>
                    <div className="col-md-4">
                        <Cart cart={this.state.cart} removeFromCart={this.removeFromCart} />
                    </div>

                </div>
            )
        }
    }

}

function App() {
    return (
        <div className="main">
            <h1 className="text-center">Ye Olde Ecommerce Shop</h1>
            <Ecommerce inventory={inventory} />


        </div>
    );
}

export default App;
