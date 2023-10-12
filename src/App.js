import React, { Component } from "react";
import "./App.css";
import DaysOfWeek from "./components/DaysOfWeek";


class App extends Component {

  render() {
    return (      
      <div className="App_section">
        <DaysOfWeek />       
  
      </div>
    );
  };
};

export default App;