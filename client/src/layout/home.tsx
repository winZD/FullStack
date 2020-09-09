import React, { Component } from "react";
import styled from "styled-components";
import homePage from "../icons/homePage.jpg";

import { Link } from "react-router-dom";

import calendar from "../icons/calendar.png";
import documents from "../icons/documents.png";

import Patterns from "./patterns";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  overflow: auto;
  background: url(${homePage});
`;

const TitleDiv = styled.div`
  display: block;

  color: #ffffff;
  text-decoration: solid white;
  text-shadow: 0.03em 0.03em 0.01em rgba(0, 0, 0, 0.4);
  letter-spacing: 5px;
  font-size: 10rem;
  font-weight: 900;
  font-family: "Audiowide", cursive;
  padding-top: 1%;
`;

const ForOptionsDiv = styled.div`
  width: 100%;
  height: 64%;

  display: flex;

  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const OptionDiv = styled.div`
  height: 26rem;
  width: 27.5rem;
  position: relative;
  background-color: #000000cc;
  opacity: 0.9;
  border-radius: 2rem;

  padding: 5px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 1.3rem;
  text-align: center;
  color: white;
  font-size: 2rem;
  font-family: "Open Sans", sans-serif;
`;

const Home = () => {
  return (
    <Container>
      <TitleDiv>School box</TitleDiv>
      <ForOptionsDiv>
        <OptionDiv>
          <Link to="/patterns">
            {" "}
            <img
              src={documents}
              style={{
                width: "29rem",
                height: "23.5rem",
              }}
            ></img>
          </Link>
          <span>Obrasci i forme</span>
        </OptionDiv>
        <OptionDiv>
          <Link to="/navbar">
            <img
              src={calendar}
              style={{
                width: "29rem",
                height: "23.5rem",
              }}
            ></img>
          </Link>
          <span>Školski raspored</span>
        </OptionDiv>

        <OptionDiv>
          <Link to="/login">
            <h1>ADMIN</h1>
          </Link>
        </OptionDiv>
      </ForOptionsDiv>
    </Container>
  );
};

export default Home;
