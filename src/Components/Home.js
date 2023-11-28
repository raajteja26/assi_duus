import React, { useState, useEffect, useRef } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import "./Home.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Chart2 from "./Chart2";
import Chart1 from "./Chart1";
import Chart3 from "./Chart3";
import Chart4 from "./Chart4";

const Home = () => {
  const [selectedMonthHome, setSelectedMonthHome] = useState("January");
  const [data1, setData1] = useState([
  ])
  const [data2, setData2] = useState([
    { "name": "Older", "value": 50 },
    { "name": "Jan_1-8", "value": 20 },
    { "name": "Jan_9-16", "value": 40 },
    { "name": "Jan_17-24", "value": 70 },
    { "name": "Jan_25-31", "value": 50 },
    { "name": "Future", "value": 20 }
  ])
  const [data3, setData3] = useState([
    { name: "January", value1: 50, value2: 30 },
    { name: "February", value1: 20, value2: 40 },
    { name: "March", value1: 40, value2: 60 },
    { name: "April", value1: 70, value2: 20 },
    { name: "May", value1: 90, value2: 80 },
    { name: "June", value1: 50, value2: 40 },
    { name: "July", value1: 20, value2: 70 },
    { name: "August", value1: 40, value2: 90 },
    { name: "September", value1: 70, value2: 50 },
    { name: "October", value1: 50, value2: 30 },
    { name: "November", value1: 20, value2: 40 },
    { name: "December", value1: 40, value2: 60 },
  ])
  const [data4, setData4] = useState([
        {
          Account: "Sales",
          "This Month": 1194.58,
          "YTD": 11418.29,
        },
        {
          Account: "Advertising",
          "This Month": 6879.02,
          "YTD": 9271.36,
        },
        {
          Account: "Inventory",
          "This Month": 4692.26,
          "YTD": 9768.09,
        },
        {
          Account: "Entertainment",
          "This Month": 0.0,
          "YTD": 0.0,
        },

      ])
      function getPrevious_7_Dates(numDays) {
        const current_Date = new Date();
        const previous_7_Dates = [];
      
        for (let i = 0; i < numDays; i++) {
          const current_Date_Copy = new Date(current_Date);
          current_Date_Copy.setDate(current_Date.getDate() - i);
      
          const formattedDate = current_Date_Copy.toISOString().split('T')[0];
      
          const randomY = Math.floor(Math.random() * 20);
      
          previous_7_Dates.unshift({ x: formattedDate, y: randomY });
        }
        
        return previous_7_Dates;
      }
  useEffect(()=>{
    const previous_7_Dates = getPrevious_7_Dates(7)
    setData1(previous_7_Dates)
    console.log(data1,"previous")
  },[])  

  const handleMonthChangeHome = (selected) => {
    setSelectedMonthHome(selected);
  };
  const randomizeData1 = () => {
    const randomizedData = data1.map(point => ({
      x: point.x,
      y: Math.floor(Math.random() * 100), 
    }));
    setData1(randomizedData);
  };
  const randomizeData2 = () => {
    const randomizedData = data2.map(entry => ({
      name: entry.name,
      value: Math.floor(Math.random() * 100), 
    }));
    setData2(randomizedData);
  };
  const randomizeData3 = () => {
    const randomizedData = data3.map(item => ({
      name: item.name,
      value1: Math.floor(Math.random() * 100), 
      value2: Math.floor(Math.random() * 100), 
    }));
    setData3(randomizedData);
  };
  const randomizeData4 = () => {
  const randomizedData = data4.map(account => ({
    Account: account.Account,
    "This Month": Math.floor(Math.random() * 5000), 
    "YTD": Math.floor(Math.random() * 15000), 
  }));
  setData4(randomizedData);
};
const handleButtonClick = () => {
  randomizeData1();
  randomizeData2();
  randomizeData3();
  randomizeData4();
};
  return (
    <div style={{ backgroundColor: '#F6F7F9' }}>
      <Navbar onButtonClick={handleButtonClick}  />
      <div style={{ display: 'flex'}}>
        <Sidebar />
        <Container style={{padding:"20px"}}>
        <Row style={{padding:"15px"}}> 
        <Col><div className="chart-container" style={{backgroundColor:"white",padding:"15px",height:"40vh",borderRadius:"10px" }}><Chart1 onMonthChange={handleMonthChangeHome} data = {data1}/></div></Col>
        <Col><div className="chart-container" style={{backgroundColor:"white",padding:"15px",height:"40vh",borderRadius:"10px" }}><Chart2 data = {data2}/></div></Col>
        </Row>
        <Row style={{padding:"15px"}}>
        <Col><div className="chart-container" style={{backgroundColor:"white",padding:"15px",height:"40vh",borderRadius:"10px" }}><Chart3 data={data3}/></div></Col>
        <Col><div className="chart-container" style={{backgroundColor:"white",padding:"15px",height:"40vh",borderRadius:"10px" }}><Chart4 data={data4}/></div></Col>
        </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
