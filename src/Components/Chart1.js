import React, { useRef, useEffect, useState } from "react";
import { select, line, curveCardinal, scaleBand, scaleLinear, axisBottom, axisLeft } from "d3";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LineChart = ({ onMonthChange, data }) => {
  const svgRef = useRef();
  const [selectedXValue, setSelectedXValue] = useState("x");
  const [selectedYValue, setSelectedYValue] = useState("y");
  const [months, setMonths] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
  const [selectedMonth, setSelectedMonth] = useState("January");

  const generateRandomData = (month) => {
    const randomizedData = data.map((point) => ({
      x: point.x,
      y: Math.floor(Math.random() * 50),
    }));

    return randomizedData;
  };

  useEffect(() => {
    const svg = select(svgRef.current);

    const containerWidth = svgRef.current.parentElement.clientWidth;
    const margin = { top: 40, right: 10, bottom: 10, left: 10 };
    const width = containerWidth - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    // Adjust xScale for string values
    const xScale = scaleBand().domain(data.map(d => d[selectedXValue])).range([0, width]).padding(0.1);
    const yScale = scaleLinear().domain([0, 100]).range([height, 0]);

    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .style("transform", `translateY(${height}px)`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").style("transform", "translateX(0px)").call(yAxis);

    const randomizedData = generateRandomData(selectedMonth);

    const myLine = line()
      .x((d) => xScale(d[selectedXValue]) + xScale.bandwidth() / 2)
      .y((d) => yScale(d[selectedYValue] + 20))
      .curve(curveCardinal);

    svg
      .selectAll(".line")
      .data([randomizedData])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "#47B747")
      .attr("stroke-width", 3);

    svg
      .selectAll(".label")
      .data(randomizedData)
      .join("text")
      .attr("class", "label")
      .text((d) => `${d[selectedXValue]}`)
      .attr("x", (d) => xScale(d[selectedXValue]) + xScale.bandwidth() / 2)
      .attr("y", height + margin.bottom - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px");

    onMonthChange(selectedMonth);
  }, [data, selectedXValue, selectedYValue, selectedMonth, onMonthChange]);

  const handleMonthChange = (selected) => {
    setSelectedMonth(selected);
  };

  return (
    <div>
      <div>
        <Row>
          <Col><h5>Checking account</h5></Col>
          <Col style={{ display: "flex" }}>
            <Dropdown>
              <Dropdown.Toggle style={{ border: '1px solid black', backgroundColor: "white", color: "black" }} id="dropdown-basic">
                <span style={{ color: "black" }}>Manage</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" onClick={() => handleMonthChange("March")}>Action</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown style={{ marginLeft: "10px" }}>
              <Dropdown.Toggle id="dropdown-basic" style={{ border: '1px solid black', backgroundColor: "white", color: "black" }}>
                <span style={{ color: "black" }}>{selectedMonth}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {months.map((item, index) => (
                  <Dropdown.Item onClick={() => handleMonthChange(item)} key={index}>{item}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>
      <hr />
      <svg style={{ marginTop: "-55px" }} ref={svgRef} width="100%" height={250}></svg>
    </div>
  );
};

export default LineChart;
