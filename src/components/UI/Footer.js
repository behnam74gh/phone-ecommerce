import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper className="container-fluid">
      <p className="text-center">all rights reserved@</p>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background-color: var(--mainBlue);
  color: var(--mainWhite);
  height: 50px;
  padding-top: 12px;
  position: relative;
  bottom: 0;
`;

export default Footer;
