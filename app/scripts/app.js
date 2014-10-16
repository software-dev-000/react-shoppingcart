/** @jsx React.DOM */
'use strict';
define([], function () {

    var Product = React.createClass({displayName: 'Product',
        render: function() {
            return (
                    React.DOM.div( {className:"pure-u-1 pure-u-md-1-3"}, 
                    React.DOM.h2( {className:"productTitle"}, 
                    this.props.title
                    ),
                    React.DOM.h4( {className:"productPrice"}, 
                    this.props.price
                    ),
                    React.DOM.button(null, "Add to Cart")
                    )
            );
        }
    });

    var ProductList = React.createClass({displayName: 'ProductList',
        render: function() {
            var productNodes = this.props.data.map(function (product) {
                return (
                        Product( {title:product.title, price:product.price}
                        )
                );
            });
            return (
                    React.DOM.div( {className:"productList pure-g"}, 
                    productNodes
                )
            );
        }
    });

    var ShoppingCart = React.createClass({displayName: 'ShoppingCart',
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
                    React.DOM.div( {className:"shoppingCart"}, 
                    React.DOM.div( {className:"pure-menu pure-menu-open pure-menu-horizontal pure-menu-pull-right"}, 
                    React.DOM.ul(null, 
                    React.DOM.li(null, React.DOM.a( {href:"#"}, "Home")),
                    React.DOM.li(null, React.DOM.a( {href:"#"}, React.DOM.i( {className:"fa fa-shopping-cart"})))
                    )
                    ),
                    React.DOM.h1(null, "Products"),
                    ProductList( {data:this.state.data} )
                    )
            );
        }
    });

    return ShoppingCart;
});










