import logo from './logo.svg';
import './App.css';
import { Header } from "./components/Header";
import Notes from './components/Notes';
import React, { Component } from 'react';

export default class App extends Component {

  componentDidMount() {
    localStorage.setItem("UserID", "2a5uKXBKJ0iloCR1jrYc");
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <Notes></Notes>
      </div>
    );
  }
}

