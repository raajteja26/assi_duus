import React, { useState } from "react";
import "./Sidebar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { faTableColumns, faAddressBook, faPerson, faFile, faDollarSign, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = () => {
  const sidebarItems = [
    {
      label: "Dashboard",
      icon: <FontAwesomeIcon icon={faTableColumns} />,
      link: "/",
    },
    {
      label: "Accounts",
      icon: <FontAwesomeIcon icon={faBuildingColumns} />,
      link: "/",
    },
    {
      label: "Payroll",
      icon: <FontAwesomeIcon icon={faDollarSign} />,
      link: "/",
    },
    {
      label: "Reports",
      icon: <FontAwesomeIcon icon={faFile} />,
      link: "/",
    },
    {
        label: "Advisor",
        icon: <FontAwesomeIcon icon={faPerson} />,
        link: "/",
    },
    {
        label: "Contacts",
        icon: <FontAwesomeIcon icon={faAddressBook} />,
        link: "/",
    },
];

  return (
    <div className="sidebar">
    <ul className="sidebar-menu" style={{ padding: 0, backgroundColor: 'white', listStyle: 'none' }}>
    {sidebarItems.map((item, index) => (
        <li key={item.label} className="list-group-item d-flex" style={{ border: 'none', padding: '15px 15px', transition: 'background-color 0.3s'}}>
            <a href={item.link} className="list-group-a" style={{marginLeft:"20px"}}>
                <span className="me-2">{item.icon}</span>
                {item.label}
            </a>
        </li>
    ))}
    </ul>
        </div>
    );
};

export default Sidebar;
