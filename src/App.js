import logo from './logo.svg';
import './App.css';
import { Header } from "./components/Header";
import Contents from './components/Contents';
import React, { Component } from 'react';

export default class App extends Component {

  componentDidMount() {
    localStorage.setItem("UserID", "2a5uKXBKJ0iloCR1jrYc");
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

