import React, { useRef, useEffect, useState } from "react";
import { select, scaleBand, scaleLinear, axisBottom, axisLeft } from "d3";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';

const BarChart = ({data}) => {
  const svgRef = useRef();

  const [selectedXValue, setSelectedXValue] = useState("name");
  const [selectedYValue, setSelectedYValue] = useState("value1");

  useEffect(() => {
    const svg = select(svgRef.current);
    const containerWidth = svgRef.current.parentElement.clientWidth;
    const margin = { top: 40, right: 10, bottom: 40, left: 10 }; 
    const width = containerWidth - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    const xScale = scaleBand()
      .domain(data.map(d => d[selectedXValue]))
      .range([0, width])
      .padding(0.1);

    const yScale = scaleLinear().domain([0, 100]).range([height, 0]);
    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .style("transform", `translateY(${height}px)`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").style("transform", "translateX(0px)").call(yAxis);

    svg
      .selectAll(".bar1")
      .data(data)
      .join("rect")
      .attr("class", "bar1")
      .attr("x", (d) => xScale(d[selectedXValue]))
      .attr("y", (d) => yScale(d[selectedYValue]))
      .attr("width", 17)
      .attr("height", (d) => height - yScale(d[selectedYValue]))
      .attr("fill", "#02BB7D")
      .attr("rx", 7) 
      .attr("ry", 7);

    svg
      .selectAll(".bar2")
      .data(data)
      .join("rect")
      .attr("class", "bar2")
      .attr("x", (d) => xScale(d[selectedXValue]))
      .attr("y", (d) => yScale(d.value2))
      .attr("width", 17)
      .attr("height", (d) => height - yScale(d.value2))
      .attr("fill", "#47B747") 
      .attr("rx", 7) 
      .attr("ry", 7);

    svg
      .selectAll(".label")
      .data(data)
      .join("text")
      .attr("class", "label")
      .text((d) => `${d[selectedXValue]}`)
      .attr("x", (d) => xScale(d[selectedXValue]) + xScale.bandwidth() / 2)
      .attr("y", height + margin.bottom - 10) 
      .attr("text-anchor", "middle")
      .attr("font-size", "8px");
  }, [data, selectedXValue, selectedYValue]);

  return (
    <div>
      <Row>
        <Col sm={8}><h5>Total cash flow</h5></Col>
        <Col sm={4}>
        <span style={{backgroundColor:"#02BB7D",color:"#02BB7D", borderRadius:"5px"}}>R</span> In
        <span style={{backgroundColor:"#47B747",color:"#47B747", borderRadius:"5px",marginLeft:"10px"}}>R</span> Out
        </Col>
      </Row>
      
      <svg style={{marginTop:"-15px"}} ref={svgRef} width="100%" height={210}>
      </svg>
    </div>
  );
};

export default BarChart;
