import React from "react";
import "./App.css";
import Card from "./component/Card.js";

const App = () => {
  return (
    <div className="App">
      <Card
        title="GTA VI"
        text="Rockstar Games"
        image={
          "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/71d4d17edcd49703a5ea446cc0e588e6.jpg"
        }
      />
    </div>
  );
};

export default App;
