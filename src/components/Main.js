import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Dishdetail from "./DishDetail";
import Menu from "./Menu";

const Navigate = 
  createStackNavigator(
    {
      Menu: { screen: Menu },
      Dishdetail: { screen: Dishdetail },
    },
    {
      navigationOptions: {
        headerStyle: {
          backgroundColor: "#512DA8"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff"
        }
      }
    }
  
);

class Main extends Component {
  render() {
    return (
        <Navigate />
    );
  }
}

export default Main;
