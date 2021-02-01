import React, { Component } from "react";
import { storeProducts, detailProduct } from "../../Data";

const ProductContext = React.createContext();

export class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };

  setProducts = () => {
    let tempProdaucts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProdaucts = [...tempProdaucts, singleItem];
    });
    this.setState(() => {
      return { products: tempProdaucts };
    });
  };
  componentDidMount() {
    this.setProducts();
  }

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };
  addToCart = (id) => {
    let tempProdaucts = [...this.state.products];
    const index = tempProdaucts.indexOf(this.getItem(id));
    const product = tempProdaucts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return {
          products: tempProdaucts,
          cart: [...this.state.cart, product],
          modalOpen: false,
        };
      },
      () => this.addTotals()
    );
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState({ modalProduct: product, modalOpen: true });
  };

  closeModal = (id) => this.setState({ modalOpen: false });

  increment = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.price * product.count;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.price * product.count;
      this.setState(
        () => {
          return {
            cart: [...tempCart],
          };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };
  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter((item) => item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));
    let removedItem = tempProducts[index];
    removedItem.count = 0;
    removedItem.total = 0;
    removedItem.inCart = false;

    this.setState(
      () => {
        return {
          cart: tempCart,
          products: tempProducts,
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  clearCart = (id) => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total,
      };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export const ProductConsumer = ProductContext.Consumer;
