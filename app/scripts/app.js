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
            React.DOM.button( {onClick:this.props.handleSubmit.bind(null,this)}, "Add to Cart")
            )
        );
    }
  });

  var ProductList = React.createClass({displayName: 'ProductList',
      render: function() {
        var handler = this.props.handleSubmit;
        var productNodes = this.props.data.map(function (product) {
          return (
              Product( {title:product.title, price:product.price, handleSubmit:handler}
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

  var CartMenu = React.createClass({displayName: 'CartMenu',
    render: function() {
        if (this.props.selected.length != 0) {
          return (
            React.DOM.div( {className:"pure-menu pure-menu-open pure-menu-horizontal pure-menu-pull-right"}, 
            React.DOM.ul(null, 
            React.DOM.li(null, React.DOM.a( {href:"#"}, "Home")),
            React.DOM.li(null, React.DOM.a( {href:"#"}, React.DOM.i( {'data-count':this.props.selected.length, className:"fa fa-shopping-cart fa-2x badge"})))
            )
            )
          );
        }
        else {
          return (
            React.DOM.div( {className:"pure-menu pure-menu-open pure-menu-horizontal pure-menu-pull-right"}, 
            React.DOM.ul(null, 
            React.DOM.li(null, React.DOM.a( {href:"#"}, "Home")),
            React.DOM.li(null, React.DOM.a( {href:"#"}, React.DOM.i( {className:"fa fa-shopping-cart fa-2x"})))
            )
            )
          );
        }
    }
  });

  var ShoppingCart = React.createClass({displayName: 'ShoppingCart',
    loadProductsFromServer: function() {
      $.ajax({
        url: this.props.url,
          dataType: 'json',
          success: function(data) {
          this.setState({data: data, selected: []});
          }.bind(this),
            error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
            }.bind(this)
          });
    },
      getInitialState: function() {
        return {data: [], selected: []};
      },
      componentDidMount: function() {
        this.loadProductsFromServer();
      },
      handleSubmit: function(component,event) {
        var nextSelected = this.state.selected.concat([[component.props.title, component.props.price]]);
        this.setState({data: this.state.data, selected: nextSelected});
      },
      render: function() {
        return (
          React.DOM.div( {className:"shoppingCart"}, 
          CartMenu( {selected:this.state.selected}),
          React.DOM.h1(null, "Products"),
          ProductList( {data:this.state.data, handleSubmit:this.handleSubmit})
          )
        );
      }
    });

    return ShoppingCart;
});










