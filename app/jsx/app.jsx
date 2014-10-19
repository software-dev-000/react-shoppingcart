/** @jsx React.DOM */
'use strict';
define([], function () {

  var DropdownItem = React.createClass({
    render: function() {
      return (
          <div>
            <a href="javascript:void(0)" onClick={this.props.handleDelete.bind(null,this)}>
              <i className="fa fa-times-circle"></i>
            </a>{this.props.item.title}
          </div>
      );
    }
  });

  var DropdownList = React.createClass({
    render: function() {
      var handleDelete = this.props.handleDelete;
      var itemList = this.props.items;
      var totalPrice = 0;
      if(this.props.items == 0) {
        totalPrice = 0;
      }
      else {
        for(var i=0, n=itemList.length; i<n; i++) {
          var str = itemList[i].price;
          var num = str.replace(/,/g, "");
          totalPrice += parseInt(num);
        }
      }
      var itemNodes = this.props.items.map(function (item) {
        return (
            <DropdownItem item={item} handleDelete={handleDelete}>
            </DropdownItem>
        );
      });
      return (
          <div id="dropdown-1" className="dropdown dropdown-tip dropdown-anchor-right">
            <div className="dropdown-panel">
              {itemNodes}
              <p>Total = ${totalPrice}</p>
              <button>Go To Checkout</button>
            </div>
          </div>
      );
    }
  });

  var Product = React.createClass({
    render: function() {
        return (
            <div className="pure-u-1 pure-u-md-1-2">
              <h2 className="productTitle">
                {this.props.title}
              </h2>
              <h4 className="productPrice">
                ${this.props.price}
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
                <li>
                  <a href="#" data-dropdown="#dropdown-1" data-horizontal-offset="-50">
                    <i data-count={this.props.selected.length} className="fa fa-shopping-cart fa-2x badge"></i>
                  </a>
                </li>
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
        var nextSelected = this.state.selected.concat([{"title": component.props.title, 
                                                        "price": component.props.price,
                                                        "id": this.state.selected.length+1}]);
        this.setState({data: this.state.data, selected: nextSelected});
      },
      handleDelete: function(component,event) {
        var nextState = this.state.selected.filter(function (el) {
          return el.id != component.props.item.id;});;
        this.setState({data: this.state.data, selected: nextState});
      },
      render: function() {
        return (
          <div className="shoppingCart">
            <CartMenu selected={this.state.selected}/>
            <div className="shoppingMain">
              <h1>Products</h1>
              <ProductList data={this.state.data} handleSubmit={this.handleSubmit}/>
              <DropdownList items={this.state.selected} handleDelete={this.handleDelete} />
            </div>
          </div>
        );
      }
    });

    return ShoppingCart;
});










