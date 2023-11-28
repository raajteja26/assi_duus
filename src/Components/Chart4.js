import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';

const BarChart = ({data}) => {
  
  return (
    <Col >
      <div>
        <h5>Account Watchlist</h5>
        <hr/>
        <table className="table table-borderless" style={{ width: "100%",height:"25vh", marginTop:"-30px"}}>
          <thead>
            <tr>
              <th className="text-left">Account</th>
              <th className="text-right">This Month</th>
              <th className="text-right">YTD</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="text-left">{row.Account}</td>
                <td className="text-right">{row["This Month"]}</td>
                <td className="text-right">{row.YTD}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Col>
  );
};

export default BarChart;
