import logo from './logo.svg';
import './App.css';
import { Header } from "./components/Header";
import Contents from './components/Contents';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';


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
        <Header></Header>
        <Contents></Contents>
      </div>
    );
  }
}

