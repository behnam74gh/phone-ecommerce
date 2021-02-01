import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonContainer } from "./UI/Button";

class Navbar extends Component {
  render() {
    return (
      <NavWrapper className="navbar navbar-expans-sm navbar-dark px-sm-5">
        <Link to="/">
          <i className="fas fa-phone fa-3x text-warning navbar-brand"></i>
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
              products
            </Link>
          </li>
        </ul>
        <Link to="/cart" className="ml-auto">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-cart-plus"></i>
            </span>
            my cart
          </ButtonContainer>
        </Link>
      </NavWrapper>
    );
  }
}

const NavWrapper = styled.nav`
  background-color: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;

export default Navbar;
