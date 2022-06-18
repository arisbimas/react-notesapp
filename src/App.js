import logo from './logo.svg';
import './App.css';
import { Header } from "./components/Header";
import Contents from './components/Contents';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Routes, Route, Link } from "react-router-dom";
import Login from './components/Login';


export default class App extends Component {

  componentDidMount() {
    let currentUID = localStorage.getItem("UserID");
    if (!currentUID) {
      localStorage.setItem("UserID", uuidv4());
    }

    localStorage.setItem("note-detail", "");
  }

  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Contents />} />
        </Routes>
      </div>
    );
  }
}

