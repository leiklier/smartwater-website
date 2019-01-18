import React, { Component} from "react";
import "./App.css";

import { Pagination, Button } from 'antd';

class App extends Component{
  render(){
    return(
      <div className="App">
        <Pagination defaultCurrent={1} total={50} />
        <Button type="primary">Primary</Button>
      </div>
    );
  }
}

export default App;
