import "./App.css";
// import { Header } from "./components/Header";
import Contents from "./components/Contents";
import React, { Component } from "react";
// import { v4 as uuidv4 } from "uuid";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Example from "./components/Example";

export default class App extends Component {
  componentDidMount() {
    // let currentUID = localStorage.getItem("UserID");
    // if (!currentUID) {
    //   localStorage.setItem("UserID", uuidv4());
    // }
    // localStorage.setItem("note-detail", "");
  }

  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Contents />} />
          <Route path="/ex" element={<Example />} />
        </Routes>
      </div>
    );
  }
}
