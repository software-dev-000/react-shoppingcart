/** @jsx React.DOM */
'use strict';
define([], function () {

  var DropdownItem = React.createClass({displayName: 'DropdownItem',
    render: function() {
      return (
          React.DOM.div(null, 
            React.DOM.a( {href:"javascript:void(0)", onClick:this.props.handleDelete.bind(null,this)}, 
              React.DOM.i( {className:"fa fa-times-circle"})
            ),this.props.item.title
          )
      );
    }
  });

  var DropdownList = React.createClass({displayName: 'DropdownList',
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
            DropdownItem( {item:item, handleDelete:handleDelete}
            )
        );
      });
      return (
          React.DOM.div( {id:"dropdown-1", className:"dropdown dropdown-tip dropdown-anchor-right"}, 
            React.DOM.div( {className:"dropdown-panel"}, 
              itemNodes,
              React.DOM.p(null, "Total = $",totalPrice),
              React.DOM.button(null, "Go To Checkout")
            )
          )
      );
    }
  });

  var Product = React.createClass({displayName: 'Product',
    render: function() {
        return (
            React.DOM.div( {className:"pure-u-1 pure-u-md-1-2"}, 
              React.DOM.h2( {className:"productTitle"}, 
                this.props.title
              ),
              React.DOM.h4( {className:"productPrice"}, 
                " $",this.props.price
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
                React.DOM.li(null, 
                  React.DOM.a( {href:"#", 'data-dropdown':"#dropdown-1", 'data-horizontal-offset':"-50"}, 
                    React.DOM.i( {'data-count':this.props.selected.length, className:"fa fa-shopping-cart fa-2x badge"})
                  )
                )
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
          React.DOM.div( {className:"shoppingCart"}, 
            CartMenu( {selected:this.state.selected}),
            React.DOM.div( {className:"shoppingMain"}, 
              React.DOM.h1(null, "Products"),
              ProductList( {data:this.state.data, handleSubmit:this.handleSubmit}),
              DropdownList( {items:this.state.selected, handleDelete:this.handleDelete} )
            )
          )
        );
      }
    });

    return ShoppingCart;
});










