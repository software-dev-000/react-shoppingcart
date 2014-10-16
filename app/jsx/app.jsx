/** @jsx React.DOM */
'use strict';
define([], function () {

    var Product = React.createClass({
        render: function() {
            return (
                    <div className="pure-u-1 pure-u-md-1-3">
                    <h2 className="productTitle">
                    {this.props.title}
                    </h2>
                    <h4 className="productPrice">
                    {this.props.price}
                    </h4>
                    <button>Add to Cart</button>
                    </div>
            );
        }
    });

    var ProductList = React.createClass({
        render: function() {
            var productNodes = this.props.data.map(function (product) {
                return (
                        <Product title={product.title} price={product.price}>
                        </Product>
                );
            });
            return (
                    <div className="productList pure-g">
                    {productNodes}
                </div>
            );
        }
    });

    var ShoppingCart = React.createClass({
        loadProductsFromServer: function() {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                success: function(data) {
                    this.setState({data: data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        getInitialState: function() {
            return {data: []};
        },
        componentDidMount: function() {
            this.loadProductsFromServer();
            setInterval(this.loadProductsFromServer, this.props.pollInterval);
        },
        render: function() {
            return (
                    <div className="shoppingCart">
                    <div className="pure-menu pure-menu-open pure-menu-horizontal pure-menu-pull-right">
                    <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                    </ul>
                    </div>
                    <h1>Products</h1>
                    <ProductList data={this.state.data} />
                    </div>
            );
        }
    });

    return ShoppingCart;
});










