import React, { useRef, useEffect, useState } from "react";
import { select, scaleBand, scaleLinear, axisBottom, axisLeft } from "d3";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Total_data = [
    {
      "January": [
        { "name": "Older", "value": 50 },
        { "name": "Jan_1-8", "value": 20 },
        { "name": "Jan_9-16", "value": 40 },
        { "name": "Jan_17-24", "value": 70 },
        { "name": "Jan_25-31", "value": 50 },
        { "name": "Future", "value": 20 }
      ]
    },
    {
      "February": [
        { "name": "Older", "value": 60 },
        { "name": "Feb_1-8", "value": 30 },
        { "name": "Feb_9-16", "value": 50 },
        { "name": "Feb_17-24", "value": 80 },
        { "name": "Feb_25-28", "value": 60 },
        { "name": "Future", "value": 30 }
      ]
    },
    {
      "March": [
        { "name": "Older", "value": 70 },
        { "name": "Mar_1-8", "value": 40 },
        { "name": "Mar_9-16", "value": 60 },
        { "name": "Mar_17-24", "value": 90 },
        { "name": "Mar_25-31", "value": 70 },
        { "name": "Future", "value": 40 }
      ]
    },
    {
      "April": [
        { "name": "Older", "value": 80 },
        { "name": "Apr_1-8", "value": 50 },
        { "name": "Apr_9-16", "value": 70 },
        { "name": "Apr_17-24", "value": 100 },
        { "name": "Apr_25-30", "value": 80 },
        { "name": "Future", "value": 50 }
      ]
    },
    {
      "May": [
        { "name": "Older", "value": 90 },
        { "name": "May_1-8", "value": 60 },
        { "name": "May_9-16", "value": 80 },
        { "name": "May_17-24", "value": 10 },
        { "name": "May_25-31", "value": 90 },
        { "name": "Future", "value": 60 }
      ]
    },
    {
      "June": [
        { "name": "Older", "value": 60 },
        { "name": "Jun_1-8", "value": 70 },
        { "name": "Jun_9-16", "value": 90 },
        { "name": "Jun_17-24", "value": 20 },
        { "name": "Jun_25-30", "value": 10 },
        { "name": "Future", "value": 70 }
      ]
    },
    {
      "July": [
        { "name": "Older", "value": 70 },
        { "name": "Jul_1-8", "value": 80 },
        { "name": "Jul_9-16", "value": 10 },
        { "name": "Jul_17-24", "value": 30 },
        { "name": "Jul_25-31", "value": 10 },
        { "name": "Future", "value": 80 }
      ]
    },
    {
      "August": [
        { "name": "Older", "value": 20 },
        { "name": "Aug_1-8", "value": 90 },
        { "name": "Aug_9-16", "value": 60 },
        { "name": "Aug_17-24", "value": 40 },
        { "name": "Aug_25-31", "value": 10 },
        { "name": "Future", "value": 90 }
      ]
    },
    {
      "September": [
        { "name": "Older", "value": 50 },
        { "name": "Sep_1-8", "value": 10 },
        { "name": "Sep_9-16", "value": 60 },
        { "name": "Sep_17-24", "value": 50 },
        { "name": "Sep_25-30", "value": 40 },
        { "name": "Future", "value": 10 }
      ]
    },
    {
      "October": [
        { "name": "Older", "value": 40 },
        { "name": "Oct_1-8", "value": 10 },
        { "name": "Oct_9-16", "value": 30 },
        { "name": "Oct_17-24", "value": 60 },
        { "name": "Oct_25-31", "value": 40 },
        { "name": "Future", "value": 70 }
      ]
    },
    {
      "November": [
        { "name": "Older", "value": 50 },
        { "name": "Nov_1-8", "value": 20 },
        { "name": "Nov_9-16", "value": 10},
        { "name": "Nov_17-24", "value": 30},
        { "name": "Nov_25-30", "value": 70},
        { "name": "Future", "value": 80 }
    ]
    },
    {
        "December": [
          { "name": "Older", "value": 20 },
          { "name": "Dec_1-8", "value": 80 },
          { "name": "Dec-16", "value": 10},
          { "name": "Dec-24", "value": 30},
          { "name": "Dec-31", "value": 50},
          { "name": "Future", "value": 80 }
      ]
      }
] 

const BarChart = ({data}) => {
  const svgRef = useRef();

  const [selectedXValue, setSelectedXValue] = useState("name");
  const [selectedYValue, setSelectedYValue] = useState("value");
  const [showModal, setShowModal] = useState(false);
  const [month, setMonth] = useState("")

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log('File uploaded:', file);
    handleCloseModal();
  };

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
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d[selectedXValue]))
      .attr("y", (d) => yScale(d[selectedYValue]))
      .attr("width", 20)
      .attr("height", (d) => height - yScale(d[selectedYValue]))
      .attr("fill", "#47B747")
      .attr("rx", 7) 
      .attr("ry", 7);
    
    svg.selectAll(".bar")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .text("tool tip");
    svg
      .selectAll(".label")
      .data(data)
      .join("text")
      .attr("class", "label")
      .text((d) => `${d[selectedXValue]}`)
      .attr("x", (d) => xScale(d[selectedXValue]) + xScale.bandwidth() / 7)
      .attr("y", height + margin.bottom - 10) 
      .attr("text-anchor", "middle")
      .attr("font-size", "10px");
  }, [data, selectedXValue, selectedYValue]);

  return (
    <div>

    <Row>
    <Col sm={6}><h5>Invoices owed to you</h5></Col>
    <Col sm={6}>
    <Button
      style={{ border: '1px solid #E7EDFD', backgroundColor: '#E7EDFD', color: 'black' }}
      onClick={handleButtonClick}
    >
      <span style={{color:"#71BE88"}}>New sales invoice</span>
    </Button>
    </Col>
  </Row>
      <hr />
      <svg style={{marginTop:"-50px"}} ref={svgRef} width="100%" height={200}>
      </svg>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="invoiceFile">
              <Form.Label>Select File:</Form.Label>
              <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BarChart;
