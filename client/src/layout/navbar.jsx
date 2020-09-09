import React, { Component } from "react";
import Select from "react-select";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Formik, Form as FormikForm, Field } from "formik";
import back from "../icons/back.png";
import { useMemo, useState, useEffect } from "react";
import axios from "axios";

import TableStudents from "./table/TableStudents";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import hr from "date-fns/locale/hr";
import HandlingSelectionChanges from "./table/Table2";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import WeekPopupSchedule from "./WeekPopupSchedule";

registerLocale("hr", hr);

//const logo = require("../icons/back.png"); ----> za typescript

const TableDiv = styled.div`
  height: 65rem;
  max-height: 62.5vh;
  width: 50rem;
  position: absolute;
  top: 55%;
  left: 62.5%;
  transform: translate(-50%, -50%);

  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;
const TableNameDiv = styled.div`
  height: 7.5%;
  width: 100%;
  text-align: center;
  font-size: 2.5rem;
  background-color: transparent;
  font-weight: bold;
  margin-top: 0.5rem;
`;

const InTableDataDiv = styled.div`
  max-height: 90%;
  width: 95%;
  overflow-y: scroll;
`;

const NavBar = () => {
  const [loading, setLoading] = useState(true);

  /*
  useEffect(() => {
    fetch("http://localhost:5000/api/getData")
      .then((response) => response.json())
      .then((data) => {
        setDatabase(data);
      });
  }, []);
*/

  /*
   {posts.map((item: any) => (
                <div key={item.userId}>
                  <li>
                    <h2>{item.title}</h2>
                    <p>{item.body}</p>
                  </li>
                </div>
              ))}
*/

  /*Login database:
  const handleClick2 = () => {
    axios.post("http://localhost:5000/api/login/user", {
      username: "teste user-a",
      email: "ccc@yahoo.com",
      password: "123456789",
    }); 
  };
  */
  ////////////////////////////////////////////////////////
  const optionsForDateDataLocale = {
    weekday: "long",
  };

  const [date, setDate] = useState(new Date());
  const handleChangeDate = (date) => setDate(date);
  const dateLocale = date
    .toLocaleDateString("hr", optionsForDateDataLocale)
    .toUpperCase();

  console.log(date);

  const [profData, setProfData] = useState([]);
  const [cabinetData, setCabinetData] = useState([]);
  const [daysData, setDaysData] = useState([]);
  const [departmentsData, setDepartmentsData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [allData, setAllData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "Informacije o predavanjima",
        // First group columns
        columns: [
          {
            id: "professors",
            Header: "Ime i prezime",
            accessor: (data) => data.full_name,
          },
          {
            id: "cabinets",
            Header: "Učionica",
            accessor: (data) => data.cabinet_number,
          },

          {
            id: "departments",
            Header: "Odjel",
            accessor: (data) => data.department_name,
          },
          {
            id: "courses",
            Header: "Predmet",
            accessor: (data) => data.course_name,
          },
          {
            id: "days",
            Header: "Dan",
            accessor: (data) => data.day_name,
          },
        ],
      },
    ],
    []
  );

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

      setProfData(response.data);
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

  /////////////////////////

  const handleClick = () => {};

  const [popup, setPopup] = useState(false);
  const [weekDay, setWeekDay] = useState([]);
  const handleWeekSchedule = () => {
    setPopup(true);
  };
  const closeWeekSchedule = () => {
    setPopup(false);
  };

  /////////////////////////////////////////

  if (!profData) return <div>Loading...</div>;

  const mapDataByName = profData.map((prof) => ({
    id: prof.professors_id,
    label: prof.full_name,
    value: prof.full_name,
  }));

  const mapDataByCabinet = cabinetData.map((cabinet) => ({
    id: cabinet.cabinets_id,
    label: cabinet.cabinet_number,
    value: cabinet.cabinet_number,
  }));

  const mapDataByDay = daysData.map((day) => ({
    id: day.days_id,
    label: day.day_name,
    value: day.day_name,
  }));
  const mapDataByDepartment = departmentsData.map((department) => ({
    id: department.departments_id,
    label: department.department_name,
    value: department.department_name,
  }));

  const mapDataByCourse = coursesData.map((course) => ({
    id: course.courses_id,
    label: course.course_name,
    value: course.course_name,
  }));

  //<TableStudents columns={columns} data={allData} /> ako bude potrebno mijenjati
  return (
    <Container>
      <Title>
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

        <AlignTitleDiv>
          <div>
            <span>Raspored</span>
          </div>
        </AlignTitleDiv>
      </Title>

      <SideBarForm>
        <AlignSideBarDiv>
          <span>Odaberi:</span>
          <Formik
            initialValues={{
              days: "",
              profesori: "",
              department: "",
              course: "",
              cabinet: "",
            }}
            onSubmit={async (data) => {
              //console.log(data);

              const post = await axios.post(
                "http://localhost:5000/api/postSearchProfDayCabCouDep",
                {
                  days_id: data.days,
                  professors_id: data.profesori,
                  departments_id: data.department,
                  course_id: data.course,
                  cabinets_id: data.cabinet,
                }
              );

              setFilteredData(post.data);
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
                  {loading ? (
                    <Skeleton height={250} width={200} />
                  ) : (
                    <DatePicker
                      selected={date}
                      onChange={handleChangeDate}
                      dateFormat="d MMMM , yyyy"
                      locale="hr"
                      inline
                    />
                  )}
                </SelectDiv>
                <SelectDiv>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <Select
                      placeholder={"Odaberite dan"}
                      name={"days"}
                      options={mapDataByDay}
                      values={values.daysData}
                      onChange={(value) => setFieldValue("days", value.id)}
                    ></Select>
                  )}
                </SelectDiv>
                <SelectDiv>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <Select
                      name={"profesori"}
                      placeholder={"Odaberite profesora"}
                      //isDisabled={loading}
                      options={mapDataByName}
                      values={values.profData}
                      onChange={(value) => setFieldValue("profesori", value.id)}
                    ></Select>
                  )}
                </SelectDiv>
                <SelectDiv>
                  {loading ? (
                    <Skeleton height={50} />
                  ) : (
                    <Select
                      name={"department"}
                      placeholder={"Odaberite odjel"}
                      //isDisabled={loading}
                      options={mapDataByDepartment}
                      values={values.departmentsData}
                      onChange={(value) =>
                        setFieldValue("department", value.id)
                      }
                    ></Select>
                  )}
                </SelectDiv>
                <SelectDiv>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <Select
                      name={"course"}
                      placeholder={"Odaberite predmet"}
                      //isDisabled={loading}
                      options={mapDataByCourse}
                      values={values.coursesData}
                      onChange={(value) => setFieldValue("course", value.value)}
                    ></Select>
                  )}
                </SelectDiv>
                <SelectDiv>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <Select
                      name={"cabinet"}
                      placeholder={"Odaberite kabinet"}
                      //isDisabled={loading}
                      options={mapDataByCabinet}
                      values={values.cabinetsData}
                      onChange={(value) =>
                        setFieldValue("cabinet", value.value)
                      }
                    ></Select>
                  )}
                </SelectDiv>

                <Button type="submit" variant="contained" color="primary">
                  Pretraži
                </Button>

                <pre>{JSON.stringify(values, null, 2)}</pre>
              </form>
            )}
          </Formik>
          <button onClick={handleClick}>Klik</button>
        </AlignSideBarDiv>
      </SideBarForm>
      <MainContent>
        <button onClick={handleWeekSchedule}>{"PREGLED TJEDNA"}</button>

        {popup ? (
          <WeekPopupSchedule
            weekData={allData}
            date={dateLocale}
            daysData={daysData}
            closeWeekSchedule={closeWeekSchedule}
          />
        ) : null}

        <TableNameDiv>
          <div>
            {date
              .toLocaleDateString("hr", optionsForDateDataLocale)
              .toUpperCase()}
          </div>
        </TableNameDiv>
        <InTableDataDiv>
          {loading ? (
            <Skeleton count={5} height={50} />
          ) : (
            <HandlingSelectionChanges
              filteredDataOrAllData={
                filteredData.length != 0 ? filteredData : allData
              }
            />
          )}
        </InTableDataDiv>
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  display: grid;

  grid-template-areas:
    "header header header"
    "nav content side"
    "footer footer footer";

  grid-template-columns: 380px 1fr 200px;
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
const SideBarForm = styled.div`
  grid-area: nav;

  background-color: #6c7792;
`;

const MainContent = styled.div`
  grid-area: content;
  background-color: whitesmoke;
`;

const SelectDiv = styled.div`
  width: 80 vw;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  color: black;
`;
const AlignSideBarDiv = styled.div`
  display: grid;
  font-family: "Audiowide", cursive;
  text-align: center;
`;
/////////////////////////////
const AlignTitleDiv = styled.div`
  padding-top: 1rem;
`;

export default NavBar;
