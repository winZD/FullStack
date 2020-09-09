import React, { Component } from "react";
import styled from "styled-components";
import useGetData from "../customHooks/useGetData";
import usePostData from "../customHooks/usePostData";

import axios from "axios";
import cookie from "react-cookie";
import { useCookies } from "react-cookie";
import { Formik, Form as FormikForm, Field } from "formik";
import { useMemo, useState, useEffect } from "react";

import Select from "react-select";
import { TextField, Button } from "@material-ui/core";
//import ReactTable from "react-table";
import ReactTable from "react-table-6";

import "react-table-6/react-table.css";
import treeTableHOC from "react-table-6/lib/hoc/treeTable";
import selectTableHOC from "react-table-6/lib/hoc/selectTable";
import Table from "./table/Table";
//
import HandlingSelectionChanges from "./table/Table2";
//

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import hr from "date-fns/locale/hr";

import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";

registerLocale("hr", hr);

const ContentUpload = () => {
  const SelectTreeTable = selectTableHOC(treeTableHOC(ReactTable));

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const handleLogOut = async (e) => {
    e.preventDefault();
    const token = document.cookie;
    console.log("ovo je token: " + token);

    removeCookie(token);
    window.location.reload(false);
  };

  /////////////////////////////////////////
  /* <SelectTreeTable
            data={allData}
            columns={columns}
            defaultPageSize={2}
            pageSizeOptions={[2, 4, 6]}
            sortable={true}
            filterable={true}
            className="-striped -highlight"

            /* getTrProps={(state, rowInfo, column) => {
              return {
                style: {
                  background: rowInfo.row.age > 40 ? "green" : "red",
                },
              };
            }}
            />*/
  //////////////////////////////////******************** */
  const [loading, setLoading] = useState(true);
  //za time picker

  /////////////////////
  const optionsForDateDataLocale = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const [date, setDate] = useState(new Date());
  const handleChangeDate = (date) => setDate(date);
  console.log(date.toLocaleDateString("hr", optionsForDateDataLocale));
  const dateLocale = date.toLocaleDateString("hr", optionsForDateDataLocale);
  //for sqlite
  const [profsData, setProfsData] = useState([]);
  const [cabinetData, setCabinetData] = useState([]);
  const [daysData, setDaysData] = useState([]);
  const [departmentsData, setDepartmentsData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [allData, setAllData] = useState([]);

  //for time picker
  const [timeChangeBegin, setTimeChangeBegin] = useState(moment());
  const [timeChangeUntil, setTimeChangeUntil] = useState(moment());
  const handleTimeChangeBegin = (timeChangeBegin) => {
    setTimeChangeBegin(timeChangeBegin);

    console.log(timeChangeBegin.format("HH:mm") + "<------ Vrijeme");
  };
  const handleTimeChangeUntil = (timeChangeUntil) => {
    setTimeChangeUntil(timeChangeUntil);

    console.log(timeChangeUntil.format("HH:mm") + "<------ Vrijeme");
  };

  ////dohvat svih podataka za odredenog profesora

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/profDayCabCouDep"
      );
      console.log(response);

      setAllData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  ///////dohvat profesora//////////
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/getDataProfessors"
      );
      console.log(response);

      setProfsData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  ///////////dohvat kabineta///////

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/getDataCabinets"
      );
      console.log(response);

      setCabinetData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  //////////////dohvat dana//////
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/getDataDays");
      console.log(response);

      setDaysData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  //dohvat odjela///////////
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/getDataDepartments"
      );
      console.log(response);

      setDepartmentsData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  ////dohvat predmeta

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/getDataCourses"
      );
      console.log(response);

      setCoursesData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const mapDataByName2 = profsData.map((prof) => ({
    id: prof.professors_id,
    label: prof.full_name,
    value: prof.full_name,
  }));

  const mapDataByCabinet2 = cabinetData.map((cabinet) => ({
    id: cabinet.cabinets_id,
    label: cabinet.cabinet_number,
    value: cabinet.cabinet_number,
  }));

  const mapDataByDay2 = daysData.map((day) => ({
    id: day.days_id,
    label: day.day_name,
    value: day.day_name,
  }));

  const mapDataByDepartment2 = departmentsData.map((department) => ({
    id: department.departments_id,
    label: department.department_name,
    value: department.department_name,
  }));

  const mapDataByCourse2 = coursesData.map((course) => ({
    id: course.courses_id,
    label: course.course_name,
    value: course.course_name,
  }));

  //može i React.useMemo
  const [selectedRows, setSelectedRows] = useState([]);

  console.log(selectedRows);
  //mapiranje selectedRowsa ta dohvat svakog itema u retku
  const result = selectedRows.map((d) => d.full_name);
  console.log(result);
  /*
  const [disabled, setDisabled] = useState(
    selectedRows.length >= 1 ? false : true
  );
*/
  const handleClick = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      alert(selectedRows);
    }
  };

  console.log();

  const deleteDataWithID = async () => {
    if (window.confirm("Jeste li sigurni da želite obrisati? ")) {
      const id = selectedRows.map((d) => d.id);
      window.location.reload(false);
      const response = await axios.delete(
        `http://localhost:5000/api/removeProfDayCabCouDep/${id}`,
        {
          id: id,
        }
      );
      console.log(response);
    }
  };

  const columns = useMemo(
    () => [
      {
        id: "selection",
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }) => (
          <div>
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      {
        Header: "Školske informacije",
        // First group columns
        columns: [
          {
            id: "full_name",
            Header: "Ime i prezime",
            accessor: (data) => data.full_name,
            sortType: "basic",
            width: 150,
          },
          {
            id: "cabinets",
            Header: "Učionica",
            accessor: (data) => data.cabinet_number,
            sortType: "basic",
            width: 80,
          },

          {
            id: "departments",
            Header: "Odjel",
            accessor: (data) => data.department_name,
            sortType: "basic",
            width: 150,
          },
          {
            id: "courses",
            Header: "Predmet",
            accessor: (data) => data.course_name,
            sortType: "basic",
          },

          {
            id: "date",
            Header: "Datum",
            accessor: (data) => data.full_date,
            sortType: "basic",
          },
          {
            id: "time_change_begin_until",
            Header: "Vrijeme",
            accessor: (data) =>
              `${data.time_change_begin} - ${data.time_change_until}`,
            sortType: "basic",
          },
        ],
      },
    ],
    []
  );

  //////////////////////////////////////////

  if (!profsData) return <div>loading...</div>;

  return (
    <Container>
      <Title>Naslov</Title>

      <SideBarForm>
        <AlignSideBarDiv>
          <Formik
            initialValues={{
              dates: "",
              time_change_begin: "",
              time_change_until: "",
              days: "",

              profesori: "",
              department: "",
              course: "",
              cabinet: "",
            }}
            onSubmit={async (data, { resetForm }) => {
              console.log(data);
              await axios.post("http://localhost:5000/api/postDates", {
                dates: dateLocale,
                time_change_begin: timeChangeBegin.format("HH:mm"),
                time_change_until: timeChangeUntil.format("HH:mm"),
              });

              await axios.post(
                "http://localhost:5000/api/postProfDayCabCouDep",
                {
                  dates: dateLocale,
                  time_change_begin: timeChangeBegin.format("HH:mm"),
                  time_change_until: timeChangeUntil.format("HH:mm"),
                  days_id: data.days,
                  professors_id: data.profesori,
                  departments_id: data.department,
                  course_id: data.course,
                  cabinets_id: data.cabinet,
                }
              );

              resetForm();
              window.location.reload(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              onChange,
              handleSubmit,
              setFieldTouched,
              isSubmitting,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <SelectDiv>
                  <DatePicker
                    name={"dates"}
                    selected={date}
                    onChange={handleChangeDate}
                    dateFormat="d MMMM , yyyy"
                    locale="hr"
                    inline
                  />
                  <SelectDiv>
                    <div>od</div>
                    <TimePicker
                      name="time_change_begin"
                      showSecond={false}
                      minuteStep={30}
                      onChange={handleTimeChangeBegin}
                      value={timeChangeBegin}
                    />

                    <div>do</div>
                    <TimePicker
                      name="time_change_until"
                      showSecond={false}
                      minuteStep={30}
                      onChange={handleTimeChangeUntil}
                      value={timeChangeUntil}
                    />
                  </SelectDiv>
                </SelectDiv>
                <SelectDiv>
                  <Select
                    placeholder={"Odaberite dan"}
                    name={"days"}
                    options={mapDataByDay2}
                    values={values.daysData}
                    onChange={(value) => setFieldValue("days", value.id)}
                    onBlur={() => setFieldTouched("days", true)}
                  ></Select>
                </SelectDiv>
                <SelectDiv>
                  <Select
                    name={"profesori"}
                    placeholder={"Odaberite profesora"}
                    isDisabled={loading}
                    options={mapDataByName2}
                    values={values.profsData}
                    onChange={(value) => setFieldValue("profesori", value.id)}
                  ></Select>
                </SelectDiv>
                <SelectDiv>
                  <Select
                    name={"department"}
                    placeholder={"Odaberite odjel"}
                    isDisabled={loading}
                    options={mapDataByDepartment2}
                    values={values.departmentsData}
                    onChange={(value) => setFieldValue("department", value.id)}
                  ></Select>
                </SelectDiv>
                <SelectDiv>
                  <Select
                    name={"course"}
                    placeholder={"Odaberite predmet"}
                    isDisabled={loading}
                    options={mapDataByCourse2}
                    values={values.coursesData}
                    onChange={(value) => setFieldValue("course", value.id)}
                  ></Select>
                </SelectDiv>
                <SelectDiv>
                  <Select
                    name={"cabinet"}
                    placeholder={"Odaberite kabinet"}
                    isDisabled={loading}
                    options={mapDataByCabinet2}
                    values={values.cabinetsData}
                    onChange={(value) => setFieldValue("cabinet", value.id)}
                  ></Select>
                </SelectDiv>

                <Button type="submit" variant="contained" color="primary">
                  SUBMIT
                </Button>

                <pre>{JSON.stringify(values, null, 2)}</pre>
              </form>
            )}
          </Formik>
        </AlignSideBarDiv>
      </SideBarForm>

      <MainContent>
        <div>
          <h1>Administracija</h1>
        </div>
        <button
          onClick={deleteDataWithID}
          disabled={selectedRows.length >= 1 ? false : true}
        >
          Obriši
        </button>

        <button onClick={handleLogOut}>Log out</button>

        <Table
          columns={columns}
          data={allData}
          setSelectedRows={setSelectedRows}
        />

        <p>Selected Rows: {selectedRows.length}</p>
        <pre>
          <code>
            {JSON.stringify(
              {
                selectedRows,
              },
              null,
              2
            )}
          </code>
        </pre>
      </MainContent>
    </Container>
  );
};

export default ContentUpload;
//<Table columns={columns} data={allData} />
const Container = styled.div`
  display: grid;

  grid-template-areas:
    "header header header"
    "nav content side"
    "footer footer footer";

  grid-template-columns: 380px 1fr 0px;
  grid-template-rows: auto 1fr auto;
  grid-gap: 1px;

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
const SideBarForm = styled.div`
  grid-area: nav;

  background-color: #6c7792;
`;
const SelectDiv = styled.div`
  width: 80 vw;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  color: black;
`;

const MainContent = styled.div`
  grid-area: content;
  background-color: whitesmoke;
`;
const AlignSideBarDiv = styled.div`
  display: grid;
  font-family: "Audiowide", cursive;
  text-align: center;
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
