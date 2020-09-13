import React, { useMemo, useState, useEffect } from "react";

import Select from "react-select";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Formik, Form as FormikForm, Field } from "formik";
import back from "../icons/back.png";

import axios from "axios";

import TableStudents from "./table/TableStudents";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import hr from "date-fns/locale/hr";
import HandlingSelectionChanges from "./table/Table2";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import WeekTable from "./table/Weektable";

const WeekPopupSchedule = (props) => {
  const { weekData, date, daysData, closeWeekSchedule } = props;

  const [countedDay, setCountedDay] = useState(0);
  const [weekDay, setWeekDay] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const postData = async () => {
      setCountedDay(countedDay);
      const post = await axios.post("http://localhost:5000/api/weekData", {
        days_id: daysData[countedDay].days_id,
      });

      setWeekDay(post.data);
      console.log(countedDay);
    };
    postData();
  }, [countedDay]);

  if (!daysData) return <div>Loading...</div>;

  const handleCountedDaysClick = async () => {
    setCountedDay(countedDay + 1);

    if (countedDay === daysData.length - 1) {
      setCountedDay(0);
    }

    const post = await axios.post("http://localhost:5000/api/weekData", {
      days_id: daysData[countedDay].days_id,
    });
    console.log(post.data);
    console.log(countedDay);
    setWeekDay(post.data);
  };

  const handleSubtractedDaysClick = async () => {
    setCountedDay(countedDay - 1);

    if (countedDay === 0) {
      setCountedDay(daysData.length - 1);
    }

    try {
      const post = await axios.post("http://localhost:5000/api/weekData", {
        days_id: daysData[countedDay].days_id,
      });
      console.log(post.data);

      setWeekDay(post.data);
      console.log(countedDay);
    } catch (error) {}
  };

  return (
    <WeekPopupScheduleWindow>
      <WeekPopupScheduleInside>
        <Title>
          <Botun onClick={closeWeekSchedule}></Botun>
          <button onClick={handleSubtractedDaysClick}>-</button>
          {daysData[countedDay].day_name}
          <button onClick={handleCountedDaysClick}>+</button>
        </Title>
        <WeekTable weekDay={weekDay} date={date}></WeekTable>
      </WeekPopupScheduleInside>
    </WeekPopupScheduleWindow>
  );
};

export default WeekPopupSchedule;

const WeekPopupScheduleWindow = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;
const WeekPopupScheduleInside = styled.div`
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  border-radius: 20px;
  background: white;
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
const Botun = styled.button`
  display: block;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  border-width: 0.1px;

  border-color: #3f1f5f;
  :hover {
    background-color: red;
  }
  background: -webkit-linear-gradient(
      -45deg,
      transparent 0%,
      transparent 46%,
      white 46%,
      white 56%,
      transparent 56%,
      transparent 100%
    ),
    -webkit-linear-gradient(45deg, transparent 0%, transparent 46%, white 46%, white
          56%, transparent 56%, transparent 100%);
  background-color: #3f1f5f;

  transition: all 0.3s ease;
`;
