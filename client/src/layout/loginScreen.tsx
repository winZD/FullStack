import React, { Component } from "react";
import styled from "styled-components";
import homePage from "../icons/homePage.jpg";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
import * as yup from "yup";

const Container = styled.div`
  display: flex;
  height: 100vh; // stands for “viewport height”, which is the viewable screen’s height. 100VH would represent 100% of the viewport’s height, or the full height of the screen
  width: 100vw; // stands for "viewport width", which is the viewable screen's width. 100VW would represent 100% of the viewport's width, or the full width of the screen
  justify-content: center;
  background-color: #f0ffff;
  align-items: center;
`;

const LogDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  width: 50%;
  height: 50%;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background-color: #6c7792;
`;

const LogFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;

  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  background-color: #000000cc;
  height: 38rem;
  width: 45rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 1rem;
`;
const TitleDiv = styled.div`
  height: 7rem;
  width: 100%;
  background-color: #3f1f5f;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  color: white;
`;
const vallidationSchema = yup.object().shape({
  email: yup.string().email().required("Required"),
  password: yup.string().required(),
});

const LoginScreen = () => {
  const [data, setData] = useState(false);
  let history = useHistory();

  const [password, setPassword] = useState("");
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const [email, setEmail] = useState("");
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    await axios
      .post(
        "http://localhost:5000/api/loginusers",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          const { token } = response.data;
          localStorage.setItem("token", token);
          history.push("/adminScreen");
        }
      })

      .catch((error) => {
        console.log(error);
        history.push("/");
      });
  };

  return (
    <Container>
      <LogDiv>
        <TitleDiv>
          <h1>Log in</h1>
        </TitleDiv>
        <LogFormDiv>
          <label>E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => {
              handleEmail(e);
            }}
            required
          ></input>

          <label>Password</label>

          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => {
              handlePassword(e);
            }}
            required
          ></input>

          <button
            style={{ width: "200px", marginTop: "15px" }}
            type="submit"
            onClick={handleSubmit}
          >
            LOG IN{" "}
          </button>
        </LogFormDiv>
      </LogDiv>
    </Container>
  );
};

export default LoginScreen;
