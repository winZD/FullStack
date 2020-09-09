import React from "react";
import Select from "react-select";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import back from "../icons/back.png";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import print from "print-js";

import { saveAs } from "file-saver";
import axios from "axios";

const ParrentDiv = styled.div`
  display: grid;

  grid-template-areas:
    "header header header"
    "nav content side"
    "footer footer footer";

  grid-template-columns: 380px 1fr 0px;
  grid-template-rows: auto 1fr auto;
  grid-gap: 10px;

  height: 100vh;
`;
const Title = styled.div`
  height: 4rem;
  grid-area: header;
  background-color: #3f1f5f;

  text-align: center;
  font-size: 1.5rem;
  color: white;
  font-family: "Audiowide", cursive;
`;

const MainContentDiv = styled.div`
  grid-area: content;
  background-color: whitesmoke;
`;

const SideBarForm = styled.div`
  grid-area: nav;

  background-color: #6c7792;
`;

const PatternDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.4;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s ease-in-out;
`;

const signUpValidationSchema = yup.object().shape({
  firstNameLastName: yup
    .string()
    .required("Unesite ime i prezime")
    .max(40, "Please enter no more than 40 characters"),

  subject: yup
    .string()
    .required("Unesite predmet")
    .max(40, "Please enter no more than 40 characters"),
});

const Example = () => {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>

      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

const Clock = (props: any) => {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
};

const Patterns = () => {
  const [themeName, setThemeName] = useState("(Naslov teme)");

  const [studentName, setStudentName] = useState("(Ime i prezime studenta)");

  const [studentNumber, setStudentNumber] = useState("(Matični broj studenta)");

  const [mentor, setMentor] = useState("(Mentor)");

  const [selectedOption, setSelectedOption] = useState("redovan");
  const handleOptionChange = (changeEvent: any) => {
    setSelectedOption(changeEvent.target.value);
  };

  const handleInputTheme = (e: any) => {
    setThemeName(e.target.value);
  };
  const handleInputName = (e: any) => {
    setStudentName(e.target.value);
  };

  const handleStudentNumber = (e: any) => {
    setStudentNumber(e.target.value);
  };

  const handleMentor = (e: any) => {
    setMentor(e.target.value);
  };
  // new function for generating pdf

  const createPDF = async () => {
    const post = await axios.post("http://localhost:5000/api/createPDF", {
      themeName,
      studentName,
      studentNumber,
    });
    const response = await axios.get("http://localhost:5000/api/fetchPDF", {
      responseType: "blob",
    });

    const pdfBlob = await new Blob([response.data], {
      type: "application/pdf",
    });
    saveAs(pdfBlob, "obrazac_1.pdf");
  };

  return (
    <ParrentDiv>
      <Link to="/">
        <img
          src={back}
          style={{
            width: "50px",
            position: "absolute",
            left: "1%",
            top: "1%",
          }}
        ></img>
      </Link>
      <Title>Obrasci i forme</Title>

      <SideBarForm>
        <form>
          <Clock date={new Date()} />
          <TextField
            id="standard-basic"
            label="Tema završnog rada"
            style={{ margin: "20px", backgroundColor: "white" }}
            onChange={(e) => {
              handleInputTheme(e);
            }}
          />
          <TextField
            id="standard-basic"
            label="Ime i prezime"
            style={{ margin: "20px", backgroundColor: "white" }}
            onChange={(e) => {
              handleInputName(e);
            }}
          />
          <div>
            <label>
              <input
                type="radio"
                value="redovan"
                checked={selectedOption === "redovan"}
                onChange={handleOptionChange}
              />
              Redovan
            </label>
            <label>
              <input
                type="radio"
                value="izvanredan"
                checked={selectedOption === "izvanredan"}
                onChange={handleOptionChange}
              />
              Izvanredan
            </label>
          </div>
          <TextField
            style={{ margin: "20px", backgroundColor: "white" }}
          ></TextField>
          <TextField
            id="standard-basic"
            label="Mentor"
            style={{ margin: "20px", backgroundColor: "white" }}
            onChange={(e) => {
              handleMentor(e);
            }}
          />
          <TextField
            id="standard-basic"
            label="Ko-mentor"
            style={{ margin: "20px", backgroundColor: "white" }}
          />
          <TextField
            id="standard-basic"
            label="Matični broj studenta"
            type="number"
            style={{ margin: "20px", backgroundColor: "white" }}
            onChange={(e) => {
              handleStudentNumber(e);
            }}
          />
        </form>{" "}
        <Example></Example>
        <button
          onClick={() =>
            print({
              printable: "print-form",
              type: "html",
              header: "Prijava teme završnog rada",
              maxWidth: 800,
              targetStyle: ["display:flex"],
            })
          }
        >
          PRINTJSSS
        </button>
        <button onClick={createPDF}>PDF</button>
      </SideBarForm>
      <MainContentDiv>
        <PatternDiv>
          <h1>Sveučilište u Zadru</h1>
          <h2>Prijava teme završnog rada</h2>

          <p>Prijedlog naslova teme: {themeName}</p>
          <p>Ime studenta: {studentName}</p>
          <p>Matični broj studenta: {studentNumber}</p>
          <p>Mentor: {mentor}</p>
          <p>Status studenta: {selectedOption}</p>
          <div style={{ marginLeft: "15px", marginRight: "15px" }}>
            <p>
              Povjerenstvu za završne i diplomske radove Sveučilišta u Zadru,
              odjela Informacijske tehnologije, podnosim zamolbu za prijavu teme
              diplomskog rada sa gore navedenim podacima.
            </p>
            <p>
              Predajom ove prijave diplomskog rada izjavljujem i potvrđujem da
              ću diplomski rad koji će nastati na temelju ovdje napisanog
              izraditi potpuno samostalno u skladu sa savjetima i komentarima
              mentora i članova povjerenstva za diplomske radove te objavljenu
              literaturu koja je navedena u samom tekstu rada i popisu
              literature.
              <p>
                {" "}
                Izjavljujem da niti jedan dio mojeg rada neće biti prepisan iz
                necitiranog rada, da niti jednim dijelom svojeg rada neću kršiti
                bilo čija autorska prava i da niti jedan dio rada neće biti
                napisan na nedozvoljeni način.
              </p>{" "}
              <p>
                Pri pisanju i sastavljanju rada vodit ću se načelima najbolje
                akademske prakse, što je prvenstveno vezano uz nepovredivost
                autorstva te ispravno citiranje i referenciranje radova drugih
                autora.
              </p>{" "}
              U slučaju da se u bilo kojem trenutku dokaže kako je rad napisan
              na nedozvoljen način spreman/spremna sam snositi sve posljedice
              takvog čina, uključivo i oduzimanje javne isprave koju ću takvim
              radom steći.{" "}
            </p>
          </div>
        </PatternDiv>
      </MainContentDiv>
    </ParrentDiv>
  );
};
export default Patterns;
