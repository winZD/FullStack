import React, { Component } from "react";
import styled from "styled-components";
import useGetData from "../customHooks/useGetData";
import usePostData from "../customHooks/usePostData";
import ReactTable from "react-table";

import { useMemo, useState, useEffect } from "react";

const ContentUpload = () => {
  const getData = useGetData();

  //const postData = usePostData();

  const data = [
    {
      name: "Roy Agasthyan",
      age: 26,
    },
    {
      name: "Sam Thomason",
      age: 22,
    },
    {
      name: "Michael Jackson",
      age: 36,
    },
    {
      name: "Samuel Roy",
      age: 56,
    },
    {
      name: "Rima Soy",
      age: 28,
    },
    {
      name: "Suzi Eliamma",
      age: 28,
    },
  ];

  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Age",
      accessor: "age",
    },
  ];

  return (
    <Container>
      <Title>Naslov</Title>
      <SideBarForm>dsdsds</SideBarForm>
      <MainContent>
        dsjsids
        <div>
          {getData.length <= 0
            ? "No entries"
            : getData.map((data: any) => (
                <div key={data.id}>
                  {data.firstNameLastName} {data.hour} {data.classroom}{" "}
                  {data.department}
                </div>
              ))}
        </div>
        <div>
          <h1>Cool app</h1>
        </div>
      </MainContent>
    </Container>
  );
};

export default ContentUpload;

const Container = styled.div`
  display: grid;

  grid-template-areas:
    "header header header"
    "nav content side"
    "footer footer footer";

  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-gap: 10px;

  height: 100vh;
`;
const Title = styled.div`
  height: 4rem;
  grid-area: header;
  background-color: #a3006d;

  text-align: center;
  font-size: 1.5rem;
  color: white;
  font-family: "Audiowide", cursive;
`;
const SideBarForm = styled.div`
  grid-area: nav;

  background-color: red;
`;

const MainContent = styled.div`
  grid-area: content;
  background-color: lightgrey;
  margin-left: 10rem;
`;
/*
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
*/
