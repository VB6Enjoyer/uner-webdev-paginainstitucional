// imports de bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

export function Header() {
  return (
    <BrowserRouter>
      <>
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">UNER FCAD</Navbar.Brand>
            <br />
            <Navbar className="bg-body-tertiary">
              <Container>
                <Navbar.Brand href="#home">
                  <img
                    src="/img/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                  />
                </Navbar.Brand>
              </Container>
            </Navbar>
            <br />
          </Container>
        </Navbar>
      </>
    </BrowserRouter>
  );
}
