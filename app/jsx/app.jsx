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
            <button onClick={this.props.handleSubmit.bind(null,this)}>Add to Cart</button>
            </div>
        );
    }
  });

  var ProductList = React.createClass({
      render: function() {
        var handler = this.props.handleSubmit;
        var productNodes = this.props.data.map(function (product) {
          return (
              <Product title={product.title} price={product.price} handleSubmit={handler}>
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

  var CartMenu = React.createClass({
    render: function() {
        if (this.props.selected.length != 0) {
          return (
            <div className="pure-menu pure-menu-open pure-menu-horizontal pure-menu-pull-right">
            <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#"><i data-count={this.props.selected.length} className="fa fa-shopping-cart fa-2x badge"></i></a></li>
            </ul>
            </div>
          );
        }
        else {
          return (
            <div className="pure-menu pure-menu-open pure-menu-horizontal pure-menu-pull-right">
            <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#"><i className="fa fa-shopping-cart fa-2x"></i></a></li>
            </ul>
            </div>
          );
        }
    }
  });

  var ShoppingCart = React.createClass({
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
          <div className="shoppingCart">
          <CartMenu selected={this.state.selected}/>
          <h1>Products</h1>
          <ProductList data={this.state.data} handleSubmit={this.handleSubmit}/>
          </div>
        );
      }
    });

    return ShoppingCart;
});










